import { browser } from "$app/env";

var pouchdb;

if (browser) {
    /**
     * Wait until pouchdb-browser is imported and then use PouchDB
     * Do this inside (browser) or onMount
     * Must do this for it to work in SvelteKit
     */
    const { default: PouchDB } = await import('pouchdb-browser');
    pouchdb = new PouchDB('db_todos');
}

export var db = pouchdb;