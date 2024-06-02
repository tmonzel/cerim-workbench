<script lang="ts">
  export let label: string;
  export let value: number;

  const id = crypto.randomUUID();

  function changeValue(newValue: number) {
    if(newValue < 0) {
      return;
    }

    value = newValue;
  }
</script>

<label for={id} class="block text-sm font-medium leading-6 text-gray-900">{label}</label>
<div class="relative mt-2 rounded-md shadow-sm">
  <div class="absolute inset-y-0 left-0 flex items-center">
    <button 
      class="h-full rounded-md border-0 bg-transparent px-5 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm" 
      on:click={() => changeValue(value - 1)}
    >
      -
    </button>
  </div>
  <input type="text" id={id} class="block w-full rounded-md border-0 py-1.5 text-center text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" readonly value={value}>
  <div class="absolute inset-y-0 right-0 flex items-center">
    <button 
      class="h-full rounded-md border-0 bg-transparent px-5 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm" 
      on:click={() => changeValue(value + 1)}
    >
      +
    </button>
  </div>
</div>