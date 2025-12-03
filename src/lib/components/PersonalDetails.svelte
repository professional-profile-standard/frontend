<script>
    import { personalDetailsSchema } from "$lib/schema";
    import { errorMessage } from "./PPS.svelte";
    const { data } = $props();

    const message = "Error while rendering personal details";
    let personal_details = $state(null);
    let error = $state(null);
    let renderError = $state(null);

    function validate() {
        try {
            personal_details = personalDetailsSchema.validateSync(data);
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

    function renderLocation(location) {
        if (!location) return "";
        if (typeof location === "string") return location;
        if (typeof location !== "object") return String(location);

        const parts = [];

        if (location.latitude) parts.push(location.latitude);
        if (location.longitude) parts.push(location.longitude);
        if (location.address) parts.push(location.address);
        if (location.street) parts.push(location.street);

        if (location.village) parts.push(location.village);
        else if (location.city) parts.push(location.city);

        if (location.state) parts.push(location.state);
        if (location.postal_code) parts.push(location.postal_code);
        if (location.country) parts.push(location.country);

        return parts.filter(Boolean).join(", ");
    }
    function getPhoneNumber(contact) {
        if (!contact) return "";
        return (
            personal_details.contact?.country_code +
            personal_details.contact?.phone_number
        );
    }
</script>

{#if error}
    {@render errorMessage(message, error)}
{:else if renderError}
    {@render errorMessage(message, renderError)}
{:else}
    <svelte:boundary {onerror}>
        {#if personal_details}
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
                    <a
                        href={`tel:${getPhoneNumber(personal_details?.contact)}`}
                    >
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
        {/if}
    </svelte:boundary>
{/if}
