import { testLevelLdb, testLevelWal, testReadTrace } from "../../test";

function main() {
    console.log('Running AnyDesk tests....');
    console.log(' Starting Trace tests....');
    testReadTrace();
    console.log(' All Trace tests passed! 🥳\n');


    console.log('All AnyDesk tests passed! 🥳💃🕺');

}

main();