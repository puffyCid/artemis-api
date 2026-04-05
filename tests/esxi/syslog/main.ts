import { testSyslogEsxi } from "../../test";

function main() {
    console.log('Running ESXi Syslog tests....');

    console.log(' Starting ESXi Syslog test....');
    testSyslogEsxi();

    console.log(' Syslog test passed! 🥳');
    console.log('All ESXi Syslog tests passed! 🥳💃🕺');
}

main();
