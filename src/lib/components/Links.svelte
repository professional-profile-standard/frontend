<script>
  export let data = null;
</script>

{#if data}
  <div>
    <h2 class="text-xl font-medium">Links</h2>
    <ul>
      {#each data as link, index (index)}
        <li>
          <a href={link.url} target="_blank" rel="noopener noreferrer">
            {link.name} - {link.url_text}
          </a>
        </li>
      {/each}
    </ul>
  </div>
{/if}