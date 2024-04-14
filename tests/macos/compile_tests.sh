# Compile all test TypeScript files
for entry in */
do
cd $entry
deno run -A build.ts
cd ..
done