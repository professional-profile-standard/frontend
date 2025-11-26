<script>
    import Educations from "./Educations.svelte";
    import PersonalDetails from "./PersonalDetails.svelte";
    import Links from "./Links.svelte";
    import Misc from "./Misc.svelte";
    import Targets from "./Targets.svelte";
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
                <Misc data={pps.misc} />
                <Targets data={pps.targets} />
            </div>
        </div>
        <Button onclick={printpps} cclass="my-10">Print</Button>
    {/if}
</div>
