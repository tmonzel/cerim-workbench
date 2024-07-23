<script lang="ts">
	import { StatusEffectType } from '$lib/core/types';

	export let effect: StatusEffectType;

	const positions: Record<StatusEffectType, string> = {
		[StatusEffectType.SLEEP]: '-5px -3px',
		[StatusEffectType.POISON]: '-5px -33px',
		[StatusEffectType.FROSTBITE]: '-75px -33px',
		[StatusEffectType.HEMORRHAGE]: '-40px -33px',
		[StatusEffectType.ROT]: '-40px -3px',
		[StatusEffectType.DEATH]: '-106px -3px',
		[StatusEffectType.MADNESS]: '-74px -3px'
	};
</script>

<div
	class="inline-block status-effect-icon ring-1 ring-zinc-700"
	style:background-position={positions[effect]}
></div>

<style>
	.status-effect-icon {
		width: 24px;
		height: 24px;
		background-color: black;
		background-size: 137px;
		background-repeat: no-repeat;
		background-image: url(images/STATUS_EFF.png);
	}
</style>
