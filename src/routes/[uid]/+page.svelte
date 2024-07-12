<script lang="ts">
	import HeroApp from '$lib/components/HeroApp.svelte';
  import { heroState } from '$lib/state';
</script>

<HeroApp hero={$heroState} />