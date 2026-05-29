<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="card bg-base-100 shadow-md max-w-md mx-auto mt-12">
	<div class="card-body text-center">
		<div class="text-6xl mb-2">🙈</div>
		<h1 class="card-title justify-center text-3xl">{page.status}</h1>
		<p class="text-base-content/70">
			{page.error?.message ?? 'Something went wrong.'}
		</p>
		<div class="card-actions justify-center mt-4">
			<a href="/" class="btn btn-primary">Back to events</a>
		</div>
	</div>
</div>
