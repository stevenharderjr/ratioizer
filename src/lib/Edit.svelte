<script>
  import Factor from '$lib/Factor.svelte';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let id = '';
  export let index = -1;
  export let name = '';
  export let detail = {};
  export let edit = false;

  function handleRename(e) {
    const { value } = e.currentTarget;
    e.currentTarget.blur();
    console.log('Should rename "' + detail.title + '" to "' + value + '"');
  }

  function handleUpdate({ detail: { parentName, name, label, value, unit }}) {
    const rename = label.toLowerCase();
    console.log({ parentName, name: rename !== name ? rename : name, label, value, unit });
  }
</script>

<div class="ratio">
  <input class="title" type="text" value={detail.label} on:change={handleRename} />
  <div class="factors">
    {#each detail.factors as factor, i}
      <Factor {index} id={detail.label + ' ' + id} parentName={name} parentLabel={detail.label} detail={factor} on:update={handleUpdate} />
    {/each}
  </div>
</div>

<style>
  .ratio {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 4px;
    border-radius: 8px;
    margin-bottom: 1rem;
    box-shadow: 0 8px 8px 0 #0003;
    background: #fff;
    max-width: 100vw;
  }
  .title {
    font-size: 1.25rem;
    font-weight: 500;
    border: none;
    padding: 4px 8px;
  }
  .factors {
    padding: 8px 0;
  }
  .disabled {
    pointer-events: none;
  }
</style>
