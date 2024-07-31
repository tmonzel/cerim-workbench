<script lang="ts">
	import StatBadge from '$lib/components/StatBadge.svelte';
	import { damageTypes } from '$lib/core';
	import { attributeTypes, heroState } from '$lib/hero';
	import type { AttackItem } from './AttackItem';
	import { validateRequirements } from './helpers';
	import { getScalingLetter } from './scaling';

	export let item: AttackItem;

	$: invalidAttributes = validateRequirements(item.requirements ?? {}, $heroState.totalAttributes);
</script>

<div class="flex gap-x-8 text-sm">
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
			{#each Object.entries(item.requirements) as [attr, num]}
				<div class="flex items-center">
					<span style:background-color={attributeTypes[attr].color} class="me-2 w-2.5 h-2.5 rounded"></span>
					<span class:text-red-400={invalidAttributes.includes(attr)}>{num}</span>
				</div>
			{/each}
		</div>
	</div>

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
			{#each Object.entries(item.scaling) as [attr, scaling]}
				{@const letter = getScalingLetter(scaling.base)}
				<div class="flex items-center">
					<span style:background-color={attributeTypes[attr].color} class="me-2 w-2.5 h-2.5 rounded"></span>
					<span class="text-white">{letter}</span>
				</div>
			{/each}
		</div>
	</div>

	<StatBadge name="Damage">
		{item.attackInfo.damage.map((t) => damageTypes[t].name).join('/')}
	</StatBadge>

	<StatBadge name="Critical">
		{item.attackInfo.crit}
	</StatBadge>
</div>
