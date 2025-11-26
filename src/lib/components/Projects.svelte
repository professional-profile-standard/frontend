<script>
  export let data = null;
</script>

{#if data}
  <div>
    <h2 class="category-title">Projects</h2>
    {#each data as project, index (index)}
      <div class="space-y-1">
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
            <span class="font-medium">Tech Stack</span>:{" "}
            {#each project.techstack as tech, i (i)}
              <span>{tech}, </span>
            {/each}
          </p>
        </div>
        <ul class="pl-3">
          {#each project.details as detail, i (i)}
            <li class="list-disc list-inside">{detail}</li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
{/if}