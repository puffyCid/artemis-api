# Compile all test TypeScript files
for entry in */
do
cd $entry
deno run -A build.ts
../script_tester main.js
cd ..
done