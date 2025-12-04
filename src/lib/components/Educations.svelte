<script>
    import Renderer from "./Renderer.svelte";
    import { educationSchema } from "$lib/schema";
    import { educationSnippet, errorMessage } from "./snippets.svelte";
    const { data } = $props();
</script>

<div>
    <h2 class="category-title">🎓 Educations</h2>
    {#each data as education, index (index)}
        <Renderer
            data={education}
            message="Error while rendering education."
            schema={educationSchema}
            snippet={educationSnippet}
        />
    {/each}
</div>
