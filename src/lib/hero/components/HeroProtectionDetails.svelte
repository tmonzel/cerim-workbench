<script lang="ts">
	import AttackTypeBadge from '$lib/components/AttackTypeBadge.svelte';
	import StatBadge from '$lib/components/StatBadge.svelte';
	import ValueBadge from '$lib/components/ValueBadge.svelte';
	import type { HeroState } from '../types';

	export let hero: HeroState;

	function calcDamageNegation(m: number): number {
		return Math.round((1 - m) * 100 * 1000) / 1000;
	}
</script>

<dl class="divide-y divide-gray-100/20">
	<div class="px-2 py-4 sm:grid sm:gap-3 sm:px-0">
		<dt class="text-sm font-medium leading-6">Resistance</dt>
		<dd class="grid grid-cols-2 gap-4">
			<StatBadge name="Immunity">
				<ValueBadge value={hero.resistance.value['immunity']} />
			</StatBadge>

			<StatBadge name="Robustness">
				<ValueBadge value={hero.resistance.value['robustness']} />
			</StatBadge>

			<StatBadge name="Focus">
				<ValueBadge value={hero.resistance.value['focus']} />
			</StatBadge>

			<StatBadge name="Vitality">
				<ValueBadge value={hero.resistance.value['vitality']} />
			</StatBadge>
		</dd>
	</div>
	<div class="px-2 py-4 sm:grid sm:gap-2 sm:px-0">
		<dt class="text-sm font-medium leading-6 text-zinc-300">Defense / Damage Negation</dt>
		<dd class="grid grid-cols-2 gap-4">
			<StatBadge name="Standard">
				<ValueBadge value={hero.defense.value['standard']} /> / {calcDamageNegation(
					hero.damageNegation.value['standard'].multiplier
				)}%
			</StatBadge>

			<StatBadge name="Strike">
				<ValueBadge value={hero.defense.value['strike']} /> / {calcDamageNegation(
					hero.damageNegation.value['strike'].multiplier
				)}%
			</StatBadge>

			<StatBadge name="Slash">
				<ValueBadge value={hero.defense.value['slash']} /> / {calcDamageNegation(
					hero.damageNegation.value['slash'].multiplier
				)}%
			</StatBadge>

			<StatBadge name="Pierce">
				<ValueBadge value={hero.defense.value['pierce']} /> / {calcDamageNegation(
					hero.damageNegation.value['pierce'].multiplier
				)}%
			</StatBadge>

			<div class="col-span-2">
				<dt class="text-sm font-medium leading-6 text-zinc-500">Elemental</dt>
				<dd class="grid grid-cols-3 gap-2">
					<AttackTypeBadge type="mag">
						<ValueBadge value={hero.defense.value['mag']} /> / {calcDamageNegation(
							hero.damageNegation.value['mag'].multiplier
						)}%
					</AttackTypeBadge>

					<AttackTypeBadge type="fir">
						<ValueBadge value={hero.defense.value['fir']} /> / {calcDamageNegation(
							hero.damageNegation.value['fir'].multiplier
						)}%
					</AttackTypeBadge>

					<AttackTypeBadge type="lit">
						<ValueBadge value={hero.defense.value['lit']} /> / {calcDamageNegation(
							hero.damageNegation.value['lit'].multiplier
						)}%
					</AttackTypeBadge>

					<AttackTypeBadge type="hol">
						<ValueBadge value={hero.defense.value['hol']} /> / {calcDamageNegation(
							hero.damageNegation.value['hol'].multiplier
						)}%
					</AttackTypeBadge>
				</dd>
			</div>
		</dd>
	</div>
</dl>
