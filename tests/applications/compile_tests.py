# AI took my simple 15 line bash script and turned it into a nice ~180 line Python script XD

from pathlib import Path
import subprocess
import sys
import os
import time
from datetime import datetime
from contextlib import contextmanager
from statistics import mean, median, quantiles

from colorama import init, Fore, Style

# Initialize colorama (needed for Windows)
init(autoreset=True)

@contextmanager
def pushd(new_dir: Path):
    """Temporarily change working directory like `cd` in Bash."""
    prev_dir = Path.cwd()
    try:
        os.chdir(new_dir)
        yield
    finally:
        os.chdir(prev_dir)

def run_tests():
    base_dir = Path.cwd()
    total_start = time.perf_counter()

    total_tests = 0
    passed_tests = 0
    durations = []  # (project_name, elapsed_time)

    for entry in base_dir.iterdir():
        if not entry.is_dir():
            continue

        total_tests += 1
        with pushd(entry):
            start_time = time.perf_counter()
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            print(f"\n{Fore.CYAN}[{timestamp}] 🔥 Running test for {entry.name} 🔥{Style.RESET_ALL}")

            # Run esbuild
            try:
                subprocess.run(
                    ["esbuild", "--log-level=silent", "--bundle", "--outfile=main.js", "main.ts"],
                    check=True
                )
            except subprocess.CalledProcessError:
                print(f"{Fore.RED}❌ Failed to build {entry.name}{Style.RESET_ALL}")
                break

            # Run script_tester
            try:
                subprocess.run(
                    [str(base_dir / "script_tester"), "main.js"],
                    check=True
                )
            except subprocess.CalledProcessError:
                print(f"{Fore.RED}❌ Failed test for {entry.name}{Style.RESET_ALL}")
                break
            else:
                passed_tests += 1

            # Duration reporting
            elapsed = time.perf_counter() - start_time
            durations.append((entry.name, elapsed))
            print(f"{Fore.GREEN}✅ Completed {entry.name} in {elapsed:.2f} seconds{Style.RESET_ALL}")

    # Totals
    total_elapsed = time.perf_counter() - total_start
    print(f"\n{Fore.MAGENTA}📊 Test Summary{Style.RESET_ALL}")
    print(f"   Total tests: {total_tests}")
    print(f"   {Fore.GREEN}Passed: {passed_tests}{Style.RESET_ALL}")
    print(f"   {Fore.RED}Failed: {total_tests - passed_tests}{Style.RESET_ALL}")
    print(f"   Total time: {total_elapsed:.2f} seconds")

    # Stats
    if durations:
        slowest = max(durations, key=lambda x: x[1])
        fastest = min(durations, key=lambda x: x[1])
        times = [d[1] for d in durations]

        avg_time = mean(times)
        q25, q50, q75 = quantiles(times, n=4)  # quartiles

        print(f"   {Fore.YELLOW}🐢 Slowest project: {slowest[0]} "
              f"({slowest[1]:.2f} seconds){Style.RESET_ALL}")
        print(f"   {Fore.CYAN}⚡ Fastest project: {fastest[0]} "
              f"({fastest[1]:.2f} seconds){Style.RESET_ALL}")
        print(f"   {Fore.BLUE}📈 Average duration: {avg_time:.2f} seconds{Style.RESET_ALL}")
        print(f"   {Fore.BLUE}📊 Median duration: {median(times):.2f} seconds{Style.RESET_ALL}")

        # Pareto 80% cumulative time
        sorted_durations = sorted(durations, key=lambda x: x[1], reverse=True)
        cumulative = 0.0
        cutoff = 0.8 * sum(times)
        pareto_list = []
        for name, t in sorted_durations:
            cumulative += t
            pareto_list.append((name, t))
            if cumulative >= cutoff:
                break

        print(f"\n{Fore.MAGENTA}📌 Top 80% time contributors (Pareto){Style.RESET_ALL}")
        for name, t in pareto_list:
            print(f"   {Fore.YELLOW}{name:<20}{t:.2f} sec{Style.RESET_ALL}")

        # Histogram chart with color coding + percentile + cumulative %
        print(f"\n{Fore.MAGENTA}📊 Runtime Histogram (with percentiles & cumulative){Style.RESET_ALL}")
        max_time = slowest[1]
        scale = 40 / max_time if max_time > 0 else 1
        total_time = sum(times)
        cumulative = 0.0

        for name, t in sorted_durations:
            cumulative += t
            bar = "█" * int(t * scale)
            # Color by relative speed
            if t <= 0.75 * avg_time:
                color = Fore.GREEN
            elif t <= 1.25 * avg_time:
                color = Fore.YELLOW
            else:
                color = Fore.RED

            # Percentile marker
            if t <= q25:
                marker = " (≤25th %ile)"
            elif t <= q50:
                marker = " (≤50th %ile)"
            elif t <= q75:
                marker = " (≤75th %ile)"
            else:
                marker = " (>75th %ile)"

            # Cumulative percentage
            cum_pct = (cumulative / total_time) * 100
            print(f"   {name:<20} {color}{bar}{Style.RESET_ALL} {t:.2f}s{marker} "
                  f"→ {cum_pct:5.1f}% total")

    # Exit code mirrors success/failure
    if passed_tests < total_tests:
        sys.exit(1)

if __name__ == "__main__":
    run_tests()