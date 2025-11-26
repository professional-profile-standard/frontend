<script>
  import { onMount } from 'svelte';
  import { parse } from 'yaml';
  import Educations from './Educations.svelte';
  import PersonalDetails from './PersonalDetails.svelte';
  import Links from './Links.svelte';
  import Misc from './Misc.svelte';
  import Targets from './Targets.svelte';
  import { sample_pps } from '$lib/data';

  let yaml = sample_pps;
  let error = null;
  let pps = null;

  onMount(async () => {
    try {
      const params = new URLSearchParams(new URL(document.location).search);
      const pps_src = params.get('src');
      const pps_text = params.get('text');
      if (pps_src) {
        const res = await fetch(pps_src);
        const data = await res.text();
        yaml = data;
      } else if (pps_text) {
        yaml = pps_text;
      }
    } catch (e) {
      error = e.message;
    }
  });

  $: {
    console.log(yaml);
    try {
      pps = parse(yaml);
      error = null;
    } catch (e) {
      error = e.message;
      pps = null;
    }
  }
</script>

<div>
  <div class="my-5">
    <label for="pps-textarea" class="block mb-2 text-lg">
      Enter your profile
    </label>
    <textarea
      id="pps-textarea"
      class="block border w-full h-30 rounded p-2"
      placeholder="PPS YAML file content"
      bind:value={yaml}
    ></textarea>
  </div>
  <div class="error">{error}</div>
  {#if pps}
    <div>
      <div class="space-y-10">
        <PersonalDetails data={pps.personal_details} />
        <Educations data={pps.educations} />
        <Targets data={pps.targets} />
        <Links data={pps.links} />
        <Misc data={pps.misc} />
      </div>
    </div>
  {/if}
</div>