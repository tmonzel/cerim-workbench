<script lang="ts">
	import { VisXYContainer, VisLine, VisAxis, VisStackedBar } from '@unovis/svelte';
	import { attackTypes } from '$lib/core';
	import AttributeBadge from '$lib/components/AttributeBadge.svelte';
	import type { AttributeAttackRecord } from '../attack.state';

	export let data: AttributeAttackRecord[];
	export let attributeType: string;
	export let position: number;

	const x = (d: AttributeAttackRecord) => d.value;
	const y = [
		(d: AttributeAttackRecord) => d.attack.phy,
		(d: AttributeAttackRecord) => d.attack.mag,
		(d: AttributeAttackRecord) => d.attack.lit,
		(d: AttributeAttackRecord) => d.attack.sor,
		(d: AttributeAttackRecord) => d.attack.fir,
		(d: AttributeAttackRecord) => d.attack.hol,
		(d: AttributeAttackRecord) => d.attack.inc,
		(d: AttributeAttackRecord) => d.attack.sta
	];

	const color = (d: AttributeAttackRecord, i: number) =>
		[
			attackTypes.phy.color,
			attackTypes.mag.color,
			attackTypes.lit.color,
			attackTypes.sor.color,
			attackTypes.fir.color,
			attackTypes.hol.color,
			attackTypes.inc.color,
			attackTypes.sta.color
		][i];

	let nextAttack: Record<string, number> = {};

	$: currentAttack = data[position - 1].attack;
	$: nextAttack = data[position].attack;
</script>

<div style="--vis-axis-grid-color: rgba(255, 255, 255, 0.1)" class="flex flex-col items-end">
	<div class="mb-2">
		<VisXYContainer {data} width={150} height={100} duration={0} xDomain={[0, 99]} yDomain={[0, undefined]}>
			<VisLine {x} {y} {color} />
			<VisAxis type="x" tickValues={[0, 25, 50, 75]} />
			<VisAxis type="y" tickValues={[0, 50, 100, 200, 300, 400, 500]} />
			<VisStackedBar barWidth={1} x={position} y={5000} color="#f43f5e" excludeFromDomainCalculation={true} />
		</VisXYContainer>
	</div>
	<div class="text-xs text-zinc-500 flex mb-1">
		<AttributeBadge type={attributeType} /><span class="ms-1">({position})</span>
	</div>

	<dl class="grid grid-cols-2 px-2 py-1 text-xs bg-zinc-800 rounded-md">
		{#each Object.entries(currentAttack) as [t, v]}
			<dt class="me-2">{t}</dt>
			<dd>+{Math.round((nextAttack[t] - v) * 10) / 10}</dd>
		{/each}
	</dl>
</div>
