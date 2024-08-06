<script lang="ts">
	import AttackTypeBadge from '$lib/components/AttackTypeBadge.svelte';
	import StatBadge from '$lib/components/StatBadge.svelte';
	import ValueBadge from '$lib/components/ValueBadge.svelte';
	import { heroState } from '$lib/hero';

	function roundNegation(m: number): number {
		return Math.round(m * 1000) / 1000;
	}
</script>

<dl class="divide-y divide-gray-100/20">
	<div class="px-2 py-4 sm:grid sm:gap-3 sm:px-0">
		<dt class="text-sm font-medium leading-6">Resistance</dt>
		<dd class="grid grid-cols-2 gap-4">
			<StatBadge name="Immunity">
				<ValueBadge value={$heroState.resistance.value['immunity']} />
			</StatBadge>

			<StatBadge name="Robustness">
				<ValueBadge value={$heroState.resistance.value['robustness']} />
			</StatBadge>

			<StatBadge name="Focus">
				<ValueBadge value={$heroState.resistance.value['focus']} />
			</StatBadge>

			<StatBadge name="Vitality">
				<ValueBadge value={$heroState.resistance.value['vitality']} />
			</StatBadge>
		</dd>
	</div>
	<div class="px-2 py-4 sm:grid sm:gap-2 sm:px-0">
		<dt class="text-sm font-medium leading-6 text-zinc-300">Defense / Absorption(%)</dt>
		<dd class="grid grid-cols-2 gap-4">
			<StatBadge name="Standard">
				<ValueBadge value={$heroState.defense.value['standard']} /> / {roundNegation(
					$heroState.damageNegation.value['standard'].total
				)}%
			</StatBadge>

			<StatBadge name="Strike">
				<ValueBadge value={$heroState.defense.value['strike']} /> / {roundNegation(
					$heroState.damageNegation.value['strike'].total
				)}%
			</StatBadge>

			<StatBadge name="Slash">
				<ValueBadge value={$heroState.defense.value['slash']} /> / {roundNegation(
					$heroState.damageNegation.value['slash'].total
				)}%
			</StatBadge>

			<StatBadge name="Pierce">
				<ValueBadge value={$heroState.defense.value['pierce']} /> / {roundNegation(
					$heroState.damageNegation.value['pierce'].total
				)}%
			</StatBadge>

			<StatBadge name="Poise">
				<ValueBadge value={$heroState.defense.value['poise']} /> / {roundNegation(
					$heroState.damageNegation.value['poise'].total
				)}%
			</StatBadge>

			<div class="col-span-2">
				<dt class="text-sm font-medium leading-6 text-zinc-500">Elemental</dt>
				<dd class="grid grid-cols-2 gap-2">
					<AttackTypeBadge type="mag">
						<ValueBadge value={$heroState.defense.value['mag']} /> / {roundNegation(
							$heroState.damageNegation.value['mag'].total
						)}%
					</AttackTypeBadge>

					<AttackTypeBadge type="fir">
						<ValueBadge value={$heroState.defense.value['fir']} /> / {roundNegation(
							$heroState.damageNegation.value['fir'].total
						)}%
					</AttackTypeBadge>

					<AttackTypeBadge type="lit">
						<ValueBadge value={$heroState.defense.value['lit']} /> / {roundNegation(
							$heroState.damageNegation.value['lit'].total
						)}%
					</AttackTypeBadge>

					<AttackTypeBadge type="hol">
						<ValueBadge value={$heroState.defense.value['hol']} /> / {roundNegation(
							$heroState.damageNegation.value['hol'].total
						)}%
					</AttackTypeBadge>
				</dd>
			</div>
		</dd>
	</div>
</dl>
