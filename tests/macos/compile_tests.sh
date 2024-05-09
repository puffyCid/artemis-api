# Compile all test TypeScript files
for entry in */
do
cd $entry
deno run -A build.ts
../script_tester_macos_intel main.js
cd ..
done