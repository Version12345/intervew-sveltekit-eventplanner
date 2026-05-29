<script lang="ts">
	import { enhance } from '$app/forms';
	import { formatEventDate, nowForDatetimeLocal } from '$lib/utils/validate-date';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let editing = $state(false);
	let submitting = $state(false);
	let deleting = $state(false);

	const minDate = nowForDatetimeLocal();

	$effect(() => {
		if (form?.error) {
			editing = true;
		}
	});

	function toDatetimeLocal(iso: string | undefined): string {
		if (!iso) {
			return '';
		}

		return iso.length >= 16 ? iso.slice(0, 16) : iso;
	}
</script>

<a href="/" class="btn btn-ghost btn-sm mb-4">← Back to events</a>

{#await data.event}
	<div class="card bg-base-100 shadow-md" aria-busy="true" aria-live="polite">
		<div class="card-body gap-3">
			<div class="skeleton h-8 w-1/2"></div>
			<div class="skeleton h-4 w-full"></div>
			<div class="skeleton h-4 w-2/3"></div>
			<div class="skeleton h-6 w-40 mt-2"></div>
		</div>
	</div>
{:then event}
	{#if event}
		<div class="card bg-base-100 shadow-md">
			<div class="card-body">
				{#if editing}
					{#if form?.error}
						<div role="alert" class="alert alert-error mb-2">
							<span>{form.error}</span>
						</div>
					{/if}

					<form
						method="POST"
						action="?/update"
						use:enhance={() => {
							submitting = true;
							return async ({ update }) => {
								await update();
								submitting = false;
							};
						}}
					>
						<div class="form-control w-full">
							<label class="label" for="title">
								<span class="label-text">Title <span class="text-error">*</span></span>
							</label>
							<input
								id="title"
								name="title"
								type="text"
								class="input input-bordered w-full"
								value={form?.title ?? event.title}
								required
							/>
						</div>

						<div class="form-control w-full mt-3">
							<label class="label" for="description">
								<span class="label-text">Description</span>
							</label>
							<textarea
								id="description"
								name="description"
								rows="4"
								class="textarea textarea-bordered w-full"
								>{form?.description ?? event.description ?? ''}</textarea
							>
						</div>

						<div class="form-control w-full mt-3">
							<label class="label" for="date">
								<span class="label-text">
									Date &amp; time <span class="text-error">*</span>
								</span>
							</label>
							<input
								id="date"
								name="date"
								type="datetime-local"
								class="input input-bordered w-full"
								min={minDate}
								value={form?.date ?? toDatetimeLocal(event.date)}
								required
							/>
						</div>

						<div class="card-actions justify-end mt-6">
							<button type="button" class="btn btn-ghost" onclick={() => (editing = false)}>
								Cancel
							</button>
							<button type="submit" class="btn btn-primary" disabled={submitting}>
								{#if submitting}
									<span class="loading loading-spinner loading-sm"></span>
								{/if}
								{submitting ? 'Saving...' : 'Save changes'}
							</button>
						</div>
					</form>
				{:else}
					<h1 class="card-title text-2xl">{event.title}</h1>
					{#if event.description}
						<p class="text-base-content/70 whitespace-pre-line">{event.description}</p>
					{/if}
					<span class="badge badge-outline self-start mt-2">
						{formatEventDate(event.date)}
					</span>

					<div class="divider"></div>

					<div class="flex flex-wrap gap-2">
						<button class="btn btn-secondary btn-sm" onclick={() => (editing = true)}>
							Edit
						</button>

						<form
							method="POST"
							action="?/delete"
							use:enhance={() => {
								deleting = true;
								return async ({ update }) => {
									await update();
									deleting = false;
								};
							}}
						>
							<button type="submit" class="btn btn-error btn-outline btn-sm" disabled={deleting}>
								{#if deleting}
									<span class="loading loading-spinner loading-sm"></span>
								{/if}
								{deleting ? 'Deleting...' : 'Delete'}
							</button>
						</form>
					</div>
				{/if}
			</div>
		</div>
	{/if}
{:catch error}
	<div role="alert" class="alert alert-error">
		<span>{error.message}</span>
	</div>
{/await}
