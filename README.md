# SvelteKit, PouchDB, CouchDB Todos

A simple todos app using SvelteKit, PouchDB, CouchDB and Tailwind CSS. Data is stored in browser IndexedDB with PouchDB and syncs with a remote CouchDB database.

![Screenshot of SvelteKit, PouchDB, CouchDB Todos](/static/sveltekit-pouchdb-couchdb-todos-screenshot.png)

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
