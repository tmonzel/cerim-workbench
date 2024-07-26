<script lang="ts">
	import StatusEffectIcon from '$lib/components/StatusEffectIcon.svelte';
	import { damageTypes, list } from '$lib/core';
	import { attributeTypes, heroState } from '$lib/hero';
	import { AttackItem } from '../../item/AttackItem';
	import { validateRequirements } from '../helpers';

	export let item: AttackItem;

	$: scalingFlags = item.getScalingFlags();
</script>

<div class="flex gap-x-8 text-sm">
	{#if item.attributeRequirements}
		{@const invalidAttributes = validateRequirements(item.attributeRequirements, $heroState.totalAttributes)}
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
						<span style:background-color={attributeTypes[attr.key].color} class="me-2 w-2.5 h-2.5 rounded"></span>
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
				<path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z" />
			</svg>
			<div>
				{#each scalingFlags as flag}
					<div class="flex items-center">
						<span style:background-color={attributeTypes[flag.attr].color} class="me-2 w-2.5 h-2.5 rounded"></span>
						<span class="text-white">{flag.id}</span>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<div>
		<span class="text-zinc-500">Damage</span><br />
		<span>{item.attackInfo.damage.map((t) => damageTypes[t].name).join('/')}</span>
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
</div>
