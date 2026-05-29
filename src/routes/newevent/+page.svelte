<script lang="ts">
	import { enhance } from '$app/forms';
	import { nowForDatetimeLocal } from '$lib/utils/validate-date';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	let submitting = $state(false);

	const minDate = nowForDatetimeLocal();
</script>

<a href="/" class="btn btn-ghost btn-sm mb-4">← Back to events</a>

<h1 class="text-2xl font-bold mb-6">New event</h1>

<div class="card bg-base-100 shadow-md">
	<div class="card-body">
		{#if form?.error}
			<div role="alert" class="alert alert-error mb-2">
				<span>{form.error}</span>
			</div>
		{/if}

		<form
			method="POST"
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
					value={form?.title ?? ''}
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
					placeholder="Describe your event..."
					class="textarea textarea-bordered w-full">{form?.description ?? ''}</textarea
				>
			</div>

			<div class="form-control w-full mt-3">
				<label class="label" for="date">
					<span class="label-text">Date &amp; time <span class="text-error">*</span></span>
				</label>
				<input
					id="date"
					name="date"
					type="datetime-local"
					class="input input-bordered w-full"
					min={minDate}
					value={form?.date ?? ''}
					required
				/>
			</div>

			<div class="card-actions justify-end mt-6">
				<a href="/" class="btn btn-ghost">Cancel</a>
				<button type="submit" class="btn btn-primary" disabled={submitting}>
					{#if submitting}
						<span class="loading loading-spinner loading-sm"></span>
					{/if}
					{submitting ? 'Creating...' : 'Create event'}
				</button>
			</div>
		</form>
	</div>
</div>
