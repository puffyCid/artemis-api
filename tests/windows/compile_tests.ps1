# AI took my simple 15 line batch script and turned it into a nice ~180 PowerShell script XD

# Record start time
$startTime = Get-Date

# Compile and test all TypeScript files in subdirectories
$results = @()

foreach ($dir in Get-ChildItem -Directory) {
    $projStart = Get-Date
    Write-Host "🔥🔥🔥🔥🔥🔥 Running test for $($dir.Name) 🔥🔥🔥🔥🔥🔥"

    # Compile TypeScript with esbuild
    esbuild --log-level=silent --bundle --outfile="$($dir.FullName)\main.js" "$($dir.FullName)\main.ts"
    $compileExit = $LASTEXITCODE

    if ($compileExit -ne 0) {
        Write-Host "❌ esbuild failed for $($dir.Name)" -ForegroundColor Red
        $projEnd = Get-Date
        $results += [PSCustomObject]@{
            Project  = $dir.Name
            Status   = "Compile Failed"
            Duration = $projEnd - $projStart
        }
        continue
    }

    # Run the tester only if compile succeeded
    & .\script_tester.exe "$($dir.FullName)\main.js"
    $testExit = $LASTEXITCODE
    $projEnd  = Get-Date

    if ($testExit -eq 101) {
        Write-Host "❌ Failed test for $($dir.Name)" -ForegroundColor Red
        $results += [PSCustomObject]@{
            Project  = $dir.Name
            Status   = "Test Failed"
            Duration = $projEnd - $projStart
        }
    }
    else {
        Write-Host "✅ Passed test for $($dir.Name)" -ForegroundColor Green
        $results += [PSCustomObject]@{
            Project  = $dir.Name
            Status   = "Passed"
            Duration = $projEnd - $projStart
        }
    }
}

# --- Summary ---
$endTime   = Get-Date
$timestamp = $endTime.ToString("yyyy-MM-dd HH:mm:ss")
$elapsed   = $endTime - $startTime

Write-Host "`n===== SUMMARY ($timestamp) =====" -ForegroundColor Cyan

# Sort by duration (descending: slowest first)
$sortedResults = $results | Sort-Object Duration -Descending

foreach ($r in $sortedResults) {
    $line = "{0,-20} {1,-15} {2:hh\:mm\:ss}" -f $r.Project, $r.Status, $r.Duration
    switch ($r.Status) {
        "Passed"        { Write-Host $line -ForegroundColor Green }
        "Test Failed"   { Write-Host $line -ForegroundColor Red }
        "Compile Failed"{ Write-Host $line -ForegroundColor Yellow }
    }
}

# --- Final Result ---
if ($results.Status -contains "Compile Failed" -or $results.Status -contains "Test Failed") {
    Write-Host "`n❌ Some tests failed. Please review the summary above." -ForegroundColor Red
} else {
    Write-Host "`n🎉 All tests passed successfully!" -ForegroundColor Green
}

# --- Elapsed Time ---
Write-Host ("⏱️ Total elapsed time: {0:hh\:mm\:ss}" -f $elapsed) -ForegroundColor Magenta

# --- Highlight Slowest & Fastest Projects ---
$slowest = $sortedResults | Select-Object -First 1
$fastest = $sortedResults | Select-Object -Last 1

if ($slowest) {
    Write-Host ("🐢 Slowest project: {0} ({1:hh\:mm\:ss})" -f $slowest.Project, $slowest.Duration) -ForegroundColor DarkYellow
}
if ($fastest) {
    Write-Host ("🚀 Fastest project: {0} ({1:hh\:mm\:ss})" -f $fastest.Project, $fastest.Duration) -ForegroundColor Cyan
}

# --- Average, Median & Standard Deviation ---
if ($results.Count -gt 0) {
    $durations = $results | ForEach-Object { $_.Duration.Ticks }

    # Average
    $avgTicks = ($durations | Measure-Object -Average).Average
    $avgTime  = [TimeSpan]::FromTicks([long]$avgTicks)

    # Median
    $sortedTicks = $durations | Sort-Object
    if ($results.Count % 2 -eq 1) {
        $medianTicks = $sortedTicks[[math]::Floor($results.Count/2)]
    } else {
        $lower = $sortedTicks[($results.Count/2) - 1]
        $upper = $sortedTicks[$results.Count/2]
        $medianTicks = ($lower + $upper) / 2
    }
    $medianTime = [TimeSpan]::FromTicks([long]$medianTicks)

    # Standard Deviation
    $mean = $avgTicks
    $variance = ($durations | ForEach-Object { ($_ - $mean) * ($_ - $mean) } | Measure-Object -Average).Average
    $stdDevTicks = [math]::Sqrt($variance)
    $stdDevTime  = [TimeSpan]::FromTicks([long]$stdDevTicks)

    Write-Host ("📊 Average project duration: {0:hh\:mm\:ss}" -f $avgTime) -ForegroundColor Magenta
    Write-Host ("📈 Median project duration:  {0:hh\:mm\:ss}" -f $medianTime) -ForegroundColor DarkCyan
    Write-Host ("📉 Std Dev of durations:     {0:hh\:mm\:ss}" -f $stdDevTime) -ForegroundColor DarkGray
}

# --- Histogram with Cumulative Percentages & 80% Marker ---
$top80List = @()
if ($results.Count -gt 0) {
    Write-Host "`n📊 Duration Histogram (relative scale with cumulative %)" -ForegroundColor Cyan
    $maxTicks   = ($results | ForEach-Object { $_.Duration.Ticks } | Measure-Object -Maximum).Maximum
    $totalTicks = ($results | ForEach-Object { $_.Duration.Ticks } | Measure-Object -Sum).Sum
    $cumulative = 0.0
    $marked80   = $false

    foreach ($r in $sortedResults) {
        $barLength = [math]::Max(1, [math]::Round(($r.Duration.Ticks / $maxTicks) * 40)) # scale to 40 chars
        $bar = ("█" * $barLength)
        $percent = ($r.Duration.Ticks / $totalTicks) * 100
        $cumulative += $percent
        $marker = ""
        if (-not $marked80 -and $cumulative -ge 80) {
            $marker = " ⭐"
            $marked80 = $true
        }
        $line = "{0,-20} {1,-15} {2,6:N1}%  (Cumulative: {3,6:N1}%){4}" -f $r.Project, $bar, $percent, $cumulative, $marker
        switch ($r.Status) {
            "Passed"        { Write-Host $line -ForegroundColor Green }
            "Test Failed"   { Write-Host $line -ForegroundColor Red }
            "Compile Failed"{ Write-Host $line -ForegroundColor Yellow }
        }

        if ($cumulative -le 80) {
            $top80List += $r
        }
    }

    # --- Top 80% Projects List ---
    if ($top80List.Count -gt 0) {
        Write-Host "`n⭐ Top 80% Projects (cumulative runtime)" -ForegroundColor Cyan
        foreach ($proj in $top80List) {
            Write-Host (" - {0} ({1:hh\:mm\:ss})" -f $proj.Project, $proj.Duration) -ForegroundColor Gray
        }
    }
}

# Exit code
if ($results.Status -contains "Compile Failed" -or $results.Status -contains "Test Failed") {
    exit 1
} else {
    exit 0
}