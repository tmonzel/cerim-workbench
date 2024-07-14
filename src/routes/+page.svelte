<script lang="ts">
	import HeroApp from '$lib/hero/components/HeroApp.svelte';
  import { heroState } from '$lib/hero';
</script>

<HeroApp hero={$heroState} />