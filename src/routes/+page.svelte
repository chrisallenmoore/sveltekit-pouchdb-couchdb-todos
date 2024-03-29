<script>
	import { onMount } from 'svelte';
	import { setContext } from 'svelte';
	import { db } from '$lib/db.js';
	import TodosList from '$lib/TodosList.svelte';
	import EmptyTodosList from '$lib/EmptyTodosList.svelte';

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
				await getTodos();
				console.log('Databases synchronized successfully');
			})
			.on('error', function (err) {
				console.log('There is an error in sync' + err);
			});

		function addEventListeners() {
			const todoInput = document.getElementById('todo-text');
			todoInput.addEventListener('keypress', addTodoKeyPressHandler, false);
		}
		addEventListeners();
		await getTodos();
	});

	/**
	 * Define some stuff
	 */
	let todos = [];
	let item = '';
	let completed = false;

	/**
	 * Create a new todo document and enter it in the database
	 */
	async function addTodo(event) {
		const newTodo = {
			_id: new Date().toISOString(),
			item: item,
			completed: completed
		};
		const todoInput = document.getElementById('todo-text');
		if (todoInput.value !== '') {
			const sendToDB = await db.post(newTodo);
			if (sendToDB.ok) {
				await getTodos();
			}
			item = '';
		}
	}

	/**
	 * When Enter key is pressed while caret is in todo input field,
	 * submit the todo item if it's not empty
	 */
	async function addTodoKeyPressHandler(event) {
		const todoInput = document.getElementById('todo-text');
		if (event.code === 'Enter') {
			if (todoInput.value !== '') {
				await addTodo();
			}
		}
	}

	/**
	 * Show the current list of todos by reading them from the database
	 */
	async function getTodos() {
		const allTodos = await db.allDocs({
			include_docs: true
		});

		todos = allTodos.rows.map((row) => row.doc);
	}

	/**
	 * Set the context up for child components
	 */
	setContext('toggleTodoCompletedAction', { toggleCompleted });
	setContext('deleteTodoAction', { deleteTodo });
	setContext('updateTodoAction', { updateTodo });
	setContext('updateTodoEnterKeyAction', { updateTodoEnterKey });

	/**
	 * Toggle the checkbox if the todo item is completed or not
	 */
	async function toggleCompleted(todo) {
		let checkboxEditTodo = document.getElementById('todo-item_' + todo._id);
		if (todo.completed === true) {
			todo.completed = false;
			checkboxEditTodo.classList.remove('checked');
		} else if (todo.completed === false) {
			todo.completed = true;
			checkboxEditTodo.classList.add('checked');
		}
		await db.put(todo);
	}

	/**
	 * The delete button for a todo deletes the todo
	 */
	async function deleteTodo(todo) {
		await db.remove(todo);
	}

	/**
	 * On blur, save updated todo item or delete the todo if it's empty
	 */
	function updateTodo(todo) {
		var trimmedText = todo.item.trim();
		if (!trimmedText) {
			db.remove(todo);
		} else {
			todo.item = trimmedText;
			db.put(todo);
		}
	}

	/**
	 * If the enter key is pressed while editing a todo item, blur the todo item's input to trigger save or delete
	 */
	async function updateTodoEnterKey(todo, event) {
		if (event.code == 'Enter') {
			let inputEditTodo = document.getElementById('todo-item_' + todo._id);
			inputEditTodo.blur();
		}
	}
</script>

<svelte:head>
	<title>Sveltekit, PouchDB, and CouchDB Todos</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
	<div class="max-w-3xl mx-auto">
		<h1 class="text-4xl font-extrabold text-center">SvelteKit, PouchDB & CouchDB Todos</h1>
	</div>
	<div class="max-w-2xl mx-auto mt-20">
		<label for="todo-text" class="block text-sm font-medium text-gray-700">Add todo</label>
		<section class="mt-1 flex rounded-md shadow-sm">
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
					bind:value={item}
				/>
			</div>
			<button
				type="button"
				class="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-slate-500 text-sm font-medium rounded-r-md text-white bg-slate-500 hover:bg-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 transition"
				on:click={addTodo}
			>
				<span>Add</span>
			</button>
		</section>
		{#if todos.length > 0}
			<TodosList {todos} />
		{:else}
			<EmptyTodosList />
		{/if}
	</div>
</div>

<style>
	h1 {
		color: rgba(255, 255, 255, 0.3);
		text-shadow: -1px -1px rgb(51 65 85 / 20%);
	}
</style>
