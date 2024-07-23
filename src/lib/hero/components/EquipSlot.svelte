<script lang="ts">
	import EquipUpgradeBar from './EquipUpgradeBar.svelte';
	import ItemSelectList from '$lib/item/components/ItemSelectList.svelte';
	import { AttackItem, type Item } from '$lib/item';
	import CheckboxControl from '$lib/components/CheckboxControl.svelte';
	import type { HeroEquipSlot } from '../HeroEquipSlot';
	import EquippedItemCard from '$lib/hero/components/EquippedItemCard.svelte';

	export let label: string;
	export let slot: HeroEquipSlot;
	export let item: Item | null = null;
	export let selectableItems: Item[] = [];
	export let iconUrl: string | undefined = undefined;

	let selectionDialog: HTMLDialogElement;

	let opened = false;

	export function openSelectionDialog(): void {
		selectionDialog.showModal();
		opened = true;
	}

	export function closeSelectionDialog(): void {
		selectionDialog.close();
		opened = false;
	}

	export function useWithTwoHands(v: boolean): void {
		slot.useWithTwoHands = v;
		slot = slot;
	}

	export function selectItem(item: Item | null): void {
		slot = slot.selectItem(item ? item.id : null);
		closeSelectionDialog();
	}
</script>

<div class="relative">
	<div class="flex justify-between items-center gap-7 mb-2">
		<div class="flex items-center gap-x-4">
			{#if item && item.possibleUpgrades > 0}
				<EquipUpgradeBar {item} />
			{/if}
			{#if item && item instanceof AttackItem}
				<CheckboxControl
					checked={slot.useWithTwoHands}
					on:checked={(e) => useWithTwoHands(e.detail)}
				>
					Use two-handed
				</CheckboxControl>
			{/if}
		</div>
	</div>
	<button
		type="button"
		class="group w-full bg-stone-700/20 rounded-lg p-5 text-left items-start shadow-md transition-all ease-out duration-200 hover:ring-2 hover:ring-amber-300 hover:bg-stone-800"
		on:click={() => openSelectionDialog()}
	>
		{#if item}
			<div class="flex justify-between">
				<div>
					<span
						class="text-xs font-medium px-2.5 py-0.5 rounded bg-emerald-400/20 text-emerald-300"
					>
						{label}
					</span>
				</div>
				<div>
					<button
						class="relative flex rounded-lg bg-stone-600/40 p-1 ring-stone-400 hover:ring-2 group"
						on:click|stopPropagation|preventDefault={() => selectItem(null)}
					>
						<svg
							class="fill-stone-400"
							xmlns="http://www.w3.org/2000/svg"
							height="24px"
							viewBox="0 -960 960 960"
							width="24px"
							fill="#5f6368"
							><path
								d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
							/></svg
						>
					</button>
				</div>
			</div>

			<div class="pt-3">
				<EquippedItemCard {item} />
			</div>

			{#if !item.isEquippable()}
				<div
					class="flex items-center mt-5 bg-red-600/20 justify-center text-red-400 rounded-md p-2 text-sm"
				>
					<span class="mat-icon">warning</span>
					<span class="ms-1">Item requirements not met. Damage penality applied (-40%).</span>
				</div>
			{/if}
		{:else}
			<div class="text-center py-10 flex flex-col items-center">
				{#if iconUrl}
					<img src={iconUrl} alt="Slot icon" class="max-w-28" />
				{/if}
				<p class="text-lg text-amber-300 font-semibold">{label}</p>
			</div>
		{/if}
	</button>
</div>

<dialog
	bind:this={selectionDialog}
	class="bg-neutral-900 me-0 mt-0 h-screen overflow-y-scroll border-s border-zinc-800"
	style="min-width: 600px; scrollbar-width: thin; scrollbar-color: #444 transparent;"
>
	<button
		type="button"
		class="fixed w-full top-0 left-0 right-0 bottom-0 bg-zinc-900/50 backdrop-blur-sm flex items-center"
		on:click={() => closeSelectionDialog()}
	>
		<!--{#if item}
    <div style="margin-left:30%">
      <img src={item.iconUrl} alt="Item icon" class="" style="width: 500px" />
    </div>
    {/if}-->
		<span class="sr-only">Close modal</span>
	</button>

	<div class="relative z-30 bg-neutral-800/30">
		<div
			class="text-stone-300 bg-neutral-800 text-xl p-2 flex justify-between items-center border-b border-zinc-700"
		>
			<div class="p-4">
				Select <span class="font-semibold">{label}</span> Item
			</div>
			{#if item}
				<div>
					<button
						class="bg-amber-300 text-amber-900 p-2.5 rounded-md"
						on:click={() => selectItem(null)}>Clear Slot</button
					>
				</div>
			{/if}
		</div>
		<ItemSelectList
			items={selectableItems}
			selectedItemId={item?.id}
			on:selectItem={(e) => selectItem(e.detail)}
		/>
	</div>
</dialog>

<!--<ItemSelectDialog bind:this={selectionDialog} items={$selectableItems} />-->

<style>
	dialog:modal {
		max-height: 100vh;
	}

	dialog > div {
		animation: fade-out 0.4s cubic-bezier(0.22, 1, 0.36, 1);
	}

	dialog[open] > div {
		animation: fade-in 0.4s cubic-bezier(0.22, 1, 0.36, 1);
	}

	@keyframes fade-in {
		0% {
			opacity: 0;
			transform: translateX(20px);
		}

		100% {
			opacity: 1;
			transform: translateX(0px);
		}
	}

	@keyframes fade-out {
		0% {
			opacity: 1;
			transform: translateX(0px);
		}

		100% {
			opacity: 0;
			transform: translateX(20px);
		}
	}
</style>
