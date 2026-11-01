import { Accessor, UserAccessLogging } from "../../../mod";
import { FileError } from "../../../src/filesystem/errors";
import { WindowsError } from "../../../src/windows/errors";
import { AccessorProtocol, EntryKind } from "../../../types/filesystem/accessor";
import { testUserAccessLogging } from "../../test";

function main() {
    console.log('Running Windows UAL tests....');
    console.log(' Starting live test....');

    const accessor = new Accessor();
    let matches = accessor.globfs("C:\\Windows\\System32\\LogFiles\\Sum\\*.mdb", AccessorProtocol.Ntfs);
    if (!(matches instanceof FileError)) {
        let role = undefined;
        for (const path of matches) {
            if (path.meta.kind !== EntryKind.File) {
                continue;
            }
            if (path.meta.filename !== "SystemIdentity.mdb") {
                continue;
            }

            const ual = new UserAccessLogging(path.meta.full_path, AccessorProtocol.Ntfs);
            role = ual;
        }

        if (role === undefined) {
            return;
        }

        for (const path of matches) {
            if (path.meta.kind !== EntryKind.File) {
                continue;
            }
            if (path.meta.filename === "SystemIdentity.mdb") {
                continue;
            }
            console.log(`Parsing: ${path.meta.display_path}`);

            const clients = new UserAccessLogging(path.meta.full_path, AccessorProtocol.Ntfs);

            const data = clients.getUserAccessLog(clients.pages, role);
            if (data instanceof WindowsError) {
                throw data;
            }

            if (data.length === 0) {
                throw `Got empty UAL?`;
            }
        }
    }


    console.log(' Live test passed! 🥳\n');

    console.log(' Starting Windows UAL test....');
    testUserAccessLogging();

    console.log(' Windows UAL test passed! 🥳');

    console.log('All Windows UAL tests passed! 🥳💃🕺');
}

main();
