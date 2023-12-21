<script>
  import Factor from '$lib/Factor.svelte';
  import CloseButton from '$lib/CloseButton.svelte';
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

  function toggleEdit() {
    if ($editing === name) $editing = '';
    else $editing = name;
  }

  function handleSelection() {
    if (edit) return;
    // console.log('selection:', detail)
    dispatch('selection', { ...detail, name })
  }
</script>

<div class="floating ratio" on:click={handleSelection} aria-hidden="true">
  <div class="label-bar">
    <input class="title" name="title" type="text" value={detail.label} on:change={handleRename} style={edit ? 'pointer-events:auto' : 'pointer-events:none'} />
    <button class="edit-button" on:click|stopPropagation={toggleEdit}>
      <img src={edit ? 'unlock.svg' : 'lock.svg'} />
    </button>
  </div>
  <div class="factors">
    {#each detail.factors as factor, i}
      <Factor {edit} {index} id={detail.label + ' ' + id} parentName={name} parentLabel={detail.label} factor={factor} on:update={handleUpdate} />
    {/each}
  </div>
  {#if edit}
    <button class="add-factor">
      + New Factor
    </button>
    <div class="button-group">
      <button class="button-action">
        CANCEL
      </button>
      <button class="button-action">
        APPLY
      </button>
    </div>
    <!-- <CloseButton on:click={toggleEdit} /> -->
  {/if}
</div>

<style>
  .ratio {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    border-radius: 8px;
    margin-bottom: 1rem;
    background: #fff;
    width: 20rem;
    max-width: 92vw;
    padding: 0.25rem;
  }
  input {
    font-size: 1.25rem;
    font-weight: 500;
    flex: 1;
    max-width: 12rem;
  }
  input:focus {
    padding: 4px 8px;
  }
  img {
    height: 1.5rem;
    width: 1.5rem;
    display: flex;
    opacity: 0.5;
    border-radius: 6px;
    /* margin: 0.5rem 0.5rem 0 0; */
  }
  .edit-button {
    position: absolute;
    top: 2px;
    right: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    width: 2rem;
    border: none;
    background: transparent;
    pointer-events: auto;
  }
  .factors {
    margin: 0 1rem 1rem 0;
    width: 100%;
  }
  .disabled {
    pointer-events: none;
  }
  .label-bar {
    position: relative;
    width: 100%;
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

  .button-group {
    display: flex;
    flex-direction: row;
    align-self: flex-end;
    gap: 0.5rem;
    padding: 0 0.5rem 0.5rem;
    width: 100%;
  }

  .button-action {
    padding: 0.5rem 1rem;
    background: #666;
    color: #fff;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    background: #0000;
    width: 100%;
    flex: 1;
    font-size: small;
    font-weight: 300;
  }

  .add-factor {
    position: relative;
    top: -8px;
    background: #fff;
    /* box-shadow: 8px 2px 8px #000; */
    border: none;
    border-radius: 6px;
    min-width: 7rem;
    height: 1rem;
    margin-bottom: 1rem;
  }
</style>