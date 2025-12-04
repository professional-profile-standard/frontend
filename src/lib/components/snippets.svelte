<script module>
    export {
        errorMessage,
        personalDetailsSnippet,
        linkSnippet,
        professionalSummarySnippet,
        skillsSnippet,
        experienceSnippet,
        educationSnippet,
        projectSnippet,
        miscSnippet,
        certificateSnippet
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

{#snippet educationSnippet(education)}
    <div class="education-item mb-4 bg-card p-2 rounded-lg space-y-1">
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
{/snippet}

{#snippet projectSnippet(project)}
    <div class="space-y-1">
        <h3 class="font-medium">{project.name}</h3>
        <p>{project.short_description}</p>
        {#if project.description}
            <p class="text-gray-600">{project.description}</p>
        {/if}

        {#if project.links && project.links.length > 0}
            <div class="flex flex-wrap gap-2">
                {#each project.links as link, i (i)}
                    {#if typeof link === "string"}
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-blue-600 hover:underline"
                        >
                            {link}
                        </a>
                    {:else}
                        <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-blue-600 hover:underline"
                        >
                            {link.name || link.url}
                        </a>
                    {/if}
                {/each}
            </div>
        {/if}

        {#if project.techstack && project.techstack.length > 0}
            <div>
                <p>
                    <span class="font-medium">Tech Stack</span>:{" "}
                    {#each project.techstack as tech, i (i)}
                        <span
                            class="inline-block bg-gray-100 px-2 py-1 rounded text-sm mr-1"
                        >
                            {tech}{#if i < project.techstack.length - 1},{/if}
                        </span>
                    {/each}
                </p>
            </div>
        {/if}

        {#if project.details && project.details.length > 0}
            <ul class="pl-3 space-y-1">
                {#each project.details as detail, i (i)}
                    <li class="list-disc list-inside">{detail}</li>
                {/each}
            </ul>
        {/if}
    </div>
{/snippet}

{#snippet miscSnippet(data)}
    <div>
        <h2 class="category-title">➕ Misc</h2>

        <!-- Cover Letter -->
        {#if data.cover_letter}
            <div>
                <h3 class="font-medium text-lg">Cover Letter</h3>
                <p>{data.cover_letter}</p>
            </div>
        {/if}

        <!-- Q&A Section -->
        {#if data.qna && Object.keys(data.qna).length > 0}
            <div>
                <h3 class="font-medium text-lg">Q&A</h3>
                <dl>
                    {#each Object.entries(data.qna) as [question, answer] (question)}
                        <div>
                            <dt class="font-medium">{question}</dt>
                            <dd class="ml-4">{answer}</dd>
                        </div>
                    {/each}
                </dl>
            </div>
        {/if}

        <!-- Notes -->
        {#if data.notes}
            <div>
                <h3 class="font-medium text-lg">Notes</h3>
                <p>{data.notes}</p>
            </div>
        {/if}

        <!-- Others Section -->
        {#if data.others && Object.keys(data.others).length > 0}
            <div>
                <h3 class="font-medium text-lg">Others</h3>
                <dl>
                    {#each Object.entries(data.others) as [key, value] (key)}
                        <div>
                            <dt class="font-medium">{key}</dt>
                            <dd class="ml-4">
                                {#if typeof value === "object" && !Array.isArray(value)}
                                    <pre>{JSON.stringify(value, null, 2)}</pre>
                                {:else}
                                    {value}
                                {/if}
                            </dd>
                        </div>
                    {/each}
                </dl>
            </div>
        {/if}
    </div>
{/snippet}

{#snippet certificateSnippet(certificate)}
    <div class="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
        <div>
            <h4 class="font-bold text-gray-900">{certificate.name}</h4>
            <p class="text-sm text-gray-600">{certificate.issuer}</p>
        </div>

        <div class="grid grid-cols-2 gap-2 text-sm">
            {#if certificate.issue_date}
                <div>
                    <span class="text-gray-500">Issued:</span>
                    <span class="ml-1 text-gray-700"
                        >{formatDate(certificate.issue_date)}</span
                    >
                </div>
            {/if}

            {#if certificate.expiry_date}
                <div>
                    <span class="text-gray-500">Expires:</span>
                    <span class="ml-1 text-gray-700"
                        >{formatDate(certificate.expiry_date)}</span
                    >
                </div>
            {/if}

            {#if certificate.credential_id}
                <div class="col-span-2">
                    <span class="text-gray-500">ID:</span>
                    <span class="ml-1 font-mono text-gray-700"
                        >{certificate.credential_id}</span
                    >
                </div>
            {/if}
        </div>

        {#if certificate.url}
            <div>
                <a
                    href={certificate.url}
                    target="_blank"
                    class="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center"
                >
                    🔗 View Certificate
                </a>
            </div>
        {/if}

        {#if certificate.skills && certificate.skills.length > 0}
            <div class="flex flex-wrap gap-1 pt-2 border-t">
                {#each certificate.skills as skill}
                    <span
                        class="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                    >
                        {skill}
                    </span>
                {/each}
            </div>
        {/if}
    </div>
{/snippet}
