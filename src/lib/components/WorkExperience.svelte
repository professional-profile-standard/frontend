<script>
  export let data = null;
</script>

{#if data}
  <div>
    <h2 class="category-title">Work Experience</h2>
    <div class="space-y-4">
      {#each data as job, index (index)}
        <div>
          <h4 class="font-medium">
            {job.job_title} at {job.company_name}
          </h4>
          <p>
            {job.location} | {job.from} - {job.to}
          </p>
          <ul class="pl-3">
            {#each job.contributions as contribution, i (i)}
              <li class="list-disc list-inside my-1">
                {contribution}
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>
{/if}