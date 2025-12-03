<script>
    import { page } from "$app/state";
    import { parse } from "yaml";
    import { sample_pps } from "$lib/data";
    import PPS from "$lib/components/PPS.svelte";

    const api_endpoint = "/api/pps";

    let yaml = $state("");
    let error = $state(null);
    let pps = $state("");

    async function fetchPpsYamlText() {
        let yaml = "";
        const params = page.url.searchParams;
        const pps_src = params.get("src");
        const pps_text = params.get("text");

        if (pps_src) {
            const res = await fetch(
                `${api_endpoint}?pps_url=${encodeURI(pps_src)}`,
            );
            if (!res.ok) throw new Error("Fetch failed.");
            const data = await res.text();
            yaml = data;
        } else if (pps_text) {
            yaml = pps_text;
        } else {
            yaml = sample_pps;
        }
        return yaml;
    }

    const promise = fetchPpsYamlText()
        .then((txt) => {
            yaml = txt;
            updatePps({ target: { value: txt } });
        })
        .catch((e) => {
            error = e.message;
            console.log(e);
        });

    function updatePps(e) {
        try {
            pps = parse(yaml);
            console.log(pps);
            error = null;
        } catch (e) {
            error = e.message;
            pps = null;
        }
    }
</script>

<div>
    <div class="my-10">
        <label for="pps-textarea" class="block mb-1 font-medium">
            Enter your PPS
        </label>
        <textarea
            id="pps-textarea"
            class="block border w-full h-100 rounded-lg p-2 focus:outline-2 focus:outline-secondary/10"
            placeholder="PPS YAML file content"
            bind:value={yaml}
            oninput={updatePps}
        ></textarea>
    </div>

    {#await promise}
        <p>Loading...</p>
    {:then data}
        <div class="error">{error}</div>
        <PPS {pps} />
    {/await}
</div>
