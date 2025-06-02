---
description: How to read emails and attachments!
---

# Outlook Interaction

Outlook is a popular email client used on Windows and macOS systems. Artemis is
able to parse the Windows
[OST](https://support.microsoft.com/en-us/office/introduction-to-outlook-data-files-pst-and-ost-222eaf92-a995-45d9-bde2-f331f60e2790)to
extract emails and attachments.

The Artemis TypeScript API allow analyts to extract messages programatically.
However, since OST files can be **extremely** large, we want to avoid reading
the entire file into memory.

Artemis provides a TypeScript Outlook class to help parse and interact with the
Outlook OST file.

## Outlook Parsing Guide

Lets walkthrough a small sample
[test](https://github.com/puffyCid/artemis/blob/main/core/tests/test_data/windows/outlook/windows11/test%40outlook.com.ost)
OST file.

The guide below assumes you have cloned the artemis API repository to your local
system. 

The functions in this guide are documented
[here](../Artifacts/windows.md#outlook-class)

### Create an Outlook class instance

Before we can parse an OST file we we need to initialize an instance of the
Outlook class.

```typescript
import { Outlook } from "./artemis-api/src/windows/outlook";

function main() {
  const path = "<path to test.ost>";
  // If we wanted to parse an OST file on Windows that was opened by Outlook
  // We could also provide boolean arg to access the OST file using the NTFS parser
  // But for this example we do not need that
  const reader = new Outlook(path);
}

main();
```

The above code initializes a new Outlook instance that we will use to parse the
OST file.

### Get the Root folder

The structure of an OST file is kind of like a filesystem. OST file contains
folders (directories) and messages (files). So we ultimately want to walkthrough
the folder structure and read messages along the way.

First we must get the Root folder of the OST file.

```typescript
import { Outlook } from "./artemis-api/src/windows/outlook";

function main() {
  const path = "<path to test.ost>";
  // If we wanted to parse an OST file on Windows that was opened by Outlook
  // We could also provide boolean arg to access the OST file using the NTFS parser
  // But for this example we do not need that
  const reader = new Outlook(path);

  const result = reader.rootFolder();
  if (result instanceof WindowsError) {
    console.log(result);
    return;
  }

  for (const sub of result.subfolders) {
    console.log(`Name: ${sub.name} - Node: ${sub.node}`);
  }
}

main();
```

The rootFolder() function returns either a FolderInfo object or a WindowsError.
The FolderInfo object contains some interesting data such as:

- Folder name
- Array of subfolders (if it has any)
- Array of Properties

Properties are the primary metadata found in OST files. There over a hundred
types of properties. Common ones are: To, From, Subject, Created, Delivered,
Body, Attachment Name, mail headers, etc.

The code above loops through any subfolders found in the root folder and prints
the subfolder name and ID.

If you transpile the code to JavaScript and run, you should see the following

```
[artemis] Starting artemis collection!
[runtime]: "Name: Root - Public - Node: 8194"
[runtime]: "Name: Root - Mailbox - Node: 8354"
[artemis] Finished artemis collection!
```

The root folder has two subfolders called `Root - Public` and `Root - Mailbox`

- Root - Public: Typically contains empty nested folders
- Root - Mailbox: Is the folder that contains bulk of the OST data

### Walkthrough all Folders in an OST file

Now that we parsed the root folder, we have everything we need to recursively
walk the OST file!\
Update the your TypeScript script with the code below:

```typescript
import { WindowsError } from "./artemis-api/src/windows/errors";
import { Outlook } from "./artemis-api/src/windows/outlook";
import type { SubFolder } from "./artemis-api/types/windows/outlook";

function main() {
  const path = "<path to test.ost>";
  const reader = new Outlook(path);

  const result = reader.rootFolder();
  if (result instanceof WindowsError) {
    console.log(result);
    return;
  }

  for (const sub of result.subfolders) {
    console.log(`Name: ${sub.name} - Node: ${sub.node}`);
    walkFolders(sub, reader, `/${sub.name}`);
  }
}

// Read a folder and then read any subfolders
function walkFolders(folder: SubFolder, reader: Outlook, full_path: string) {
  const result = reader.readFolder(folder.node);
  if (result instanceof WindowsError) {
    console.log(result);
    return;
  }

  for (const sub of result.subfolders) {
    const path = `${full_path}/${sub.name}`;

    console.log(
      `Name: ${sub.name} - Node: ${sub.node} - Folder path: ${path}`,
    );
    walkFolders(sub, reader, path);
  }
}

main();
```

We create a function `walkFolders()` that takes SubFolder object, our Outlook
class instance, and path tracker and it will read the SubFolder object and then
continue to read any other subfolders found. The `readFolder()` functions
expects a folder ID (node). It also returns a FolderInfo object just like
`rootFolder()` function.

If you transpile the code to JavaScript and run, you should see the following

```
[artemis] Starting artemis collection!
[runtime]: "Name: Root - Public - Node: 8194"
[runtime]: "Name: IPM_SUBTREE - Node: 8226 - Folder path: /Root - Public/IPM_SUBTREE"
[runtime]: "Name: NON_IPM_SUBTREE - Node: 8258 - Folder path: /Root - Public/NON_IPM_SUBTREE"
[runtime]: "Name: EFORMS REGISTRY - Node: 8290 - Folder path: /Root - Public/NON_IPM_SUBTREE/EFORMS REGISTRY"
[runtime]: "Name: Organization Forms - Node: 8322 - Folder path: /Root - Public/NON_IPM_SUBTREE/EFORMS REGISTRY/Organization Forms"

[runtime]: "Name: Root - Mailbox - Node: 8354"
[runtime]: "Name: Common Views - Node: 8386 - Folder path: /Root - Mailbox/Common Views"
[runtime]: "Name: Finder - Node: 8418 - Folder path: /Root - Mailbox/Finder"
[runtime]: "Name: Reminders - Node: 524355 - Folder path: /Root - Mailbox/Finder/Reminders"
[runtime]: "Name: Tracked Mail Processing - Node: 524387 - Folder path: /Root - Mailbox/Finder/Tracked Mail Processing"
[runtime]: "Name: To-Do Search - Node: 524419 - Folder path: /Root - Mailbox/Finder/To-Do Search"
[runtime]: "Name: Shortcuts - Node: 8450 - Folder path: /Root - Mailbox/Shortcuts"
[runtime]: "Name: Views - Node: 8482 - Folder path: /Root - Mailbox/Views"
[runtime]: "Name: IPM_SUBTREE - Node: 8514 - Folder path: /Root - Mailbox/IPM_SUBTREE"
[runtime]: "Name: Deleted Items - Node: 8546 - Folder path: /Root - Mailbox/IPM_SUBTREE/Deleted Items"
[runtime]: "Name: Inbox - Node: 8578 - Folder path: /Root - Mailbox/IPM_SUBTREE/Inbox"
[runtime]: "Name: Outbox - Node: 8610 - Folder path: /Root - Mailbox/IPM_SUBTREE/Outbox"
[runtime]: "Name: Sent Items - Node: 8642 - Folder path: /Root - Mailbox/IPM_SUBTREE/Sent Items"
[runtime]: "Name: Files - Node: 32802 - Folder path: /Root - Mailbox/IPM_SUBTREE/Files"
[runtime]: "Name: Archive - Node: 32834 - Folder path: /Root - Mailbox/IPM_SUBTREE/Archive"
[runtime]: "Name: Yammer Root - Node: 32866 - Folder path: /Root - Mailbox/IPM_SUBTREE/Yammer Root"
[runtime]: "Name: Inbound - Node: 33378 - Folder path: /Root - Mailbox/IPM_SUBTREE/Yammer Root/Inbound"
[runtime]: "Name: Outbound - Node: 33410 - Folder path: /Root - Mailbox/IPM_SUBTREE/Yammer Root/Outbound"
[runtime]: "Name: Feeds - Node: 33442 - Folder path: /Root - Mailbox/IPM_SUBTREE/Yammer Root/Feeds"
[runtime]: "Name: Conversation History - Node: 32898 - Folder path: /Root - Mailbox/IPM_SUBTREE/Conversation History"

[runtime]: "Name: Team Chat - Node: 33314 - Folder path: /Root - Mailbox/IPM_SUBTREE/Conversation History/Team Chat"
[runtime]: "Name: Conversation Action Settings - Node: 32930 - Folder path: /Root - Mailbox/IPM_SUBTREE/Conversation Action Settings"
[runtime]: "Name: ExternalContacts - Node: 32962 - Folder path: /Root - Mailbox/IPM_SUBTREE/ExternalContacts"
[runtime]: "Name: Junk Email - Node: 32994 - Folder path: /Root - Mailbox/IPM_SUBTREE/Junk Email"
[runtime]: "Name: Journal - Node: 33026 - Folder path: /Root - Mailbox/IPM_SUBTREE/Journal"
[runtime]: "Name: Calendar - Node: 33058 - Folder path: /Root - Mailbox/IPM_SUBTREE/Calendar"
[runtime]: "Name: Notes - Node: 33090 - Folder path: /Root - Mailbox/IPM_SUBTREE/Notes"
[runtime]: "Name: Contacts - Node: 33122 - Folder path: /Root - Mailbox/IPM_SUBTREE/Contacts"
[runtime]: "Name: Organizational Contacts - Node: 33218 - Folder path: /Root - Mailbox/IPM_SUBTREE/Contacts/Organizational Contacts"
[runtime]: "Name: GAL Contacts - Node: 33250 - Folder path: /Root - Mailbox/IPM_SUBTREE/Contacts/GAL Contacts"
[runtime]: "Name: Companies - Node: 33282 - Folder path: /Root - Mailbox/IPM_SUBTREE/Contacts/Companies"
[runtime]: "Name: {06967759-274D-40B2-A3EB-D7F9E73727D7} - Node: 33346 - Folder path: /Root - Mailbox/IPM_SUBTREE/Contacts/{06967759-274D-40B2-A3EB-D7F9E73727D7}"
[runtime]: "Name: Recipient Cache - Node: 33474 - Folder path: /Root - Mailbox/IPM_SUBTREE/Contacts/Recipient Cache"

[runtime]: "Name: PeopleCentricConversation Buddies - Node: 33506 - Folder path: /Root - Mailbox/IPM_SUBTREE/Contacts/PeopleCentricConversation Buddies"
[runtime]: "Name: {A9E2BC46-B3A0-4243-B315-60D991004455} - Node: 33538 - Folder path: /Root - Mailbox/IPM_SUBTREE/Contacts/{A9E2BC46-B3A0-4243-B315-60D991004455}"
[runtime]: "Name: Drafts - Node: 33154 - Folder path: /Root - Mailbox/IPM_SUBTREE/Drafts"
[runtime]: "Name: Tasks - Node: 33186 - Folder path: /Root - Mailbox/IPM_SUBTREE/Tasks"
[runtime]: "Name: Sync Issues - Node: 33570 - Folder path: /Root - Mailbox/IPM_SUBTREE/Sync Issues"
[runtime]: "Name: Conflicts - Node: 33602 - Folder path: /Root - Mailbox/IPM_SUBTREE/Sync Issues/Conflicts"
[runtime]: "Name: Local Failures - Node: 33634 - Folder path: /Root - Mailbox/IPM_SUBTREE/Sync Issues/Local Failures"
[runtime]: "Name: Server Failures - Node: 33666 - Folder path: /Root - Mailbox/IPM_SUBTREE/Sync Issues/Server Failures"
[runtime]: "Name: Quick Step Settings - Node: 33698 - Folder path: /Root - Mailbox/IPM_SUBTREE/Quick Step Settings"
[runtime]: "Name: ~MAPISP(Internal) - Node: 8674 - Folder path: /Root - Mailbox/~MAPISP(Internal)"
[runtime]: "Name: Drizzle - Node: 8706 - Folder path: /Root - Mailbox/Drizzle"
[runtime]: "Name: Shared Data - Node: 8770 - Folder path: /Root - Mailbox/Shared Data"
[runtime]: "Name: SPAM Search Folder 2 - Node: 8739 - Folder path: /Root - Mailbox/SPAM Search Folder 2"
[runtime]: "Name: ItemProcSearch - Node: 524323 - Folder path: /Root - Mailbox/ItemProcSearch"
```

Where Name is the folder name, Node is the folder ID, and Folder path is the
full path the the folder.

### Get email messages

So now we can walkthrough and access all folders in an OST file. Now lets get
the email messages.

```typescript
import { WindowsError } from "./artemis-api/src/windows/errors";
import { Outlook } from "./artemis-api/src/windows/outlook";
import type { SubFolder } from "./artemis-api/types/windows/outlook";

function main() {
  const path = "<path to test.ost>";
  const reader = new Outlook(path);

  const result = reader.rootFolder();
  if (result instanceof WindowsError) {
    console.log(result);
    return;
  }

  for (const sub of result.subfolders) {
    console.log(`Name: ${sub.name} - Node: ${sub.node}`);
    walkFolders(sub, reader, `/${sub.name}`);
  }
}

// Read a folder and then read any subfolders
function walkFolders(folder: SubFolder, reader: Outlook, full_path: string) {
  const result = reader.readFolder(folder.node);
  if (result instanceof WindowsError) {
    console.log(result);
    return;
  }

  // If the folder has messages, lets parse them
  if (result.message_count !== 0) {
    console.log(`Total messages: ${result.message_count}`);
    const limit = 200;
    let offset = 0;

    // message_count is the total messages in a folder
    let count = result.message_count;
    while (count !== 0) {
      const emails = reader.readMessages(
        result.messages_table,
        offset,
        limit,
      );
      if (emails instanceof WindowsError) {
        console.log(emails);
        break;
      }
      console.log(`Email messages: ${emails.length}`);
      for (const email of emails) {
        console.log(
          `Subject: ${email.subject} - From: ${email.from} - Folder: ${full_path}`,
        );
      }
      // Done if we do not hit limit
      if (emails.length < limit) {
        break;
      }
      count = emails.length;

      offset += limit;
    }
  }

  for (const sub of result.subfolders) {
    const path = `${full_path}/${sub.name}`;

    console.log(
      `Name: ${sub.name} - Node: ${sub.node} - Folder path: ${path}`,
    );
    walkFolders(sub, reader, path);
  }
}

main();
```

We added quite a bit code above.

1. The `FolderInfo` object contains a property called `message_count`. If this
   value is 0 then the folder has no messages. If the value is 1 the folder has
   1 message, if 10 then 10 messages, etc
2. So we want to start reading messages. Since we do not know the number of
   messages ahead of time we will set a limit of 200. And only read 200 messages
   at a time.

:::info

The limit you provide will directly influence memory usage by artemis when
parsing the OST file. The higher the limit the faster the parsing will be, but
at the cost of more memory.

200 is the default limit of the artemis Rust binary. This means when you run
`artemis acquire outlook` the binary will read 200 message and then output the
results. Then read the next 200 messages and repeat the process until all
messages are read.

:::

3. We also provide an offset value of 0. This tells artemis to start at the
   first message in the folder. If you only want messages 20-25. You would set
   the offset to 20 and the limit to 5.
4. Finally we provide the `messages_table` property associated with the
   FolderInfo object. This is the internal OST structure that artemis requires
   in order to parse messages.
5. The function `readMessages()` will return an array of MessageDetails or a
   WindowsError
6. We finally loop through the messages and print the Subject and From info.
   Then if if the number of messages we read are below the limit we provided
   then we are done. Otherwise we have more messages to read and the while loop
   continues.

If you transpile the code to JavaScript and run, you should see the following

```
[artemis] Starting artemis collection!
[runtime]: "Name: Root - Public - Node: 8194"
[runtime]: "Name: IPM_SUBTREE - Node: 8226 - Folder path: /Root - Public/IPM_SUBTREE"
[runtime]: "Name: NON_IPM_SUBTREE - Node: 8258 - Folder path: /Root - Public/NON_IPM_SUBTREE"
[runtime]: "Name: EFORMS REGISTRY - Node: 8290 - Folder path: /Root - Public/NON_IPM_SUBTREE/EFORMS REGISTRY"
[runtime]: "Name: Organization Forms - Node: 8322 - Folder path: /Root - Public/NON_IPM_SUBTREE/EFORMS REGISTRY/Organization Forms"
[runtime]: "Name: Root - Mailbox - Node: 8354"
[runtime]: "Name: Common Views - Node: 8386 - Folder path: /Root - Mailbox/Common Views"
[runtime]: "Name: Finder - Node: 8418 - Folder path: /Root - Mailbox/Finder"
[runtime]: "Name: Reminders - Node: 524355 - Folder path: /Root - Mailbox/Finder/Reminders"
[runtime]: "Name: Tracked Mail Processing - Node: 524387 - Folder path: /Root - Mailbox/Finder/Tracked Mail Processing"
[runtime]: "Name: To-Do Search - Node: 524419 - Folder path: /Root - Mailbox/Finder/To-Do Search"
[runtime]: "Name: Shortcuts - Node: 8450 - Folder path: /Root - Mailbox/Shortcuts"
[runtime]: "Name: Views - Node: 8482 - Folder path: /Root - Mailbox/Views"
[runtime]: "Name: IPM_SUBTREE - Node: 8514 - Folder path: /Root - Mailbox/IPM_SUBTREE"

[runtime]: "Name: Deleted Items - Node: 8546 - Folder path: /Root - Mailbox/IPM_SUBTREE/Deleted Items"
[runtime]: "Total messages: 1"
03:49:19 [WARN] [outlook] Caller asked for too many messages. Caller asked for 200 messages. But there are only 1 available. We will return 1
[runtime]: "Email messages: 1"
[runtime]: "Subject: Microsoft account security info was added - From: account-security-noreply@accountprotection.microsoft.com - Folder: /Root - Mailbox/IPM_SUBTREE/Deleted Items"

[runtime]: "Name: Inbox - Node: 8578 - Folder path: /Root - Mailbox/IPM_SUBTREE/Inbox"
[runtime]: "Total messages: 5"
03:49:19 [WARN] [outlook] Caller asked for too many messages. Caller asked for 200 messages. But there are only 5 available. We will return 5
[runtime]: "Email messages: 5"

[runtime]: "Subject:      Get to know your OneDrive – How to back up your PC and mobile - From: Microsoft@notificationmail.microsoft.com - Folder: /Root - Mailbox/IPM_SUBTREE/Inbox"
[runtime]: "Subject: Microsoft account security info was added - From: account-security-noreply@accountprotection.microsoft.com - Folder: /Root - Mailbox/IPM_SUBTREE/Inbox"
[runtime]: "Subject: Microsoft account security info verification - From: account-security-noreply@accountprotection.microsoft.com - Folder: /Root - Mailbox/IPM_SUBTREE/Inbox"
[runtime]: "Subject: Welcome to your new Outlook.com account - From: no-reply@microsoft.com - Folder: /Root - Mailbox/IPM_SUBTREE/Inbox"
[runtime]: "Subject: Hi - From: *****@outlook.com - Folder: /Root - Mailbox/IPM_SUBTREE/Inbox"

[runtime]: "Name: Outbox - Node: 8610 - Folder path: /Root - Mailbox/IPM_SUBTREE/Outbox"
[runtime]: "Name: Sent Items - Node: 8642 - Folder path: /Root - Mailbox/IPM_SUBTREE/Sent Items"
[runtime]: "Total messages: 1"
03:49:19 [WARN] [outlook] Caller asked for too many messages. Caller asked for 200 messages. But there are only 1 available. We will return 1
[runtime]: "Email messages: 1"

[runtime]: "Subject: Hi - From: /O=FIRST ORGANIZATION/OU=EXCHANGE ADMINISTRATIVE GROUP(FYDIBOHF23SPDLT)/CN=RECIPIENTS/CN=00037FFF859D663E - Folder: /Root - Mailbox/IPM_SUBTREE/Sent Items"

[runtime]: "Name: Files - Node: 32802 - Folder path: /Root - Mailbox/IPM_SUBTREE/Files"
[runtime]: "Name: Archive - Node: 32834 - Folder path: /Root - Mailbox/IPM_SUBTREE/Archive"
[runtime]: "Name: Yammer Root - Node: 32866 - Folder path: /Root - Mailbox/IPM_SUBTREE/Yammer Root"
[runtime]: "Name: Inbound - Node: 33378 - Folder path: /Root - Mailbox/IPM_SUBTREE/Yammer Root/Inbound"
[runtime]: "Name: Outbound - Node: 33410 - Folder path: /Root - Mailbox/IPM_SUBTREE/Yammer Root/Outbound"
[runtime]: "Name: Feeds - Node: 33442 - Folder path: /Root - Mailbox/IPM_SUBTREE/Yammer Root/Feeds"
[runtime]: "Name: Conversation History - Node: 32898 - Folder path: /Root - Mailbox/IPM_SUBTREE/Conversation History"
[runtime]: "Name: Team Chat - Node: 33314 - Folder path: /Root - Mailbox/IPM_SUBTREE/Conversation History/Team Chat"
[runtime]: "Name: Conversation Action Settings - Node: 32930 - Folder path: /Root - Mailbox/IPM_SUBTREE/Conversation Action Settings"
[runtime]: "Name: ExternalContacts - Node: 32962 - Folder path: /Root - Mailbox/IPM_SUBTREE/ExternalContacts"

[runtime]: "Name: Junk Email - Node: 32994 - Folder path: /Root - Mailbox/IPM_SUBTREE/Junk Email"
[runtime]: "Total messages: 1"
03:49:19 [WARN] [outlook] Caller asked for too many messages. Caller asked for 200 messages. But there are only 1 available. We will return 1
[runtime]: "Email messages: 1"

[runtime]: "Subject: Get started with Microsoft Learn - From: Learn@notifications.microsoft.com - Folder: /Root - Mailbox/IPM_SUBTREE/Junk Email"

[runtime]: "Name: Journal - Node: 33026 - Folder path: /Root - Mailbox/IPM_SUBTREE/Journal"
[runtime]: "Name: Calendar - Node: 33058 - Folder path: /Root - Mailbox/IPM_SUBTREE/Calendar"
[runtime]: "Total messages: 2"
03:49:19 [WARN] [outlook] Caller asked for too many messages. Caller asked for 200 messages. But there are only 2 available. We will return 2
[runtime]: "Email messages: 2"

[runtime]: "Subject: Deadline!! - From: /O=FIRST ORGANIZATION/OU=EXCHANGE ADMINISTRATIVE GROUP(FYDIBOHF23SPDLT)/CN=RECIPIENTS/CN=00037FFF859D663E - Folder: /Root - Mailbox/IPM_SUBTREE/Calendar"
[runtime]: "Subject: Something Due soon!? - From: /O=FIRST ORGANIZATION/OU=EXCHANGE ADMINISTRATIVE GROUP(FYDIBOHF23SPDLT)/CN=RECIPIENTS/CN=00037FFF859D663E - Folder: /Root - Mailbox/IPM_SUBTREE/Calendar"

[runtime]: "Name: Notes - Node: 33090 - Folder path: /Root - Mailbox/IPM_SUBTREE/Notes"
[runtime]: "Name: Contacts - Node: 33122 - Folder path: /Root - Mailbox/IPM_SUBTREE/Contacts"
[runtime]: "Name: Organizational Contacts - Node: 33218 - Folder path: /Root - Mailbox/IPM_SUBTREE/Contacts/Organizational Contacts"
[runtime]: "Name: GAL Contacts - Node: 33250 - Folder path: /Root - Mailbox/IPM_SUBTREE/Contacts/GAL Contacts"
[runtime]: "Name: Companies - Node: 33282 - Folder path: /Root - Mailbox/IPM_SUBTREE/Contacts/Companies"
[runtime]: "Name: {06967759-274D-40B2-A3EB-D7F9E73727D7} - Node: 33346 - Folder path: /Root - Mailbox/IPM_SUBTREE/Contacts/{06967759-274D-40B2-A3EB-D7F9E73727D7}"
[runtime]: "Name: Recipient Cache - Node: 33474 - Folder path: /Root - Mailbox/IPM_SUBTREE/Contacts/Recipient Cache"
[runtime]: "Name: PeopleCentricConversation Buddies - Node: 33506 - Folder path: /Root - Mailbox/IPM_SUBTREE/Contacts/PeopleCentricConversation Buddies"
[runtime]: "Name: {A9E2BC46-B3A0-4243-B315-60D991004455} - Node: 33538 - Folder path: /Root - Mailbox/IPM_SUBTREE/Contacts/{A9E2BC46-B3A0-4243-B315-60D991004455}"

[runtime]: "Name: Drafts - Node: 33154 - Folder path: /Root - Mailbox/IPM_SUBTREE/Drafts"
[runtime]: "Total messages: 1"
03:49:19 [WARN] [outlook] Caller asked for too many messages. Caller asked for 200 messages. But there are only 1 available. We will return 1
[runtime]: "Email messages: 1"
[runtime]: "Subject:  - From:  - Folder: /Root - Mailbox/IPM_SUBTREE/Drafts"

[runtime]: "Name: Tasks - Node: 33186 - Folder path: /Root - Mailbox/IPM_SUBTREE/Tasks"
[runtime]: "Name: Sync Issues - Node: 33570 - Folder path: /Root - Mailbox/IPM_SUBTREE/Sync Issues"
[runtime]: "Name: Conflicts - Node: 33602 - Folder path: /Root - Mailbox/IPM_SUBTREE/Sync Issues/Conflicts"
[runtime]: "Name: Local Failures - Node: 33634 - Folder path: /Root - Mailbox/IPM_SUBTREE/Sync Issues/Local Failures"
[runtime]: "Name: Server Failures - Node: 33666 - Folder path: /Root - Mailbox/IPM_SUBTREE/Sync Issues/Server Failures"
[runtime]: "Name: Quick Step Settings - Node: 33698 - Folder path: /Root - Mailbox/IPM_SUBTREE/Quick Step Settings"
[runtime]: "Name: ~MAPISP(Internal) - Node: 8674 - Folder path: /Root - Mailbox/~MAPISP(Internal)"
[runtime]: "Name: Drizzle - Node: 8706 - Folder path: /Root - Mailbox/Drizzle"
[runtime]: "Name: Shared Data - Node: 8770 - Folder path: /Root - Mailbox/Shared Data"
[runtime]: "Name: SPAM Search Folder 2 - Node: 8739 - Folder path: /Root - Mailbox/SPAM Search Folder 2"
[runtime]: "Name: ItemProcSearch - Node: 524323 - Folder path: /Root - Mailbox/ItemProcSearch"
```

You should notice some warning messages when running:

- `03:49:19 [WARN] [outlook] Caller asked for too many messages. Caller asked for 200 messages. But there are only 1 available. We will return 1`

Basically, artemis is letting us know that even though we asked for 200 messages
it only found 1 message in the folder. If we wanted to make the warnings go away
we can update our script to the following:

```typescript
let limit = 200;
if (limit > result.message_count) {
  limit = result.message_count;
}
```

Otherwise, you should see that artemis was able to extract messages from the
Inbox, Drafts, Junk Email, and even the Calendar!

### Output Message content

Lets output the content of single message based on a Subject line. Update your
script with the code below:

```typescript
import { WindowsError } from "./artemis-api/src/windows/errors";
import { Outlook } from "./artemis-api/src/windows/outlook";
import type { SubFolder } from "./artemis-api/types/windows/outlook";

function main() {
  const path = "<path to test.ost>";
  const reader = new Outlook(path);

  const result = reader.rootFolder();
  if (result instanceof WindowsError) {
    console.log(result);
    return;
  }

  for (const sub of result.subfolders) {
    console.log(`Name: ${sub.name} - Node: ${sub.node}`);
    walkFolders(sub, reader, `/${sub.name}`);
  }
}

// Read a folder and then read any subfolders
function walkFolders(folder: SubFolder, reader: Outlook, full_path: string) {
  const result = reader.readFolder(folder.node);
  if (result instanceof WindowsError) {
    console.log(result);
    return;
  }

  // If the folder has messages, lets parse them
  if (result.message_count !== 0) {
    console.log(`Total messages: ${result.message_count}`);
    const limit = 200;
    let offset = 0;

    // message_count is the total messages in a folder
    let count = result.message_count;
    while (count !== 0) {
      const emails = reader.readMessages(
        result.messages_table,
        offset,
        limit,
      );
      if (emails instanceof WindowsError) {
        console.log(emails);
        break;
      }
      console.log(`Email messages: ${emails.length}`);
      for (const email of emails) {
        console.log(
          `Subject: ${email.subject} - From: ${email.from} - Folder: ${full_path}`,
        );

        if (email.subject === "Hi") { // <---------- If the email subject equals "Hi", print the message body
          console.log(email.body);
        }
      }
      // Done if we do not hit limit
      if (emails.length < limit) {
        break;
      }
      count = emails.length;

      offset += limit;
    }
  }

  for (const sub of result.subfolders) {
    const path = `${full_path}/${sub.name}`;

    console.log(
      `Name: ${sub.name} - Node: ${sub.node} - Folder path: ${path}`,
    );
    walkFolders(sub, reader, path);
  }
}

main();
```

When you run your script you should get the following in your output:

```
<html><head>\r\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=iso-8859-1\">\r\n<style type=\"text/css\" style=\"display:none;\"> P {margin-top:0;margin-bottom:0;} </style>\r\n</head>\r\n<body dir=\"ltr\">\r\n<div class=\"elementToProof\" style=\"font-family: Aptos, Aptos_EmbeddedFont, Aptos_MSFontService, Calibri, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);\">\r\nWho took artemistest@outlook.com???!?!?!</div>\r\n</body>\r\n</html>\r\n
```

Once you unescape the string, the message can be rendered as:

```html
<html>
  <head>
    <meta
      http-equiv="Content-Type"
      content="text/html; charset=iso-8859-1"
    />
    <style type="text/css" style="display: none">
      p {
        margin-top: 0;
        margin-bottom: 0;
      }
    </style>
  </head>
  <body dir="ltr">
    <div
      class="elementToProof"
      style="font-family:
  Aptos,
  Aptos_EmbeddedFont,
  Aptos_MSFontService,
  Calibri,
  Helvetica,
  sans-serif; font-size: 12pt; color: rgb(0, 0, 0)"
    >
      Who took artemistest@outlook.com???!?!?!
    </div>
  </body>
</html>
```

### Read Attachments

So now we can read all folders and messages! Now lets get the attachments!

Update your TypeScript code with the following:

```typescript
import { WindowsError } from "./artemis-api/src/windows/errors";
import { Outlook } from "./artemis-api/src/windows/outlook";
import type { SubFolder } from "./artemis-api/types/windows/outlook";

function main() {
  const path = "<path to test.ost>";
  const reader = new Outlook(path);

  const result = reader.rootFolder();
  if (result instanceof WindowsError) {
    console.log(result);
    return;
  }

  for (const sub of result.subfolders) {
    console.log(`Name: ${sub.name} - Node: ${sub.node}`);
    walkFolders(sub, reader, `/${sub.name}`);
  }
}

// Read a folder and then read any subfolders
function walkFolders(folder: SubFolder, reader: Outlook, full_path: string) {
  const result = reader.readFolder(folder.node);
  if (result instanceof WindowsError) {
    console.log(result);
    return;
  }

  // If the folder has messages, lets parse them
  if (result.message_count !== 0) {
    console.log(`Total messages: ${result.message_count}`);
    const limit = 200;
    let offset = 0;

    // message_count is the total messages in a folder
    let count = result.message_count;
    while (count !== 0) {
      const emails = reader.readMessages(
        result.messages_table,
        offset,
        limit,
      );
      if (emails instanceof WindowsError) {
        console.log(emails);
        break;
      }
      console.log(`Email messages: ${emails.length}`);
      for (const email of emails) {
        console.log(
          `Subject: ${email.subject} - From: ${email.from} - Folder: ${full_path}`,
        );

        if (email.subject === "Hi") {
          console.log(email.body);
        }

        // Loop through attachment previews <-------------------------Check for attachments
        for (const attach of email.attachments) {
          console.log(`Attachment: ${attach.name}`);
        }
      }
      // Done if we do not hit limit
      if (emails.length < limit) {
        break;
      }
      count = emails.length;

      offset += limit;
    }
  }

  for (const sub of result.subfolders) {
    const path = `${full_path}/${sub.name}`;

    console.log(
      `Name: ${sub.name} - Node: ${sub.node} - Folder path: ${path}`,
    );
    walkFolders(sub, reader, path);
  }
}

main();
```

The MessageDetails object that is returned by `readMessages()` contains quite a
bit of metadata. It also includes the metadata we require if we want to grab any
attachments. If you run the code above you see the following:

```
[runtime]: "Subject: Welcome to your new Outlook.com account - From: no-reply@microsoft.com - Folder: /Root - Mailbox/IPM_SUBTREE/Inbox"
[runtime]: "Attachment: micros~1.png"
[runtime]: "Attachment: wm-qrc~1.png"
[runtime]: "Attachment: wm-cal~1.png"
[runtime]: "Attachment: wm-sec~1.png"
[runtime]: "Attachment: wm-sea~1.png"
[runtime]: "Attachment: wm-per~1.png"
[runtime]: "Attachment: wm-m365.png"
[runtime]: "Attachment: wm-hero.png"
[runtime]: "Attachment: wm-ema~1.png"
[runtime]: "Attachment: wm-goo~1.png"
[runtime]: "Attachment: wm-app~1.png"
[runtime]: "Attachment: wm-her~1.png"
[runtime]: "Attachment: wm-m36~1.png"
[runtime]: "Attachment: wm-man~1.png"
[runtime]: "Attachment: wm-not~1.png"
[runtime]: "Attachment: wm-qrc~1.png"
[runtime]: "Attachment: wm-tip~1.png"
```

We have not read any attachment yet, but we can at least access the names of any
attachment.

### Extract Attachments

Extracting email attachments is a very powerful scripting feature, however it is
**important** to be aware that it can potentially spike memory usage.

Remeber our limit for reading messages is 200. If we choose to just read all
attachments (which may be ok), it can potentially spike memory usage alot. For
example, if each of the 200 messages we read contain a 2MB attachment and decide
we want to read all of them.\
Thats already 400MBs of memory just for attachments! That does not even include
the message body and properties metadata.

To extract attachments update your code with the following:

```typescript
import { WindowsError } from "./artemis-api/src/windows/errors";
import { Outlook } from "./artemis-api/src/windows/outlook";
import type { SubFolder } from "./artemis-api/types/windows/outlook";

function main() {
  const path = "<path to test.ost>";
  const reader = new Outlook(path);

  const result = reader.rootFolder();
  if (result instanceof WindowsError) {
    console.log(result);
    return;
  }

  for (const sub of result.subfolders) {
    console.log(`Name: ${sub.name} - Node: ${sub.node}`);
    walkFolders(sub, reader, `/${sub.name}`);
  }
}

// Read a folder and then read any subfolders
function walkFolders(folder: SubFolder, reader: Outlook, full_path: string) {
  const result = reader.readFolder(folder.node);
  if (result instanceof WindowsError) {
    console.log(result);
    return;
  }

  // If the folder has messages, lets parse them
  if (result.message_count !== 0) {
    console.log(`Total messages: ${result.message_count}`);
    const limit = 200;
    let offset = 0;

    // message_count is the total messages in a folder
    let count = result.message_count;
    while (count !== 0) {
      const emails = reader.readMessages(
        result.messages_table,
        offset,
        limit,
      );
      if (emails instanceof WindowsError) {
        console.log(emails);
        break;
      }
      console.log(`Email messages: ${emails.length}`);
      for (const email of emails) {
        console.log(
          `Subject: ${email.subject} - From: ${email.from} - Folder: ${full_path}`,
        );

        if (email.subject === "Hi") {
          console.log(email.body);
        }

        for (const attach of email.attachments) {
          console.log(`Attachment: ${attach.name}`);

          // Read the attachment using the attach block and descriptor IDs <------------Access the attachment data
          const details = reader.readAttachment(
            attach.block_id,
            attach.descriptor_id,
          );
          if (details instanceof WindowsError) {
            console.error(details);
            continue;
          }

          console.log(details);
        }
      }
      // Done if we do not hit limit
      if (emails.length < limit) {
        break;
      }
      count = emails.length;

      offset += limit;
    }
  }

  for (const sub of result.subfolders) {
    const path = `${full_path}/${sub.name}`;

    console.log(
      `Name: ${sub.name} - Node: ${sub.node} - Folder path: ${path}`,
    );
    walkFolders(sub, reader, path);
  }
}

main();
```

:::info

You may want to redirect your output to a file like below:

`artemis -j <path to script.js> > out.txt`

:::

You should see something like the following in your output:

```json
{
  "data": "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",
  "size": 2654,
  "name": "microsoft-logo.png",
  "mime": "image/png",
  "extension": ".png",
  "method": "ByValue",
  "props": [
    {
      "name": ["PidTagCreationTime"],
      "property_type": "Time",
      "prop_id": 12295,
      "property_number": 64,
      "reference": 160,
      "value": "2024-09-10T04:03:30.000Z"
    },
    {
      "name": ["PidTagLastModificationTime"],
      "property_type": "Time",
      "prop_id": 12296,
      "property_number": 64,
      "reference": 192,
      "value": "2024-09-10T04:03:30.000Z"
    },
    {
      "name": ["PidTagAttachFilenameW"],
      "property_type": "String",
      "prop_id": 14084,
      "property_number": 31,
      "reference": 256,
      "value": "micros~1.png"
    },
    {
      "name": ["PidTagAttachLongFilenameW"],
      "property_type": "String",
      "prop_id": 14087,
      "property_number": 31,
      "reference": 288,
      "value": "microsoft-logo.png"
    },
    {
      "name": ["PidTagRenderingPosition"],
      "property_type": "Int32",
      "prop_id": 14091,
      "property_number": 3,
      "reference": 4294967295,
      "value": 4294967295
    },
    {
      "name": ["PidTagAttachContentId"],
      "property_type": "String",
      "prop_id": 14098,
      "property_number": 31,
      "reference": 352,
      "value": "microsoft-logo"
    },
    {
      "name": ["PidTagAttachFlags"],
      "property_type": "Int32",
      "prop_id": 14100,
      "property_number": 3,
      "reference": 4,
      "value": 4
    },
    {
      "name": ["Unknown"],
      "property_type": "Binary",
      "prop_id": 14109,
      "property_number": 258,
      "reference": 96,
      "value": "pm3MpYipKEqwWyw2JdU5ig=="
    },
    {
      "name": ["PidTagLanguage"],
      "property_type": "String",
      "prop_id": 14860,
      "property_number": 31,
      "reference": 384,
      "value": "EnUs"
    },
    {
      "name": ["PidTagAttachmentHidden"],
      "property_type": "Bool",
      "prop_id": 32766,
      "property_number": 11,
      "reference": 1,
      "value": 1
    },
    {
      "name": ["Unknown"],
      "property_type": "Bool",
      "prop_id": 32907,
      "property_number": 11,
      "reference": 1,
      "value": 1
    }
  ]
}
```

Thats alot of data! And this is just for one attachment thats 2654 bytes in
size!

The actual attachment data is base64 encoded. If you
[decode](https://gchq.github.io/CyberChef/) the data and render it, you should
get a image!
