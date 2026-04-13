import { glob, UserAccessLogging } from "../../../mod";
import { FileError } from "../../../src/filesystem/errors";
import { WindowsError } from "../../../src/windows/errors";

function main() {
    console.log('Running Windows UAL tests....');
    console.log(' Starting live test....');

    const glob_path = "C:\\System32\\LogFiles\\Sum\\*.mdb";
    const paths = glob(glob_path);
    if (paths instanceof FileError) {
        throw paths;
    }
    let role = undefined;
    for (const path of paths) {
        if (path.filename !== "SystemIdentity.mdb") {
            continue;
        }

        const ual = new UserAccessLogging(path.full_path);
        role = ual;
    }

    if (role === undefined) {
        return;
    }

    for (const path of paths) {
        if (path.filename === "SystemIdentity.mdb") {
            continue;
        }
        console.log(`Parsing: ${path.full_path}`);

        const clients = new UserAccessLogging(path.full_path);

        const data = clients.getUserAccessLog(clients.pages, role);
        if (data instanceof WindowsError) {
            throw data;
        }
        
        if(data.length === 0) {
            throw `Got empty UAL?`;
        }
    }
    console.log(' Live test passed! 🥳\n');

    console.log('All Windows UAL tests passed! 🥳💃🕺');
}

main();
