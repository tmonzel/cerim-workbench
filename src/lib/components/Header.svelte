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
  <h1 class="text-4xl font-bold mb-8 dark:text-zinc-200"><span>Tarnished</span> Creator</h1>

  <div class="flex gap-20 mb-10 items-end">
    <div>
      <h3 class="text-lg text-gray-400/80">Level</h3>
      <p class="mt-2 text-5xl dark:text-zinc-200">{$heroState.level}</p>
    </div>

    <div>
      <h3 class="text-lg  text-gray-400/80">Attribute Points</h3>
      <p class="mt-2 text-5xl dark:text-zinc-200">{$heroState.attributePoints}</p>
    </div>

    <div>
      <h3 class="text-lg  text-gray-400/80">Damage Per Second</h3>
      <p class="mt-2 text-5xl dark:text-zinc-200">
        {Math.round($heroState.dps * 10) / 10}
      </p>
    </div>

    <div class="ml-auto">
      <button 
        type="button" 
        class="px-4 py-2 font-medium dark:text-zinc-200 border-2 rounded-xl"
        on:click={importData}>
          Import
      </button>
    </div>
  </div>
</header>
