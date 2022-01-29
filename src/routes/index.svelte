<script context="module">
	export const prerender = true;
</script>

<script>
	import { onMount } from 'svelte';
	import { db } from '$lib/db.js';

	onMount(async () => {
		/**
		 * Wait until pouchdb-browser is imported and then use PouchDB
		 * Do this inside (browser) or onMount
		 * Must do this for it to work in SvelteKit
		 */
		let { default: PouchDB } = await import('pouchdb-browser');

		var remoteCouch = 'http://admin:password@127.0.0.1:5984/db_todos';
		const replicate = PouchDB.sync('db_todos', remoteCouch, {
			live: true,
			retry: true
		})
			.on('change', async function (i) {
				await updateContact();
				console.log('Databases synchronized successfully');
			})
			.on('error', function (err) {
				console.log('There is an error in sync' + err);
			});
	});
</script>

<svelte:head>
	<title>Sveltekit PouchDB CouchDB Todos</title>
</svelte:head>

<h1 class="text-3xl font-bold">Sveltekit PouchDB CouchDB Todos</h1>
