<script>
  export let data = null;
</script>

{#if data}
  <div>
    <h3 class="font-medium text-xl mb-2">Projects</h3>
    {#each data as project, index (index)}
      <div>
        <h3 class="font-medium">{project.name}</h3>
        <p>{project.description}</p>
        <div>
          {#each project.links as link, i (i)}
            <a href={link} target="_blank" rel="noopener noreferrer">
              {link}
            </a>
          {/each}
        </div>
        <div>
          <p>
            Tech Stack:{" "}
            {#each project.techstack as tech, i (i)}
              <span>{tech}, </span>
            {/each}
          </p>
        </div>
        <ul>
          {#each project.details as detail, i (i)}
            <li class="list-disc list-inside">{detail}</li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
{/if}