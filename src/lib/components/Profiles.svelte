<script>
    // import Skills from "./Skills.svelte";
    import Experience from "./Experiences.svelte";
    import Projects from "./Projects.svelte";
    import Renderer from "./Renderer.svelte";
    import {
        professionalSummarySnippet,
        skillsSnippet,
    } from "./snippets.svelte";
    import { professionalSummarySchema, skillsSchema } from "$lib/schema";

    export let data = null;
</script>

{#if data}
    <div>
        <h2 class="category-title">🪪 Profiles</h2>
        {#each Object.entries(data) as [profile, profileData] (profile)}
            <div class="bg-gray-800 p-2 rounded-lg">
                <h3 class="category-title">🪪 {profile}</h3>
                <div class="space-y-10">
                    <Renderer
                        data={profileData.professional_summary}
                        message="Error while rendering professional summary"
                        schema={professionalSummarySchema}
                        snippet={professionalSummarySnippet}
                    />
                    <Renderer
                        data={profileData.skills}
                        message="Error while rendering skills"
                        schema={skillsSchema}
                        snippet={skillsSnippet}
                    />
                    <Experience data={profileData.work_experience} />
                    <Projects data={profileData.projects} />
                    <!-- cert -->
                    <!-- misc -->
                </div>
            </div>
        {/each}
    </div>
{/if}
