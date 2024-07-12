<script lang="ts">
	import { createBuild } from '$lib/api';
	import { sharedDataState, type HeroState } from '$lib/state';

  export let hero: HeroState;

  /*function importData() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/JSON';
    input.onchange = async(_) => {
      let files = Array.from(input.files!);
      let text = await files[0].text();

      loadData(JSON.parse(text));
    };

    input.click();
  }*/

 async function createSharedUrl() {
  const url = await createBuild($sharedDataState)
  alert(url);
 }
</script>

<header>
  <div class="flex justify-between">
    <h1 class="text-4xl font-bold mb-8 dark:text-zinc-200">
      <span>Tarnished</span> Creator
    </h1>

    <div class="leading-3 text-right">
      <span class="text-zinc-500 text-xs">Developed with love by Thomas Monzel</span><br>
      <span class="text-zinc-600 text-xs">ELDEN RING is a trademark of FromSoftware.</span><br><br>

      <a href="https://www.buymeacoffee.com/digitaleshandwerk" class="inline-block w-40" target="_blank">
        <img alt="Buy me a coffee button" src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=digitaleshandwerk&button_colour=FFDD00&font_colour=000000&font_family=Inter&outline_colour=000000&coffee_colour=ffffff" />
      </a>
    </div>
  </div>
  
  <div class="flex gap-20 mb-10 items-end">
    <div>
      <h3 class="text-lg text-zinc-500">Level</h3>
      <p class="mt-2 text-5xl dark:text-zinc-200">{hero.level}</p>
    </div>

    <div>
      <h3 class="text-lg text-zinc-500">Attribute Points</h3>
      <p class="mt-2 text-5xl dark:text-zinc-200">{hero.attributePoints}</p>
    </div>

    <div>
      <h3 class="text-lg text-zinc-500">Attack Power</h3>
      <p class="mt-2 text-5xl dark:text-zinc-200">
        {Math.round(hero.attack.getTotal() * 10) / 10}
      </p>
    </div>

    <div class="ml-auto">
      <button 
        type="button" 
        class="px-4 py-2 font-medium dark:text-zinc-200 border-2 rounded-xl"
        on:click={() => createSharedUrl()}>
          Share your build
      </button>
    </div>
  </div>

  <div class="my-10">
    <hr class="h-1 bg-amber-300 border-amber-300 transition-all" style:width={hero.progress * 100 + "%"}>
    <hr class="opacity-30">
  </div>
</header>
