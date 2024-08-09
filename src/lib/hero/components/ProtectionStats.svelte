<script lang="ts">
	import AttackTypeBadge from '$lib/components/AttackTypeBadge.svelte';
	import StatBadge from '$lib/components/StatBadge.svelte';
	import { heroState } from '$lib/hero';
	import StatValue from './StatValue.svelte';

	function roundNegation(m: number): number {
		return Math.round(m * 1000) / 1000;
	}
</script>

<dl class="divide-y divide-gray-100/20">
	<div class="px-2 py-4 sm:grid sm:gap-3 sm:px-0">
		<dt class="text-sm font-medium leading-6">Resistance</dt>
		<dd class="grid grid-cols-2 gap-4">
			<StatBadge name="Immunity">
				<StatValue name="immunity" />
			</StatBadge>

			<StatBadge name="Robustness">
				<StatValue name="robustness" />
			</StatBadge>

			<StatBadge name="Focus">
				<StatValue name="focus" />
			</StatBadge>

			<StatBadge name="Vitality">
				<StatValue name="vitality" />
			</StatBadge>
		</dd>
	</div>
	<div class="px-2 py-4 sm:grid sm:gap-2 sm:px-0">
		<dt class="text-sm font-medium leading-6 text-zinc-300">Defense / Absorption(%)</dt>
		<dd class="grid grid-cols-2 gap-4">
			<StatBadge name="Standard">
				<StatValue name="standardDefense" /> / {roundNegation($heroState.damageNegation.value['standard'].total)}%
			</StatBadge>

			<StatBadge name="Strike">
				<StatValue name="strikeDefense" /> / {roundNegation($heroState.damageNegation.value['strike'].total)}%
			</StatBadge>

			<StatBadge name="Slash">
				<StatValue name="slashDefense" /> / {roundNegation($heroState.damageNegation.value['slash'].total)}%
			</StatBadge>

			<StatBadge name="Pierce">
				<StatValue name="pierceDefense" /> / {roundNegation($heroState.damageNegation.value['pierce'].total)}%
			</StatBadge>

			<div class="col-span-2">
				<dt class="text-sm font-medium leading-6 text-zinc-500">Elemental</dt>
				<dd class="grid grid-cols-2 gap-2">
					<AttackTypeBadge type="mag">
						<StatValue name="magicDefense" /> / {roundNegation($heroState.damageNegation.value['mag'].total)}%
					</AttackTypeBadge>

					<AttackTypeBadge type="fir">
						<StatValue name="fireDefense" /> / {roundNegation($heroState.damageNegation.value['fir'].total)}%
					</AttackTypeBadge>

					<AttackTypeBadge type="lit">
						<StatValue name="lightningDefense" /> / {roundNegation($heroState.damageNegation.value['lit'].total)}%
					</AttackTypeBadge>

					<AttackTypeBadge type="hol">
						<StatValue name="holyDefense" /> / {roundNegation($heroState.damageNegation.value['hol'].total)}%
					</AttackTypeBadge>
				</dd>
			</div>
		</dd>
	</div>
</dl>
