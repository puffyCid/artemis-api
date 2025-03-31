@echo off
setlocal EnableExtensions DisableDelayedExpansion

:: Compile all test TypeScript files
for /D %%i in ("*") do (
  echo "Running test for %%i"
  esbuild --bundle --outfile=%%i\main.js %%i\main.ts
  
  setlocal EnableDelayedExpansion
  .\script_tester.exe %%i\main.js
  if !ErrorLevel! == 101 (
   echo "Failed test for %%i"
   exit 1
  )
)
