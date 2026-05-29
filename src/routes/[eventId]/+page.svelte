<script lang="ts">
	import type { PageData } from "./$types";

    let {data}: {data: PageData} = $props();
</script>


<div>
    {#if data.event}
        <h2 class="text-lg font-bold">{data.event.id}: {data.event.title}</h2>
        <p>{data.event.description}</p>
        <p>{data.event.date}</p>
    {/if}
</div>