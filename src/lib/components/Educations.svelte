<script>
    import { educationSchema } from "$lib/schema";
    import { formatDate } from "$lib/utils";
    import { errorMessage } from "./snippets.svelte";
    const { data } = $props();
    const message = "Error while rendering education";
    let educations = $state([]);
    let error = $state(null);
    let renderError = $state(null);

    function validate() {
        const validated = [];
        try {
            for (let education of data) {
                validated.push(educationSchema.validateSync(education));
            }
            educations = validated;
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
    <svelte:boundary>
        {#if educations}
            <div>
                <h2 class="category-title">🎓 Educations</h2>
                {#each educations as education, index (index)}
                    <div
                        class="education-item mb-4 bg-card p-2 rounded-lg space-y-1"
                    >
                        <div class="flex items-center gap-2 text-lg">
                            {#if education.logo}{:else}
                                <p>🏫</p>
                            {/if}
                            <h3 class="font-medium self-end leading-none">
                                {education.institute_name}
                            </h3>
                        </div>

                        <p>
                            {education.degree_name}
                        </p>

                        {#if education.field}
                            <p>Field: {education.field}</p>
                        {/if}

                        {#if education.subfield}
                            <p>Subfield: {education.subfield}</p>
                        {/if}

                        {#if education.specialization}
                            <p>Specialization: {education.specialization}</p>
                        {/if}

                        {#if education.cgpa}
                            <p>CGPA: {education.cgpa}</p>
                        {/if}

                        {#if education.location}
                            <p>Location: {education.location}</p>
                        {/if}

                        {#if education.duration}
                            <p>Duration: {education.duration}</p>
                        {/if}

                        {#if education.start_date || education.end_date}
                            <p>
                                {formatDate(education.start_date)} - {formatDate(
                                    education.end_date,
                                )}
                            </p>
                        {/if}

                        {#if education.achievements?.length > 0}
                            <div>
                                <h4>Achievements</h4>
                                <ul>
                                    {#each education.achievements as achievement}
                                        <li>{achievement}</li>
                                    {/each}
                                </ul>
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        {/if}
    </svelte:boundary>
{/if}
