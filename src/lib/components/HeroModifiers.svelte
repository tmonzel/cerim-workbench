<script lang="ts">
	import { modifications } from '$lib/modifications';
</script>

<dl class="mt-6 divide-y divide-gray-100">
  {#each Object.entries($modifications) as [id, mod]}
    <div class="py-1 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
      <dt class="text-sm font-medium leading-6 text-gray-900">{mod.name}</dt>
      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
        {#if mod.type === 'percentual'}
          {mod.value > 0 ? '+' + Math.round(mod.value * 100) : Math.round(mod.value * 100)}%
        {:else}
          {mod.value > 0 ? '+' + mod.value : mod.value}
        {/if}
      </dd>
    </div>
  {/each}
</dl>
