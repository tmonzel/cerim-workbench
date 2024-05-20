<script lang="ts">
	import { appState } from './state';
	import type { Item } from './types';

  export let item: Item;
  export let slotted = false;
</script>

<div class="flex gap-x-6">
  <div class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
    {#if item.base.iconUrl}
      <img src={item.base.iconUrl} alt="Item icon" />
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-80 92L160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11Zm200-528 77-44-237-137-78 45 238 136Zm-160 93 78-45-237-137-78 45 237 137Z"/></svg>
    {/if}
  </div>
  <div>
    <div class="font-medium">
      {item.name ?? "Nameless"} ({item.base.name})
      <span class="absolute inset-0"></span>
    </div>
    <p class="text-sm">{item.base.type}</p>
  
    {#if item.base.damage}
      {#if item.damage}
        <p class="mt-2 text-xl" class:text-indigo-700={item.damage[0] > item.base.damage[0]}>
          {item.damage[0]}-{item.damage[1]} ({Math.round((item.damage[0] + item.damage[1]) / 2)})
        </p>
      {:else}
        <p class="mt-2 text-xl font-light">
          {item.base.damage[0]}-{item.base.damage[1]} ({Math.round((item.base.damage[0] + item.base.damage[1]) / 2)})
        </p>
      {/if}
    {/if}

    {#if item.base.armor}
      <p class="mt-2 text-xl font-light flex items-center">
        <img class="w-5 h-5 mr-0.5" alt="Armor Icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABpElEQVR4nO2WSyuEYRiGLzYORY5TyGJINiiHfyCykiwoa4qS8AfY2GEhC/6ArJTCQghRUspmykY5ruSYjbPeuhfvwuD9vnfYzFXP5pvnut9nZr6Z54MkSdypBqaBGPCoiumaeS1hNAALwDvwEafe1WN6Q5MJRIEuYMM6xLzjcaBWPabqdO3R6tuQG1WPEx9f1BUwBkS+8SLquYqT8WueJewBM0AHkO7gm95OYFYZJuvJZYA7SSWEp1RZNy7ShaQqDwPUKOvcRdqX1OhhgCbr6/w185J6PQzQr6w5F2lU0pSHAaaVNeIitUg68DDAobKaXaRc4AV4BfJDHF4AvCkrx1Ve1+TdIQboUcZaELlX8naIAbaU0RdEzgLuFVAfwK+X+wBkE5AJhawEcJfkThLyJrpTULuD1yrHfIKFhGRAYdf6X/+JYmsbDuGBVOt5YBfI+GELblo3r3G9EAFOFbwaZzWnAcvquQSK8Ew5cGYtFntVm8N2rMMrSRBlwLEOugWGgUHtenPtBKggwWRb29KuRSCPP6QNOFKZn2gK/0DKfx2cBF98AsCYhBU6oefbAAAAAElFTkSuQmCC">
        {item.base.armor}
      </p>
    {/if}

    {#if item.base.scaling}
      <p class="flex items-center mt-2">
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#999999">
          <path d="M120-120v-80l80-80v160h-80Zm160 0v-240l80-80v320h-80Zm160 0v-320l80 81v239h-80Zm160 0v-239l80-80v319h-80Zm160 0v-400l80-80v480h-80ZM120-327v-113l280-280 160 160 280-280v113L560-447 400-607 120-327Z"/>
        </svg> 
        
        <span class="ml-1 text-xs font-semibold">{item.base.scaling.map(s => $appState.schema.attributes[s.attr].flag).join(',')}</span>
      </p>
    {/if}
  
    <dl class="divide-y divide-gray-100 my-3">
      {#each item.modifiers as m}
      <div class="py-1 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900">{m.stat}</dt>
        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
          {#if m.value > 1}+{/if}
          {#if m.type === 'flat'}
            {m.value}
          {:else}
            {Math.round((m.value - 1) * 100)}%
          {/if}
        </dd>
      </div>
      {/each}
    </dl>
    
    {#if !slotted && item.base.description}
    <p class="mt-1 text-gray-600">{item.base.description}</p>
    {/if}
  </div>
</div>