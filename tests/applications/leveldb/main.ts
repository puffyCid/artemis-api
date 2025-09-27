import { testLevelLdb, testLevelWal } from "../../test";

function main() {
    console.log('Running LevelDb tests....');
    console.log(' Starting ldb tests....');
    testLevelLdb();
    console.log(' All ldb tests passed! 🥳\n');

    console.log(' Starting wal tests....');
    testLevelWal();
    console.log(' All wal tests passed! 🥳\n');

    console.log('All LevelDb tests passed! 🥳💃🕺');

}

main();