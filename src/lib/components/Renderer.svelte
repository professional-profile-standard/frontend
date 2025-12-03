<script>
    import { errorMessage } from "$lib/components/snippets.svelte";
    const { data, message, schema, snippet, customValidation } = $props();

    let validatedData = $state(null);
    let error = $state(null);
    let renderError = $state(null);

    function validate() {
        try {
            validatedData = schema.validateSync(data);
            error = null;
            renderError = null;
        } catch (e) {
            error = e;
        }
    }

    $effect(() => {
        validate();
    });

    function onerror(e, r) {
        renderError = e;
    }
</script>

{#if error}
    {@render errorMessage(message, error)}
{:else if renderError}
    {@render errorMessage(message, renderError)}
{:else}
    <svelte:boundary {onerror}>
        {#if validatedData}
            {@render snippet(validatedData)}
        {/if}
    </svelte:boundary>
{/if}
