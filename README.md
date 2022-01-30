# SvelteKit, PouchDB, CouchDB Todos

A simple todos app using SvelteKit, PouchDB, CouchDB and Tailwind CSS. Data is stored in browser IndexedDB with PouchDB and syncs with a remote CouchDB database.

![Screenshot of SvelteKit, PouchDB, CouchDB Todos](/static/sveltekit-pouchdb-couchdb-todos-screenshot.png)

## Features

- Add todos
    - By pressing the Add button
    - By pressing `Enter` key while the caret is in todo item input field
    - Won't add todo item if the todo item input field is empty
    - Keeps caret focus in add todo input field for quick succession of adding todo items
- Update todos
    - Update todo item on blur or by pressing Enter key
- Delete todos
    - By pressing `X` (delete) button
    - By having an empty todo item input field on blur or by pressing `Enter` key
- Reactive data
- Beautiful UI

## TODO
- [ ] Add user authentication using CouchDB
- [ ] When added, todos are attached to a user id
- [ ] Only allow users to view their own todos

## Give it a whirl

Once you've cloned or downloaded the project, install dependencies with `npm install` (or `pnpm install` or `yarn`), then start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment.
