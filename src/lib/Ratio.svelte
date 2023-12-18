<script>
  import Factor from '$lib/Factor.svelte';
  import { createEventDispatcher } from 'svelte';
  import { editing } from '../stores';
  // import '$static/lock.svg';
  // import '$static/unlock.svg';
  const dispatch = createEventDispatcher();

  export let id = '';
  export let index = -1;
  export let name = '';
  export let detail = {};
  $: edit = $editing === name;
  export let lock = true;
  let dirty = false;
  $: image = lock ? 'lock.svg' : 'unlock.svg';

  function handleRename(e) {
    const { value } = e.currentTarget;
    e.currentTarget.blur();
    console.log('Should rename "' + detail.title + '" to "' + value + '"');
  }

  function handleUpdate({ detail: { parentName, name, label, value, unit }}) {
    const rename = label.toLowerCase();
    console.log({ parentName, name: rename !== name ? rename : name, label, value, unit });
  }

  function toggleLock() {
    if ($editing === name) $editing = '';
    else $editing = name;
  }

  function handleSelection() {
    if (edit) return;
    // console.log('selection:', detail)
    dispatch('selection', { ...detail, name })
  }
</script>

<div class="floating ratio" on:click={handleSelection}>
  <div class="label-bar">
    <input class="title" name="title" type="text" value={detail.label} on:change={handleRename} style={edit ? 'pointer-events:auto' : 'pointer-events:none'} />
    <button>
      <img src={edit ? 'unlock.svg' : 'lock.svg'} on:click|stopPropagation={toggleLock} />
    </button>
  </div>
  <div class="factors">
    {#each detail.factors as factor, i}
      <Factor {edit} {index} id={detail.label + ' ' + id} parentName={name} parentLabel={detail.label} detail={factor} on:update={handleUpdate} />
    {/each}
  </div>
</div>

<style>
  .ratio {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding: 0 4px;
    border-radius: 8px;
    margin-bottom: 1rem;
    background: #fff;
    width: 100%;
  }
  input {
    font-size: 1.25rem;
    font-weight: 500;
    padding: 4px 8px;
    flex: 1;
    max-width: 12rem;
  }
  img {
    flex: 0;
    height: 3.15rem;
    width: 3rem;
    top: 2.25rem;
    display: flex;
    justify-self: center;
    align-self: center;
    padding: 0.75rem;
    opacity: 0.5;
    border-radius: 6px;
    /* margin: 0.5rem 0.5rem 0 0; */
  }
  button {
    display: flex;
    height: 100%;
    border: none;
    background: transparent;
    pointer-events: auto;
  }
  .factors {
    margin-bottom: 1rem;
  }
  .disabled {
    pointer-events: none;
  }
  .label-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .hidden {
    display: none;
  }
  .title {
    max-height: 2rem;
  }
</style>