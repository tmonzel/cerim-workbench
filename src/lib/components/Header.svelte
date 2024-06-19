<script lang="ts">
	import { loadData } from '$lib/data';
	import { heroState } from '$lib/hero';
  import BlurredText from '$lib/components/BlurredText.svelte';

  function importData() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/JSON';
    input.onchange = async(_) => {
      let files = Array.from(input.files!);
      let text = await files[0].text();

      loadData(JSON.parse(text));
    };

    input.click();
  }
</script>

<header>
  <BlurredText blurColor="#777">
    <h1 class="text-4xl font-bold mb-8"><span>Hero</span> Workbench</h1>
  </BlurredText>

  <div class="flex gap-20 mb-10">
    <div>
      <h3 class="text-lg text-amber-300">Level</h3>
      <p class="mt-2 text-5xl dark:text-zinc-300">{$heroState.level}</p>
    </div>

    <div>
      <h3 class="text-lg  text-amber-300">Attribute Points</h3>
      <p class="mt-2 text-5xl dark:text-zinc-300">{$heroState.attributePoints}</p>
    </div>

    <div>
      <h3 class="text-lg  text-amber-300">Damage Per Second</h3>
      <p class="mt-2 text-5xl dark:text-zinc-300">
        {Math.round($heroState.dps.min * 10) / 10}-{Math.round($heroState.dps.max * 10) / 10} ({Math.round($heroState.dps.avg)})
      </p>
    </div>

    <div class="ml-auto">
      <button type="button" on:click={importData} 
          class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">Import</span>
      </button>
    </div>
  </div>
</header>
