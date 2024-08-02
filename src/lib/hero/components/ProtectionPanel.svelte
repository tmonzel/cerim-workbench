<script lang="ts">
	import AttackTypeBadge from '$lib/components/AttackTypeBadge.svelte';
	import StatBadge from '$lib/components/StatBadge.svelte';
	import ValueBadge from '$lib/components/ValueBadge.svelte';
	import type { HeroState } from '$lib/hero';

	export let hero: HeroState;

	function roundNegation(m: number): number {
		return Math.round(m * 1000) / 1000;
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
		<dt class="text-sm font-medium leading-6 text-zinc-300">Defense / Absorption(%)</dt>
		<dd class="grid grid-cols-2 gap-4">
			<StatBadge name="Standard">
				<ValueBadge value={hero.defense.value['standard']} /> / {roundNegation(
					hero.damageNegation.value['standard'].total
				)}%
			</StatBadge>

			<StatBadge name="Strike">
				<ValueBadge value={hero.defense.value['strike']} /> / {roundNegation(
					hero.damageNegation.value['strike'].total
				)}%
			</StatBadge>

			<StatBadge name="Slash">
				<ValueBadge value={hero.defense.value['slash']} /> / {roundNegation(hero.damageNegation.value['slash'].total)}%
			</StatBadge>

			<StatBadge name="Pierce">
				<ValueBadge value={hero.defense.value['pierce']} /> / {roundNegation(
					hero.damageNegation.value['pierce'].total
				)}%
			</StatBadge>

			<StatBadge name="Poise">
				<ValueBadge value={hero.defense.value['poise']} /> / {roundNegation(hero.damageNegation.value['poise'].total)}%
			</StatBadge>

			<div class="col-span-2">
				<dt class="text-sm font-medium leading-6 text-zinc-500">Elemental</dt>
				<dd class="grid grid-cols-2 gap-2">
					<AttackTypeBadge type="mag">
						<ValueBadge value={hero.defense.value['mag']} /> / {roundNegation(hero.damageNegation.value['mag'].total)}%
					</AttackTypeBadge>

					<AttackTypeBadge type="fir">
						<ValueBadge value={hero.defense.value['fir']} /> / {roundNegation(hero.damageNegation.value['fir'].total)}%
					</AttackTypeBadge>

					<AttackTypeBadge type="lit">
						<ValueBadge value={hero.defense.value['lit']} /> / {roundNegation(hero.damageNegation.value['lit'].total)}%
					</AttackTypeBadge>

					<AttackTypeBadge type="hol">
						<ValueBadge value={hero.defense.value['hol']} /> / {roundNegation(hero.damageNegation.value['hol'].total)}%
					</AttackTypeBadge>
				</dd>
			</div>
		</dd>
	</div>
</dl>
