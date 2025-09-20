# Compile and test all TypeScript files in subdirectories

foreach ($dir in Get-ChildItem -Directory) {
    Write-Host "🔥🔥🔥🔥🔥🔥 Running test for $($dir.Name) 🔥🔥🔥🔥🔥🔥"

    # Compile TypeScript with esbuild
    esbuild --log-level=silent --bundle --outfile="$($dir.FullName)\main.js" "$($dir.FullName)\main.ts"

    # Run the tester
    & .\script_tester.exe "$($dir.FullName)\main.js"
    $exitCode = $LASTEXITCODE

    if ($exitCode -eq 101) {
        Write-Host "Failed test for $($dir.Name)"
        exit 1
    }
}