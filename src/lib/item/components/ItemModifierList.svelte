<script lang="ts">
	import type { ItemModifier } from '../ItemModifier';
	import ModifierItem from './ModifierItem.svelte';

  export let data: ItemModifier[] = [];
</script>

<ul class="divide-y divide-gray-100/20">
  {#each data as modifier}
    {#each Object.entries(modifier.data) as [key, config]}
    <li class="py-2">
      <ModifierItem type={modifier.type} {key} {config} />
    </li>
    {/each}
  {/each}
</ul>