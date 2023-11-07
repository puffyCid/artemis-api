---
sidebar_position: 8
description: Common Issues or Questions
---

# Common Issues

A list of common questions or issues (errors) you may encounter while scripting.

### Outdated Deno cache

When you import the artemis-api using Deno. Deno will cache the API to your
system. Sometimes this cache get outdated.

You should try to periodically refresh the cache while using artemis. You can
refersh the cached API with:

`deno cache -r <path to main.ts>`

You only need to update the cache once. If you have multiple deno script
projects, you do **not** need to refresh the cache for all of them.

You may need to update your scripts if the artemis API has changed.
