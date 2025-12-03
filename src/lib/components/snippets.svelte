<script module>
    export { errorMessage, personalDetailsSnippet };
</script>

<script>
    import { formatDate, renderLocation, getPhoneNumber } from "$lib/utils";
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
