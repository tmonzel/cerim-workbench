<script lang="ts">
	import AbsorptionModifier from '../modifiers/AbsorptionModifier.svelte';
	import AttackModifier from '../modifiers/AttackModifier.svelte';
	import AttackStatusModifier from '../modifiers/AttackStatusModifier.svelte';
	import AttributeModifier from '../modifiers/AttributeModifier.svelte';
	import StatModifier from '../modifiers/StatModifier.svelte';
	import type { ItemEffect } from '../types';

	export let effect: ItemEffect;
</script>

<div>
	{#if effect.affectedSpellTypes}
		<div class="relative flex justify-between">
			<div>
				{effect.affectedSpellTypes.join(',')}
			</div>
		</div>
	{/if}
	{#if effect.modifiers}
		<ul class="divide-y divide-gray-100/20">
			{#each effect.modifiers as modifier}
				<li class="py-2">
					{#if modifier.type === 'stats'}
						<StatModifier key={modifier.key} value={modifier.value} operation={modifier.operation} />
					{:else if modifier.type === 'attributes'}
						<AttributeModifier key={modifier.key} value={modifier.value} />
					{:else if modifier.type === 'attack'}
						<AttackModifier key={modifier.key} value={modifier.value} operation={modifier.operation} />
					{:else if modifier.type === 'attackStatus'}
						<AttackStatusModifier key={modifier.key} value={modifier.value} />
					{:else if modifier.type === 'absorption'}
						<AbsorptionModifier key={modifier.key} value={modifier.value} />
					{:else}
						<div class="grid text-sm grid-cols-2">
							<dt class="font-medium text-zinc-200">
								{modifier.key}
							</dt>
							<dd>
								{modifier.value}
							</dd>
						</div>
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
</div>
