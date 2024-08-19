<script lang="ts">
	export let theme = 'default';
	export let icon: string | undefined = undefined;
	export let disabled = false;

	const themes: Record<string, string> = {
		default:
			'text-zinc-300 bg-zinc-500/10 disabled:opacity-50 disabled:ring-zinc-500 disabled:text-zinc-500 ring-amber-300 hover:ring-2 hover:text-amber-300',
		amber:
			'text-amber-300 bg-amber-500/10 disabled:opacity-50 disabled:bg-zinc-500/20 disabled:ring-transparent disabled:text-zinc-400 ring-amber-300 hover:ring-2 hover:bg-amber-500/20 hover:text-amber-300',
		indigo:
			'text-indigo-300 bg-indigo-500/10 disabled:opacity-50 disabled:bg-zinc-500/20 disabled:ring-transparent disabled:text-zinc-400 ring-indigo-300 hover:ring-2 hover:bg-indigo-500/20 hover:text-indigo-300',
		emerald:
			'text-emerald-300 bg-emerald-500/10 disabled:opacity-50 disabled:bg-zinc-500/20 disabled:ring-transparent disabled:text-zinc-400 ring-emerald-300 hover:ring-2 hover:bg-emerald-500/20 hover:text-emerald-300',
		teal: 'text-teal-300 bg-teal-500/10 disabled:opacity-50 disabled:bg-zinc-500/20 disabled:ring-transparent disabled:text-zinc-400 ring-teal-300 hover:ring-2 hover:bg-teal-500/20 hover:text-teal-300'
	};

	const addedClasses = themes[theme];
</script>

<button {disabled} on:click class="flex rounded-lg p-1 group transition-all disabled:opacity-50 {addedClasses} {$$restProps.class || ''}">
	{#if icon}
		<span class="mat-icon" style="font-size: 1.5em">{icon}</span>
	{/if}
	<slot />
</button>
