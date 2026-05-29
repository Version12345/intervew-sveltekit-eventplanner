<script lang="ts">
	import type { PageData } from './$types';
	import type { Event } from '$lib/server/remote-events';
	import { formatEventDate } from '$lib/utils/validate-date';

	let { data }: { data: PageData } = $props();

	function sortByDate(events: Event[]): Event[] {
		return [...events].sort((a, b) => {
			return new Date(a.date).getTime() - new Date(b.date).getTime();
		});
	}
</script>

<div class="flex items-center justify-between mb-6">
	<h1 class="text-2xl font-bold">Your events</h1>
	<a href="/newevent" class="btn btn-primary btn-sm hidden sm:inline-flex">+ Add event</a>
</div>

{#await data.events}
	<div class="space-y-3" aria-busy="true" aria-live="polite">
		{#each Array.from({ length: 3 }, (_, i) => i) as i (i)}
			<div class="card card-bordered bg-base-100 shadow-sm">
				<div class="card-body gap-3">
					<div class="skeleton h-6 w-3/4"></div>
					<div class="skeleton h-4 w-full"></div>
					<div class="skeleton h-4 w-1/3"></div>
				</div>
			</div>
		{/each}
	</div>
{:then events}
	{@const sorted = sortByDate(events)}
	{#if sorted.length === 0}
		<div class="text-center py-16 text-base-content/70">
			<p class="text-lg mb-4">No events yet.</p>
		</div>
	{:else}
		<ul class="space-y-3">
			{#each sorted as event (event.id)}
				<li>
					<a
						href="/{event.id}"
						class="card card-bordered bg-base-100 shadow-sm hover:shadow-md transition-shadow block"
					>
						<div class="card-body">
							<h2 class="card-title">{event.title}</h2>
							{#if event.description}
								<p class="text-base-content/70 text-sm line-clamp-2">
									{event.description}
								</p>
							{/if}
							<div class="card-actions justify-end">
								<span class="badge badge-outline">{formatEventDate(event.date)}</span>
							</div>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
{:catch error}
	<div role="alert" class="alert alert-error">
		<span>Failed to load events: {error.message}</span>
	</div>
{/await}
