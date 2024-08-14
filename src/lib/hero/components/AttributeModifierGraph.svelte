<script lang="ts">
	import AttributeBadge from '$lib/components/AttributeBadge.svelte';
	import { AttributeType, calcCorrect, type GraphMutation } from '$lib/core';
	import { VisAxis, VisLine, VisStackedBar, VisXYContainer } from '@unovis/svelte';
	import { heroState } from '../state';

	export let attributeType: AttributeType;
	export let mutations: GraphMutation[] = [];

	type DataRecord = { x: number; y: number };
	let data: DataRecord[];

	const x = (d: DataRecord) => d.x;
	const y = (d: DataRecord) => d.y;

	const maxProgress = 99;

	let currentValue: number = 0;
	let nextValue: number = 0;

	$: progress = $heroState.attributes[attributeType];

	$: {
		data = [];

		for (let x = 0; x < maxProgress; x++) {
			const y = calcCorrect(x, mutations);
			data.push({ x, y });

			if (x === progress) {
				currentValue = y;
			}

			if (x === progress + 1) {
				nextValue = y;
			}
		}
	}
</script>

<div style="--vis-axis-grid-color: rgba(255, 255, 255, 0.1)">
	<div class="mb-2">
		<VisXYContainer {data} height={150} duration={0}>
			<VisLine {x} {y} color={() => '#fcd34d'} />
			<VisAxis type="x" tickValues={[0, 25, 50, 75, 100]} />
			<VisAxis type="y" />
			<VisStackedBar barWidth={1} x={progress} y={currentValue} color={() => '#aaa'} />
		</VisXYContainer>
	</div>
	<div class="text-xs text-zinc-500 flex mb-1 justify-end">
		<AttributeBadge type={attributeType} /><span class="ms-1">({progress})</span>
	</div>
	<div class="text-xs text-zinc-500 flex items-center justify-center">
		<span>{Math.round(currentValue * 10) / 10}</span>
		<span class="mat-icon w-16 text-center">trending_flat</span>
		<span>{Math.round(nextValue * 10) / 10} </span>
	</div>
	<div class="text-xs text-zinc-500 flex justify-center">
		(+{Math.round((nextValue - currentValue) * 10) / 10})
	</div>
</div>
