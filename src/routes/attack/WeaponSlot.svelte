<script lang="ts">
	import ItemSlot from '$lib/item/components/ItemSlot.svelte';
	import { createCollection, DamageType } from '$lib/core';
	import EquippedWeapon from './EquippedWeapon.svelte';
	import WeaponCard from './WeaponCard.svelte';
	import SelectControl from '$lib/components/SelectControl.svelte';
	import InputControl from '$lib/components/InputControl.svelte';
	import CheckboxControl from '$lib/components/CheckboxControl.svelte';
	import SortButton from '$lib/item/components/SortButton.svelte';
	import { weaponTypeInfo, type AttackItem } from '$lib/item';

	export let label: string;
	export let item: AttackItem | null = null;
	export let items: AttackItem[] = [];

	const typeOptions = [{ id: null, name: 'All Types' }, ...Object.entries(weaponTypeInfo).map(([id, info]) => ({ id, name: info.name }))];

	function createDamageFilter(type: DamageType) {
		return (item: AttackItem, value: boolean) => (value ? item.attackInfo.damage.includes(type) : true);
	}

	const { result, pagination, filters, sort } = createCollection(
		items,
		{
			filters: {
				search: '',
				type: null,
				standardDamage: false,
				slashDamage: false,
				strikeDamage: false,
				pierceDamage: false
			}
		},
		{
			filters: {
				search: (item: AttackItem, value: string) => {
					if (value === '') {
						return true;
					}

					return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
				},
				type: (item: AttackItem, value: number | null) => (value ? item.type == value : true),
				standardDamage: createDamageFilter(DamageType.STANDARD),
				slashDamage: createDamageFilter(DamageType.SLASH),
				strikeDamage: createDamageFilter(DamageType.STRIKE),
				pierceDamage: createDamageFilter(DamageType.PIERCE)
			},
			sort: {
				weight: (item: AttackItem) => item.weight,
				physicalAttack: (item: AttackItem) => item.attack.phy ?? 0,
				magicalAttack: (item: AttackItem) => item.attack.mag ?? 0,
				fireAttack: (item: AttackItem) => item.attack.fir ?? 0,
				lightningAttack: (item: AttackItem) => item.attack.lit ?? 0,
				holyAttack: (item: AttackItem) => item.attack.hol ?? 0
			}
		}
	);
</script>

<ItemSlot {label} dialogTitle="Choose {label} Weapon" bind:selectedItem={item} result={$result} bind:pagination={$pagination} let:selectedItem>
	{#if selectedItem}
		<EquippedWeapon item={selectedItem} on:update={(e) => (item = e.detail)} />
	{:else}
		Weapon Slot
	{/if}

	<svelte:fragment slot="utils">
		<div class="flex gap-x-2 mb-4">
			<SelectControl options={typeOptions} bind:value={$filters.type} let:item>
				<svelte:fragment slot="selected" let:item>
					<div class="p-2">
						{item?.name}
					</div>
				</svelte:fragment>

				{item.name}
			</SelectControl>
			<InputControl bind:value={$filters.search} placeholder="Search weapon by name..." />
		</div>

		<div class="flex gap-x-10">
			<div class="grid grid-cols-2 gap-x-5 gap-y-2">
				<CheckboxControl bind:checked={$filters.standardDamage}>Standard</CheckboxControl>
				<CheckboxControl bind:checked={$filters.slashDamage}>Slash</CheckboxControl>
				<CheckboxControl bind:checked={$filters.strikeDamage}>Strike</CheckboxControl>
				<CheckboxControl bind:checked={$filters.pierceDamage}>Pierce</CheckboxControl>
			</div>
			<div>
				<h6>Stats</h6>
				<div class="flex gap-5">
					<SortButton bind:state={$sort.weight}>Weight</SortButton>
				</div>
			</div>
			<div>
				<h6>Attack Type</h6>
				<div class="flex gap-5">
					<SortButton bind:state={$sort.physicalAttack}>Physical</SortButton>
					<SortButton bind:state={$sort.magicalAttack}>Magical</SortButton>
					<SortButton bind:state={$sort.fireAttack}>Fire</SortButton>
					<SortButton bind:state={$sort.lightningAttack}>Lightning</SortButton>
					<SortButton bind:state={$sort.holyAttack}>Holy</SortButton>
				</div>
			</div>
		</div></svelte:fragment
	>

	<svelte:fragment slot="listItem" let:item>
		<WeaponCard {item} />
	</svelte:fragment>
</ItemSlot>
