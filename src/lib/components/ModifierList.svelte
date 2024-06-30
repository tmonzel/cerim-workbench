<script lang="ts">
	import { list } from '$lib/core';
	import { FlatModifier } from '$lib/core/modifiers/FlatModifier';
	import { PercentualModifier } from '$lib/core/modifiers/PercentualModifier';
	import ModifierItem from './ModifierItem.svelte';

  export let data: (FlatModifier | PercentualModifier)[] = [];
</script>

<ul class="divide-y divide-gray-100/20">
  {#each data as modifier}
    {#if modifier instanceof PercentualModifier}
      {#each list(modifier.def) as t}
      <li class="py-2">
        <ModifierItem type="percentual" key={t.key} config={t.value} />
      </li>
      {/each}
    {:else if modifier instanceof FlatModifier}
      {#each list(modifier.def) as t}
      <li class="py-2">
        <ModifierItem key={t.key} config={t.value} />
      </li>
      {/each}
    {/if}
  {/each}
</ul>