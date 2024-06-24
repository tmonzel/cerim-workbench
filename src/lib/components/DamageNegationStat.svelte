<script lang="ts">
	import { type DamageNegation, AttackDamageType } from '$lib/core';
  
  export let value: DamageNegation
</script>

<div>
  <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Strike</dt>
  <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
    {value.attack.strike}
  </dd>
</div>

<div>
  <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Slash</dt>
  <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
    {value.attack.slash}
  </dd>
</div>

<div>
  <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Pierce</dt>
  <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
    {value.attack.pierce}
  </dd>
</div>

<div>
  <dt class="text-sm font-medium leading-6 text-gray-900 dark:text-zinc-500">Elemental</dt>
  <dd class="text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
    <span class="grid grid-cols-3 gap-2">
      {#if value.elemental[AttackDamageType.PHYSICAL] > 0}
      <div class="flex flex-col">
        <span>{Math.round(value.elemental[AttackDamageType.PHYSICAL] * 10) / 10}</span> 
        <div class="bg-zinc-500 h-1"></div>
      </div> 
      {/if}
  
      {#if value.elemental[AttackDamageType.MAGIC] > 0}
      <div class="flex flex-col">
        <span>{Math.round(value.elemental[AttackDamageType.MAGIC] * 10) / 10}</span> 
        <div class="h-1" style="background-color: var(--damage-mag);"></div>
      </div>
      {/if}

      {#if value.elemental[AttackDamageType.FIRE] > 0}
      <div class="flex flex-col">
        <span>{Math.round(value.elemental[AttackDamageType.FIRE] * 10) / 10}</span> 
        <div class="h-1" style="background-color: var(--damage-fir);"></div>
      </div>
      {/if}

      {#if value.elemental[AttackDamageType.LIGHTNING] > 0}
      <div class="flex flex-col">
        <span>{Math.round(value.elemental[AttackDamageType.LIGHTNING] * 10) / 10}</span> 
        <div class="h-1" style="background-color: var(--damage-lit);"></div>
      </div>
      {/if}

      {#if value.elemental[AttackDamageType.HOLY] > 0}
      <div class="flex flex-col">
        <span>{Math.round(value.elemental[AttackDamageType.HOLY] * 10) / 10}</span> 
        <div class="h-1" style="background-color: var(--damage-hol);"></div>
      </div>
      {/if}
    </span>
  </dd>
</div>