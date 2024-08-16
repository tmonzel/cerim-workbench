<script lang="ts">
	import EquipSlot from '$lib/item/components/EquipSlot.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import type { ProtectItem } from './ProtectItem';
	import ArmorFinder from './ArmorFinder.svelte';
	import Button from '$lib/components/Button.svelte';
	import ItemHeader from '$lib/item/components/ItemHeader.svelte';
	import { armorTypeInfo } from './armor.type';
	import ArmorInfo from './ArmorInfo.svelte';
	import ResistanceGrid from '$lib/components/ResistanceGrid.svelte';
	import DamageNegationGrid from '$lib/components/DamageNegationGrid.svelte';
	import ItemChangeButton from '$lib/item/components/ItemChangeButton.svelte';
	import CheckboxControl from '$lib/components/CheckboxControl.svelte';
	import ItemEffectBadge from '$lib/item/components/ItemEffectBadge.svelte';

	export let label: string;
	export let selectedItem: ProtectItem | null = null;
	export let items: ProtectItem[] = [];

	let dialog: Dialog;

	function updateItem(item: ProtectItem) {
		selectedItem = item;
	}

	$: if (dialog && selectedItem) {
		dialog.close();
	}
</script>

<div class="relative">
	{#if selectedItem}
		<div class="absolute top-3 right-3 flex items-center gap-x-5">
			<div>
				<Button icon="clear" on:click={() => (selectedItem = null)} class="text-xl text-zinc-500 bg-zinc-700/30" />
			</div>
		</div>
	{/if}
	<EquipSlot on:click={() => dialog.open()} {label} bind:item={selectedItem} let:item>
		{#if item}
			<div class="flex mt-7 gap-x-4 flex-wrap">
				<ItemChangeButton {item} on:click={() => dialog.open()} />

				<div class="grow">
					<ItemHeader rarity={item.rarity} type={armorTypeInfo[item.type] ? armorTypeInfo[item.type].name : '-'}>
						{item.name}
					</ItemHeader>

					<ArmorInfo {item} />

					<ul>
						{#each item.effects as effect}
							<li class="flex gap-x-5">
								<div class="grow">
									<ItemEffectBadge {effect} />
								</div>
								<div class="pt-2">
									<CheckboxControl bind:checked={effect.activated} on:checked={() => (item ? updateItem(item) : null)}
									></CheckboxControl>
								</div>
							</li>
						{/each}
					</ul>

					<dl class="divide-y divide-gray-100/20">
						<div class="px-4 py-4 sm:px-0">
							<dt class="text-sm font-medium mb-2">Resistance (⌀ {item.resistanceAvg})</dt>
							<dd><ResistanceGrid data={item.resistance} /></dd>
						</div>

						<div class="px-4 py-4 sm:px-0">
							<dt class="text-sm font-medium mb-2">Absorption (⌀ {item.damageNegationAvg})</dt>
							<dd><DamageNegationGrid data={item.damageNegation} /></dd>
						</div>
					</dl>
				</div>
			</div>
		{/if}
	</EquipSlot>
</div>

<Dialog bind:this={dialog} class="finder-dialog">
	<svelte:fragment slot="title">
		Select <span class="font-semibold">{label}</span> Item
	</svelte:fragment>

	<ArmorFinder {items} bind:selectedItem />
</Dialog>
