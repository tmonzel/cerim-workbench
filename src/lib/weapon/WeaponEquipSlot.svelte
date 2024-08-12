<script lang="ts">
	import ItemUpgradeBar from '$lib/hero/components/ItemUpgradeBar.svelte';
	import WeaponAffinitySelect from '$lib/weapon/WeaponAffinitySelect.svelte';
	import EquipSlot from '$lib/item/components/EquipSlot.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import type { AttackItem } from './AttackItem';
	import WeaponFinder from './WeaponFinder.svelte';
	import WeaponCard from './WeaponCard.svelte';
	import Button from '$lib/components/Button.svelte';
	import ItemHeader from '$lib/item/components/ItemHeader.svelte';
	import { weaponTypeInfo } from './weapon.type';
	import AttackBadge from '$lib/components/AttackBadge.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import AttackDetail from '$lib/components/AttackDetail.svelte';
	import WeaponInfo from './WeaponInfo.svelte';
	import GuardGrid from '$lib/components/GuardGrid.svelte';
	import ItemChangeButton from '$lib/item/components/ItemChangeButton.svelte';
	import ItemEffectList from '$lib/item/components/ItemEffectList.svelte';

	export let label: string;
	export let selectedItem: AttackItem | null = null;
	export let items: AttackItem[] = [];

	let dialog: Dialog;

	export function selectItem(item: AttackItem | null): void {
		selectedItem = item;
		dialog.close();
	}
</script>

<div class="relative">
	{#if selectedItem}
		<div class="absolute top-3 right-3 flex items-center gap-x-5 text-lg">
			{#if selectedItem.affinities.size > 0}
				<WeaponAffinitySelect bind:item={selectedItem} />
			{/if}

			{#if selectedItem.possibleUpgrades > 0}
				<ItemUpgradeBar bind:item={selectedItem} />
			{/if}

			<div>
				<Button icon="clear" on:click={() => (selectedItem = null)} class="text-xl text-zinc-500 bg-zinc-700/30" />
			</div>
		</div>
	{/if}
	<EquipSlot on:click={() => dialog.open()} {label} bind:item={selectedItem} let:item>
		{#if item}
			<div class="flex mt-7 gap-x-4">
				<ItemChangeButton {item} on:click={() => dialog.open()} />

				<div class="grow">
					<ItemHeader rarity={item.rarity} type={weaponTypeInfo[item.type] ? weaponTypeInfo[item.type].name : '-'}>
						{item.name}
						{#if item.tier > 0}(+{item.tier}){/if}
					</ItemHeader>

					<div class="flex items-center justify-between gap-x-12 mt-3 mb-2 text-2xl font-light">
						<AttackBadge attack={item.attack} />
						{#if item.weight > 0}
							<div class="flex items-center gap-x-1">
								<Icon name="weight" />{item.weight}
							</div>
						{/if}
					</div>

					<div class="mb-3">
						<AttackDetail attack={item.attack} />
					</div>

					<div class="mb-3">
						<WeaponInfo {item} />
					</div>

					<ItemEffectList {item} />

					{#if item.guard}
						<div class="px-4 py-4 sm:px-0">
							<dt class="text-sm font-medium mb-2">Guard</dt>
							<dd><GuardGrid data={item.guard} /></dd>
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</EquipSlot>
</div>

<Dialog bind:this={dialog}>
	<svelte:fragment slot="title">
		Select <span class="font-semibold">{label}</span> Item
	</svelte:fragment>

	<WeaponFinder {items} bind:selectedItem on:selectItem={() => dialog.close()} />
</Dialog>
