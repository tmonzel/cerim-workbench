<script lang="ts">
	import StatusEffectIcon from '$lib/components/StatusEffectIcon.svelte';
	import { list } from '$lib/core';
	import { attributeRecord, damageTypeRecord } from '$lib/records';
	import { AttackItem } from '../AttackItem';
	import type { Item } from '../Item';

	export let item: Item;
	export let invalidAttributes: string[] = [];

	$: scalingFlags = item instanceof AttackItem ? item.getScalingFlags() : [];
</script>

<div class="flex gap-x-8 text-sm">
	{#if item.attributeRequirements}
		<div class="flex">
			<svg
				class="me-2"
				class:fill-red-400={invalidAttributes.length > 0}
				xmlns="http://www.w3.org/2000/svg"
				height="24px"
				viewBox="0 -960 960 960"
				width="24px"
				fill="#e4e4e7"
				><path
					d="M655-200 513-342l56-56 85 85 170-170 56 57-225 226Zm0-320L513-662l56-56 85 85 170-170 56 57-225 226ZM80-280v-80h360v80H80Zm0-320v-80h360v80H80Z"
				/></svg
			>
			<div>
				{#each list(item.attributeRequirements) as attr}
					<div class="flex items-center">
						<span
							style:background-color={attributeRecord[attr.key].color}
							class="me-2 w-2.5 h-2.5 rounded"
						></span>
						<span class:text-red-400={invalidAttributes.includes(attr.key)}>{attr.value}</span>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	{#if scalingFlags.length > 0}
		<div class="flex">
			<svg
				class="me-2"
				xmlns="http://www.w3.org/2000/svg"
				height="24px"
				viewBox="0 -960 960 960"
				width="24px"
				fill="#e4e4e7"
			>
				<path
					d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z"
				/>
			</svg>
			<div>
				{#each scalingFlags as flag}
					<div class="flex items-center">
						<span
							style:background-color={attributeRecord[flag.attr].color}
							class="me-2 w-2.5 h-2.5 rounded"
						></span>
						<span class="text-white">{flag.id}</span>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	{#if item instanceof AttackItem}
		{#if item.attackSpeed !== 1}
			<div>
				<div class="flex items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="#e4e4e7"
						><path
							d="M418-340q24 24 62 23.5t56-27.5l224-336-336 224q-27 18-28.5 55t22.5 61Zm62-460q59 0 113.5 16.5T696-734l-76 48q-33-17-68.5-25.5T480-720q-133 0-226.5 93.5T160-400q0 42 11.5 83t32.5 77h552q23-38 33.5-79t10.5-85q0-36-8.5-70T766-540l48-76q30 47 47.5 100T880-406q1 57-13 109t-41 99q-11 18-30 28t-40 10H204q-21 0-40-10t-30-28q-26-45-40-95.5T80-400q0-83 31.5-155.5t86-127Q252-737 325-768.5T480-800Zm7 313Z"
						/></svg
					>
					<span class="ml-1 text-xs font-semibold">{item.attackSpeed}</span>
				</div>
			</div>
		{/if}
		<div>
			<span class="text-zinc-500">Damage</span><br />
			<span>{item.attackInfo.damage.map((t) => damageTypeRecord[t].name).join('/')}</span>
		</div>
		<div>
			<span class="text-zinc-500">Critical</span><br />
			<span>{item.attackInfo.crit}</span>
		</div>
		{#if item.statusEffects}
			<div>
				<div class="text-zinc-500 mb-1">Effects</div>
				<div class="flex gap-4">
					{#each list(item.statusEffects) as se}
						<div class="flex items-center">
							<StatusEffectIcon effect={se.key} /> <span class="ms-2">{Math.floor(se.value)}</span>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	{/if}
</div>
