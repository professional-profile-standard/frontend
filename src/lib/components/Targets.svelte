<script>
    // import ProfessionalSummary from "./ProfessionalSummary.svelte";
    import Skills from "./Skills.svelte";
    import WorkExperience from "./WorkExperience.svelte";
    import Projects from "./Projects.svelte";

    export let data = null;
</script>

{#if data}
    <div>
        {#each Object.entries(data) as [role, roleData] (role)}
            <div class="space-y-3">
                <h2 class="font-medium text-xl">{role.toUpperCase()}</h2>
                <!-- <ProfessionalSummary data={roleData.professional_summary} /> -->
                <div>
                    <h3 class="font-medium text-xl mb-2">{data.title}</h3>
                    <p>{data.summary}</p>
                </div>
                <Skills data={roleData.skills} />
                <WorkExperience data={roleData.work_experience} />
                <Projects data={roleData.projects} />
            </div>
        {/each}
    </div>
{/if}
