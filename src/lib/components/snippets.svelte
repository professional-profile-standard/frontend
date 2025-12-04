<script module>
    export {
        errorMessage,
        personalDetailsSnippet,
        linkSnippet,
        professionalSummarySnippet,
        skillsSnippet,
        experienceSnippet,
    };
</script>

<script>
    import {
        formatDate,
        formatDateRange,
        renderLocation,
        getPhoneNumber,
    } from "$lib/utils";
</script>

{#snippet errorMessage(message, error)}
    <div
        class="border dark:border-red-400/50 border-red-600/50 rounded-lg dark:bg-red-800/50 bg-red-200/50 p-3"
    >
        <h2 class="text-lg font-medium">{message}</h2>
        <p class="text-sm mt-3">{error}</p>
    </div>
{/snippet}

{#snippet personalDetailsSnippet(personal_details)}
    <div>
        <figure class="mt-10 mb-3 size-[250px] flex">
            {#if personal_details.profile_pic}
                <img
                    class="block mx-auto mt-auto max-size-[250px] rounded-lg bg-gray-500"
                    src={personal_details.profile_pic}
                    alt={`${personal_details.first_name}'s profile pic`}
                />
            {:else}
                <p class="text-[200px] text-center">�</p>
            {/if}
        </figure>
        <h1 class="text-2xl">
            {personal_details.first_name}
            {personal_details.middle_name}
            {personal_details.last_name}
            ({personal_details.preferred_first_name})
        </h1>

        <p>{personal_details.gender}</p>
        <p>{personal_details.race}</p>
        <p>{renderLocation(personal_details.location)}</p>
        <p>
            <a href={`mailto:${personal_details.contact?.email}`}>
                {personal_details.contact?.email}
            </a>
        </p>
        <div>
            <a href={`tel:${getPhoneNumber(personal_details?.contact)}`}>
                <span>
                    {personal_details.contact?.country_code}
                </span>
                <span>
                    {personal_details.contact?.phone_number}
                </span>
            </a>
        </div>
        <p>
            <a href={personal_details.contact?.website} target="_blank"
                >{personal_details.contact?.website}</a
            >
        </p>
    </div>
{/snippet}

{#snippet linkSnippet(link)}
    <li>
        <a href={link.url} target="_blank" rel="noopener noreferrer">
            {link.url_text || link.name || link.url}
        </a>
    </li>
{/snippet}

{#snippet professionalSummarySnippet(professional_summary)}
    <div>
        <h4 class="font-medium text-xl mb-2">
            {professional_summary?.title}
        </h4>
        <p>{professional_summary?.summary}</p>
    </div>
{/snippet}

{#snippet skillsSnippet(data)}
    <div>
        <h3 class="font-medium text-xl mb-2">🛠️ Skills</h3>
        <div class="overflow-auto">
            <table class="w-full">
                <tbody>
                    {#each Object.entries(data) as [category, items] (category)}
                        <tr class="">
                            <td class="p-2">
                                <h3 class="font-medium text-lg">{category}</h3>
                            </td>
                            <td class="p-2">
                                {#each items as item, index (index)}
                                    <span>{item}, </span>
                                {/each}
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
{/snippet}

{#snippet experienceSnippet(job)}
    <div class="experience-item">
        <div class="flex items-start gap-3">
            {#if job.logo}
                <img
                    src={job.logo}
                    alt="{job.organization} logo"
                    class="w-12 h-12 rounded object-contain"
                />
            {/if}

            <div class="flex-1">
                <div
                    class="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-2"
                >
                    <h4 class="font-medium text-lg">
                        {job.title} at {job.organization}
                    </h4>

                    {#if job.duration || job.start_date}
                        <span class="text-sm text-gray-600">
                            {job.duration ||
                                formatDateRange(
                                    job.start_date,
                                    job.end_date,
                                    job.is_current,
                                )}
                        </span>
                    {/if}
                </div>

                <div class="flex flex-wrap items-center gap-3 mb-3">
                    <span class="text-gray-700">
                        {job.organization}
                    </span>

                    {#if job.location}
                        <span class="text-gray-600 text-sm">|</span>
                        <span class="text-gray-600 text-sm">
                            {job.location}
                        </span>
                    {/if}

                    {#if job.experience_type}
                        <span class="text-gray-600 text-sm">|</span>
                        <span
                            class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                        >
                            {job.experience_type}
                        </span>
                    {/if}

                    {#if job.is_current}
                        <span
                            class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs"
                        >
                            Current
                        </span>
                    {/if}
                </div>

                {#if job.description}
                    <p class="text-gray-700 mb-3">
                        {job.description}
                    </p>
                {/if}

                {#if job.contributions && job.contributions.length > 0}
                    <div class="mb-3">
                        <h5 class="font-medium text-gray-800 mb-2">
                            Key Contributions:
                        </h5>
                        <ul class="pl-5 space-y-1">
                            {#each job.contributions as contribution, i (i)}
                                <li class="list-disc text-gray-700">
                                    {contribution}
                                </li>
                            {/each}
                        </ul>
                    </div>
                {/if}

                {#if job.achievements && job.achievements.length > 0}
                    <div class="mb-3">
                        <h5 class="font-medium text-gray-800 mb-2">
                            Achievements:
                        </h5>
                        <ul class="pl-5 space-y-1">
                            {#each job.achievements as achievement, i (i)}
                                <li class="list-disc text-gray-700">
                                    {achievement}
                                </li>
                            {/each}
                        </ul>
                    </div>
                {/if}

                {#if job.technologies && job.technologies.length > 0}
                    <div class="mt-3">
                        <h5 class="font-medium text-gray-800 mb-2">
                            Technologies:
                        </h5>
                        <div class="flex flex-wrap gap-2">
                            {#each job.technologies as tech, i (i)}
                                <span
                                    class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                >
                                    {tech}
                                </span>
                            {/each}
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/snippet}
