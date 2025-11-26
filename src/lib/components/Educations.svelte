<script>
  export let data = null;
</script>

{#if data}
  <div>
    <h2 class="category-title">Education</h2>
    {#each data as education, index (index)}
      <div>
        <h3>{education.name}</h3>
        <p>{education.location}</p>
        <p>
          {education.from} - {education.to}
        </p>
        <p>
          {education.degree_name} in {education.field_of_study}
        </p>
        <ul>
          {#each education.achievements as achievement, i (i)}
            <li>{achievement}</li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
{/if}