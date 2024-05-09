# Compile all test TypeScript files
for entry in */
do
cd $entry
echo "Running test for $entry"
deno run -A build.ts
if ../script_tester_macos_intel main.js
then
  cd ..
else
  echo "Failed test for $entry"
  exit 1
fi
done