<script lang="ts">
  import { AttributeType } from '$lib/core/types';
	import { attributeStore, type HeroState } from '$lib/hero';
	import { attributeRecord } from '$lib/records';
	import AttributeControl from './AttributeControl.svelte';

  export let hero: HeroState;
</script>

<div class="attribute-panel">
  {#each Object.values(AttributeType) as type}
    <div class="mb-5">
      <AttributeControl 
        base={hero.type.attributes[type]}
        attribute={attributeRecord[type]} 
        value={hero.attributes.value[type]} 
        on:changeValue={(e) => {
          attributeStore.update((store) => ({ ...store, [type]: e.detail }))
        }
      } />
    </div>
  {/each}
</div>
