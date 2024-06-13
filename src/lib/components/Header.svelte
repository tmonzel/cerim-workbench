<script lang="ts">
	import { loadData } from '$lib/data';
	import { heroState } from '$lib/hero';

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
  <h1 class="text-4xl font-bold mb-8"><span>Hero</span> Workbench</h1>
  <div class="flex gap-20 mb-10">
    <div>
      <h3 class="text-lg">Level</h3>
      <p class="mt-2 text-5xl">{$heroState.level}</p>
    </div>

    <div>
      <h3 class="text-lg">Attribute Points</h3>
      <p class="mt-2 text-5xl">{$heroState.attributePoints}</p>
    </div>

    <div>
      <h3 class="text-lg">Damage Per Second</h3>
      <p class="mt-2 text-5xl">
        {Math.round($heroState.dps.min)}-{Math.round($heroState.dps.max)} ({Math.round($heroState.dps.avg)})
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

<style>

  /*
    E: 0 - 24
    D: 25 - 59
    C: 60 - 89
    B: 90 - 139
    A: 140 - 174
    S: 175+

    "rgba(255, 0, 0, 0.6)",
        "rgba(255, 48, 0, 0.6)",
        "rgba(255, 102, 0, 0.6)",
        "rgba(255, 154, 0, 0.6)",
        "rgba(255, 205, 0, 0.6)",
        "rgba(255, 255, 0, 0.6)",
        "rgba(203, 255, 0, 0.6)",
        "rgba(150, 255, 0, 0.6)",
        "rgba(94, 255, 0, 0.6)",
        "rgba(0, 255, 0, 0.6)"
  */
  .rainbow {
    background: linear-gradient(90deg, rgba(255, 0, 0, 0.6) 10%, rgba(255, 48, 0, 0.6) 10% 20%, rgba(255, 102, 0, 0.6) 20% 30%, rgba(255, 205, 0, 0.6) 30% 40%, rgba(255, 255, 0, 0.6) 40% 50%, rgba(203, 255, 0, 0.6) 50% 60%, rgba(150, 255, 0, 0.6) 60% 70%, rgba(94, 255, 0, 0.6) 70% 80%, rgba(0, 255, 0, 0.6) 80%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>