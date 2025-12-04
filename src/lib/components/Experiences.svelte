<script>
    import { errorMessage, experienceSnippet } from "./snippets.svelte";
    import Renderer from "./Renderer.svelte";
    import { experienceSchema } from "$lib/schema";
    const { data } = $props();
</script>

<div>
    <h2 class="category-title">🎯 Experiences</h2>
    <div class="space-y-2">
        {#each data as experience}
            <Renderer
                data={experience}
                message="Error while rendering experience."
                schema={experienceSchema}
                snippet={experienceSnippet}
            />
        {/each}
    </div>
</div>
