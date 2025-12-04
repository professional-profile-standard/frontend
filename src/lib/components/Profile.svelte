<script>
    import { errorMessage } from "./snippets.svelte";
    import { profileSchema } from "$lib/schema";
    import { profileSnippet } from "./snippets.svelte";
    import Renderer from "./Renderer.svelte";
    const { profile, data } = $props();
    console.log(data);
</script>

<div>
    <h3 class="category-title">🪪 {profile}</h3>
    <div>
        <Renderer
            {data}
            message="Error while rendering profile."
            schema={profileSchema}
            snippet={profileSnippet}
        />
    </div>
</div>
