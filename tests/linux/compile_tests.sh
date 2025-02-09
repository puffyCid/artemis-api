# Compile all test TypeScript files
for entry in */
do
cd $entry
echo "Running test for $entry"
/home/runner/.deno/bin/deno run -A build.ts
if ../script_tester main.js
then
  cd ..
else
  echo "Failed test for $entry"
  exit 1
fi
done