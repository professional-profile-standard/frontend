<script>
  export let data = null;
</script>

{#if data}
  <div>
    <h3 class="font-medium text-xl mb-2">Work Experience</h3>
    <div class="space-y-4">
      {#each data as job, index (index)}
        <div>
          <h4 class="font-medium">
            {job.job_title} at {job.company_name}
          </h4>
          <p>
            {job.location} | {job.from} - {job.to}
          </p>
          <ul>
            {#each job.contributions as contribution, i (i)}
              <li class="list-disc list-inside">
                {contribution}
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>
{/if}