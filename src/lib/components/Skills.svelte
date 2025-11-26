<script>
    export let data = null;
</script>

{#if data}
    <div>
        <h3 class="font-medium text-xl mb-2">Skills</h3>
        <div class="overflow-auto">
            <table class="w-full">
                <tbody>
                    {#each Object.entries(data) as [category, items] (category)}
                        <tr class="">
                            <td class="p-2">
                                <h3 class="font-medium text-lg">{category}</h3>
                            </td>
                            <td class="p-2">
                                {#each items as item, index (index)}
                                    <span>{item}, </span>
                                {/each}
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
{/if}
