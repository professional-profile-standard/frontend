<script>
    const { children, cclass, ...props } = $props();
</script>

<button {...props} class={`p-1 px-6 rounded bg-zinc-800 ${cclass}`}>
    {@render children()}
</button>
