<script lang="ts">
	import AttackTypeBadge from '$lib/components/AttackTypeBadge.svelte';
	import StatBadge from '$lib/components/StatBadge.svelte';
	import StatValue from '$lib/components/StatValue.svelte';
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
				<StatValue value={$heroState.immunity} />
			</StatBadge>

			<StatBadge name="Robustness">
				<StatValue value={$heroState.robustness} />
			</StatBadge>

			<StatBadge name="Focus">
				<StatValue value={$heroState.focus} />
			</StatBadge>

			<StatBadge name="Vitality">
				<StatValue value={$heroState.vitality} />
			</StatBadge>
		</dd>
	</div>
	<div class="px-2 py-4 sm:grid sm:gap-2 sm:px-0">
		<dt class="text-sm font-medium leading-6 text-zinc-300">Defense / Absorption(%)</dt>
		<dd class="grid grid-cols-2 gap-4">
			<StatBadge name="Standard">
				<StatValue value={$heroState.standardDefense} /> / {roundNegation(
					$heroState.damageNegation.value['standard'].total
				)}%
			</StatBadge>

			<StatBadge name="Strike">
				<StatValue value={$heroState.strikeDefense} /> / {roundNegation(
					$heroState.damageNegation.value['strike'].total
				)}%
			</StatBadge>

			<StatBadge name="Slash">
				<StatValue value={$heroState.slashDefense} /> / {roundNegation($heroState.damageNegation.value['slash'].total)}%
			</StatBadge>

			<StatBadge name="Pierce">
				<StatValue value={$heroState.pierceDefense} /> / {roundNegation(
					$heroState.damageNegation.value['pierce'].total
				)}%
			</StatBadge>

			<div class="col-span-2">
				<dt class="text-sm font-medium leading-6 text-zinc-500">Elemental</dt>
				<dd class="grid grid-cols-2 gap-2">
					<AttackTypeBadge type="mag">
						<StatValue value={$heroState.magicDefense} /> / {roundNegation(
							$heroState.damageNegation.value['mag'].total
						)}%
					</AttackTypeBadge>

					<AttackTypeBadge type="fir">
						<StatValue value={$heroState.fireDefense} /> / {roundNegation(
							$heroState.damageNegation.value['fir'].total
						)}%
					</AttackTypeBadge>

					<AttackTypeBadge type="lit">
						<StatValue value={$heroState.lightningDefense} /> / {roundNegation(
							$heroState.damageNegation.value['lit'].total
						)}%
					</AttackTypeBadge>

					<AttackTypeBadge type="hol">
						<StatValue value={$heroState.holyDefense} /> / {roundNegation(
							$heroState.damageNegation.value['hol'].total
						)}%
					</AttackTypeBadge>
				</dd>
			</div>
		</dd>
	</div>
</dl>
