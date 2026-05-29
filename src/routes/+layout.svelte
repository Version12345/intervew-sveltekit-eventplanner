<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="min-h-screen bg-base-200">
	<nav class="navbar bg-base-100 shadow-sm px-4 sticky top-0 z-10">
		<div class="navbar-start">
			<a href="/" class="text-xl font-bold tracking-tight">
				Event Planner
			</a>
		</div>
		<div class="navbar-end">
			<a href="/newevent" class="btn btn-primary btn-sm">+ New Event</a>
		</div>
	</nav>

	<main class="container mx-auto max-w-3xl px-4 py-8">
		{@render children()}
	</main>
</div>
