<script>
    import { errorMessage, projectSnippet } from "./snippets.svelte";
    import Renderer from "./Renderer.svelte";
    import { projectSchema } from "$lib/schema";
    const { data } = $props();
</script>

<div>
    <h2 class="category-title">💪 Projects</h2>
    <div>
        {#each data as project}
            <Renderer
                data={project}
                message="Error while rendering project."
                schema={projectSchema}
                snippet={projectSnippet}
            />
        {/each}
    </div>
</div>
