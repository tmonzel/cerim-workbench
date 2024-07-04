<script lang="ts">
	import StatBadge from '$lib/components/StatBadge.svelte';
  import type { Resistance } from '$lib/core/types';

  export let resistance: Resistance;
</script>

<dl class="grid grid-cols-3 gap-4">
  <StatBadge name="Immunity">{resistance.immunity}</StatBadge>
  <StatBadge name="Robustness">{resistance.robustness}</StatBadge>
  <StatBadge name="Focus">{resistance.focus}</StatBadge>
  <StatBadge name="Vitality">{resistance.vitality}</StatBadge>
  <StatBadge name="Poise">{resistance.poise}</StatBadge>
</dl>