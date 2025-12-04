<script>
    import { page } from "$app/state";
    import { parse } from "yaml";
    import { sample_pps } from "$lib/data";
    import PPSWrapper from "$lib/components/PPSWrapper.svelte";
    import { onMount } from "svelte";

    const api_endpoint = "/api/pps";

    let yaml = $state("");
    let error = $state(null);
    let pps = $state("");
    let editor;

    onMount(async () => {
        editor = ace.edit("editor");
        editor.session.setMode("ace/mode/yaml");
        editor.setTheme("ace/theme/gruvbox_dark_hard");
        editor.session.on("change", updatePps);
    });

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
            if (!editor) return;
            editor.setValue(txt);
            updatePps();
        })
        .catch((e) => {
            error = e.message;
        });

    function updatePps() {
        try {
            const editorContent = editor.getValue();
            pps = parse(editorContent);
            error = null;
        } catch (e) {
            error = e.message;
            pps = null;
        }
    }
</script>

<svelte:head>
    <script src="/vendors/ace/ace.js"></script>
</svelte:head>

<div class="xl:flex xl:gap-4 xl:*:flex-1 relative">
    <div class="my-10 h-[50dvh] xl:sticky xl:top-0 xl:h-[calc(100dvh-50px)]">
        <label for="editor" class="block mb-1 font-medium">
            Enter your PPS
        </label>
        <div
            id="editor"
            class="h-full border rounded-lg focus:outline-3 focus:outline-text/50"
            placeholder="PPS YAML file content"
            style={`
            font-size: 14px;
            `}
        ></div>
    </div>

    <div>
        {#await promise}
            <p>Loading...</p>
        {:then data}
            <div class="error">{error}</div>
            <PPSWrapper {pps} />
        {/await}
    </div>
</div>
