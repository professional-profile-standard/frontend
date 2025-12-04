<script>
    import Educations from "./Educations.svelte";
    import Links from "./Links.svelte";
    import Profiles from "./Profiles.svelte";
    import Button from "./ui/Button.svelte";
    import Renderer from "./Renderer.svelte";
    import { miscSchema, personalDetailsSchema } from "$lib/schema";
    import { miscSnippet, personalDetailsSnippet } from "./snippets.svelte";

    const { pps } = $props();
    function printpps() {
        window.print();
    }
</script>

<div>
    {#if pps}
        <div class="pps-result">
            <div class="space-y-10">
                <Renderer
                    data={pps.personal_details}
                    message="Error while rendering personal details"
                    schema={personalDetailsSchema}
                    snippet={personalDetailsSnippet}
                />
                <Educations data={pps.educations} />
                <Links data={pps.links} />
                <Profiles data={pps.profiles} />
                <!-- <Misc data={pps.misc} /> -->
                <Renderer
                    data={pps.misc}
                    message="Error while rendering misc"
                    schema={miscSchema}
                    snippet={miscSnippet}
                />
            </div>
        </div>
        <Button onclick={printpps} cclass="my-10">Print</Button>
    {/if}
</div>
