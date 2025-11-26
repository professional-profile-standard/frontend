<script>
  export let data = null;
</script>

{#if data}
  <div>
    <h2 class="category-title">Misc</h2>
    {#each Object.entries(data) as [key, value] (key)}
      <div>
        <h3 class="font-medium text-lg">{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
        {#if typeof value === 'object' && !Array.isArray(value)}
          <dl>
            {#each Object.entries(value) as [question, answer], index (index)}
              <div>
                <dt>{question}</dt>
                <dd>{answer}</dd>
              </div>
            {/each}
          </dl>
        {:else}
          <p>{value}</p>
        {/if}
      </div>
    {/each}
  </div>
{/if}