<script>
  export let data = null;
</script>

{#if data}
  <div>
    <h1 class="text-2xl">
      {data.first_name} {data.middle_name} {data.last_name} (
      {data.preferred_first_name})
    </h1>
    <p>{data.gender}</p>
    <p>{data.race}</p>
    <p>{data.location}</p>
    <p>{data.contact.email}</p>
    <p>
      {data.contact.country_code} {data.contact.phone_number}
    </p>
    <p>{data.contact.website}</p>
  </div>
{/if}