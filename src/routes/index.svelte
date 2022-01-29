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
	<title>Sveltekit, PouchDB, and CouchDB Todos</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
	<div class="max-w-3xl mx-auto">
		<h1 class="text-4xl font-extrabold text-center">Sveltekit, PouchDB & CouchDB Todos</h1>
	</div>
	<div class="max-w-2xl mx-auto mt-20">
		<label for="email" class="block text-sm font-medium text-gray-700">Add todo</label>
		<div class="mt-1 flex rounded-md shadow-sm">
			<div class="relative flex items-stretch flex-grow focus-within:z-10">
				<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					<!-- https://icons.getbootstrap.com/icons/box-arrow-in-right/ -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="bi bi-box-arrow-in-right"
						viewBox="0 0 16 16"
					>
						<path
							fill-rule="evenodd"
							d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"
						/>
						<path
							fill-rule="evenodd"
							d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
						/>
					</svg>
				</div>
				<input
					type="text"
					name="todo-text"
					id="todo-text"
					class="focus:ring-0 focus:border-slate-500 block w-full rounded-none rounded-l-md pl-10 text-lg border-gray-300 transition placeholder:text-slate-400"
					placeholder="What needs to be done?"
				/>
			</div>
			<button
				type="button"
				class="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-slate-500 text-sm font-medium rounded-r-md text-white bg-slate-500 hover:bg-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 transition"
			>
				<!-- Heroicon name: solid/sort-ascending -->
				<svg
					class="h-5 w-5 text-white"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z"
					/>
				</svg>
				<span>Add</span>
			</button>
		</div>
		<div class="max-w-2xl mx-auto mt-20">
			<div class="mt-1 flex rounded-md shadow-sm bg-white p-2">
				<ul class="w-full">
					<li class="p-2">
						<div class="flex items-center">
							<div class="flex items-center h-6">
								<input
									id="todo-checkbox"
									name="todo-checkbox"
									type="checkbox"
									class="focus:ring-0 h-6 w-6 text-slate-600 border-slate-300 rounded"
								/>
							</div>
							<div class="ml-3 text-lg max-w-full grow">
								<input
									id="todo-item"
									name="todos-item"
									type="text"
									class="focus:ring-0 focus:border-slate-500 block rounded-md pl-3 text-lg border-slate-100 transition w-full"
								/>
							</div>
							<div class="ml-3 text-lg items-center">
								<button
									type="button"
									class="-ml-px inline-flex items-center space-x-2 px-4 py-3 border border-slate-500 text-lg font-medium rounded-md text-white bg-slate-500 hover:bg-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 transition"
								>
									<!-- https://icons.getbootstrap.com/icons/x-lg/ -->
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										fill="currentColor"
										class="bi bi-x-lg"
										viewBox="0 0 16 16"
									>
										<path
											fill-rule="evenodd"
											d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
										/>
										<path
											fill-rule="evenodd"
											d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
										/>
									</svg>
								</button>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>

<style>
	h1 {
		color: rgba(255, 255, 255, 0.3);
		text-shadow: -1px -1px rgb(51 65 85 / 20%);
	}
</style>
