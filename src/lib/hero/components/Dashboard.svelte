<script>
	import ValueBadge from '$lib/components/ValueBadge.svelte';
	import { AttributeType } from '$lib/core';
	import { attributeTypes } from '../data';
	import { heroState } from '../state';
	import AttributeModifierGraph from './AttributeModifierGraph.svelte';

	$: attributes = $heroState.totalAttributes;
</script>

<div class="flex gap-5">
	<article class="bg-zinc-800/50 rounded-lg p-6">
		<header class="mb-10">
			<h3 class="mb-2 font-medium">Health</h3>
			<span class="text-3xl">
				{Math.round($heroState.stats.value.hp.base * 10) / 10}
			</span>
		</header>

		<AttributeModifierGraph
			attributeType={AttributeType.VIGOR}
			mutations={attributeTypes.vig.modifier?.modifications.stats.hp}
			progress={attributes.vig}
		/>
	</article>

	<article class="bg-zinc-800/50 rounded-lg p-6">
		<header class="mb-5">
			<h3 class="mb-2 font-medium">FP</h3>
			<span class="text-3xl">
				<ValueBadge value={$heroState.stats.value.fp} />
			</span>
		</header>

		<AttributeModifierGraph
			attributeType={AttributeType.MIND}
			mutations={attributeTypes.mnd.modifier?.modifications.stats.fp}
			progress={attributes.mnd}
		/>
	</article>

	<article class="bg-zinc-800/50 rounded-lg p-6">
		<header class="mb-5">
			<h3 class="mb-2 font-medium">Stamina</h3>
			<span class="text-3xl">
				<ValueBadge value={$heroState.stats.value.stamina} />
			</span>
		</header>

		<AttributeModifierGraph
			attributeType={AttributeType.ENDURANCE}
			mutations={attributeTypes.end.modifier?.modifications.stats.stamina}
			progress={attributes.end}
		/>
	</article>
</div>
