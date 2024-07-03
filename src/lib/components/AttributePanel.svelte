<script lang="ts">
	import { AttributeType } from '$lib/core';
	import { attributeRecord } from '$lib/records';
	import type { HeroState } from '$lib/state';
	import { attributeStore } from '$lib/stores';
	import AttributeControl from './AttributeControl.svelte';

  export let hero: HeroState;
</script>

<div class="attribute-panel">
  {#each Object.values(AttributeType) as type}
    <div class="mb-5">
      <AttributeControl 
        attribute={attributeRecord[type]} 
        num={hero.attributes.value[type]} 
        on:changeValue={(e) => {
          attributeStore.update((store) => ({ ...store, [type]: e.detail }))
        }
      } />
    </div>
  {/each}
</div>
