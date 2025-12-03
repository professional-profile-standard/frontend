<script module>
    export { errorMessage };
</script>

<script>
    import Educations from "./Educations.svelte";
    import PersonalDetails from "./PersonalDetails.svelte";
    import Links from "./Links.svelte";
    import Misc from "./Misc.svelte";
    import Profiles from "./Profiles.svelte";
    import Button from "./ui/Button.svelte";

    const { pps } = $props();
    function printpps() {
        window.print();
    }
</script>

<div>
    {#if pps}
        <div class="pps-result">
            <div class="space-y-10">
                <PersonalDetails data={pps.personal_details} />
                <Educations data={pps.educations} />
                <Links data={pps.links} />
                <Profiles data={pps.profiles} />
                <Misc data={pps.misc} />
            </div>
        </div>
        <Button onclick={printpps} cclass="my-10">Print</Button>
    {/if}
</div>

{#snippet errorMessage(message, error)}
    <div
        class="border dark:border-red-400/50 border-red-600/50 rounded-lg dark:bg-red-800/50 bg-red-200/50 p-3"
    >
        <h2 class="text-lg font-medium">{message}</h2>
        <p class="text-sm mt-3">{error}</p>
    </div>
{/snippet}
