@echo off
setlocal EnableExtensions DisableDelayedExpansion

:: Compile all test TypeScript files
for /D %%i in ("*") do (
  cd %%i 
  echo "Running test for %%i"
  C:\ProgramData\chocolatey\lib\deno\deno.exe run -A build.ts
  ::set value=
  setlocal EnableDelayedExpansion
  ..\script_tester.exe main.js
  if !ErrorLevel! == 101 (
   echo "Failed test for %%i"
   exit 1
  ) else (
    cd ..
  ) 
   
  
)
