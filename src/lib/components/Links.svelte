<script>
    import { linkSchema } from "$lib/schema";
    import { errorMessage } from "./snippets.svelte";
    import { linkSnippet } from "./snippets.svelte";
    import Renderer from "./Renderer.svelte";
    const { data } = $props();
</script>

<div>
    <h2 class="category-title">🔗 Links</h2>
    <ul class="space-y-2">
        {#each data as link}
            <Renderer
                data={link}
                message="Error while rendering Links."
                schema={linkSchema}
                snippet={linkSnippet}
            />
        {/each}
    </ul>
</div>
