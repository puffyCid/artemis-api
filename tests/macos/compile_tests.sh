# Compile all test TypeScript files
for entry in */
do
cd $entry
echo "Running test for $entry"
esbuild --bundle --outfile=main.js main.ts
if ../script_tester main.js
then
  cd ..
else
  echo "Failed test for $entry"
  exit 1
fi
done