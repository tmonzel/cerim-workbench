<script lang="ts">
	import ItemUpgradeBar from '$lib/hero/components/ItemUpgradeBar.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import AccessoryFinder from './AccessoryFinder.svelte';
	import type { AccessoryItem } from './AccessoryItem';
	import EquipSlot from '$lib/item/components/EquipSlot.svelte';
	import CheckboxControl from '$lib/components/CheckboxControl.svelte';
	import Button from '$lib/components/Button.svelte';
	import ItemHeader from '$lib/item/components/ItemHeader.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import ItemEffectBadge from '$lib/item/components/ItemEffectBadge.svelte';
	import ItemChangeButton from '$lib/item/components/ItemChangeButton.svelte';

	export let label: string;
	export let selectedItem: AccessoryItem | null = null;
	export let items: AccessoryItem[] = [];

	let dialog: Dialog;

	function updateItem(item: AccessoryItem) {
		selectedItem = item;
	}

	$: if (dialog && selectedItem) {
		dialog.close();
	}
</script>

<div class="relative">
	{#if selectedItem}
		<div class="absolute top-3 right-3 flex items-center gap-x-3 z-10">
			{#if selectedItem.possibleUpgrades > 0}
				<ItemUpgradeBar bind:item={selectedItem} />
			{/if}

			<div>
				<Button icon="sync" on:click={() => dialog.open()} class="text-2xl text-zinc-500 bg-zinc-700/30" />
			</div>
			<div>
				<Button icon="clear" on:click={() => (selectedItem = null)} class="text-2xl text-zinc-500 bg-zinc-700/30" />
			</div>
		</div>
	{/if}

	<EquipSlot {label} bind:item={selectedItem} on:click={() => dialog.open()} let:item>
		{#if item}
			<div class="flex mt-7 gap-x-4">
				<ItemChangeButton {item} on:click={() => dialog.open()} />

				<div class="grow">
					<ItemHeader rarity={item.rarity} type="Talisman">
						{item.name}{#if item.tier > 0}(+{item.tier}){/if}
					</ItemHeader>

					{#if item.weight > 0}
						<div class="mb-5 text-2xl font-light">
							<div class="flex items-center gap-x-1">
								<Icon name="weight" />{item.weight}
							</div>
						</div>
					{/if}

					{#if item.effectInfo}
						<p class="text-sm text-zinc-500 italic mb-2">{item.effectInfo}</p>
					{/if}

					<ul>
						{#each item.effects as effect}
							<li class="flex gap-x-5">
								<div class="grow">
									<ItemEffectBadge {effect} />
								</div>
								<div class="pt-2">
									<CheckboxControl bind:checked={effect.activated} on:checked={() => updateItem(item)}
									></CheckboxControl>
								</div>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		{/if}
	</EquipSlot>
</div>

<Dialog bind:this={dialog} class="finder-dialog">
	<svelte:fragment slot="title">
		Select <span class="font-semibold">{label}</span> Item
	</svelte:fragment>

	<AccessoryFinder {items} bind:selectedItem />
</Dialog>
