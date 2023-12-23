<script>
  import Factor from '$lib/Factor.svelte';
  import CloseButton from '$lib/CloseButton.svelte';
  import { createEventDispatcher } from 'svelte';
  import { editing } from '../stores';
  import Toast from '../toast';
  // import '$static/lock.svg';
  // import '$static/unlock.svg';
  const dispatch = createEventDispatcher();

  export let id = '';
  export let index = -1;
  export let name = '';
  export let detail = {};
  $: edit = $editing === name;

  export let locked = true;
  let dirty = false;
  $: image = locked ? 'lock.svg' : 'unlock.svg';
  const factors = detail.factors.sort(({ value: a }, { value: b }) => (a > b ? -1 : (a < b ? 1 : 0)));

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
    locked = true;
    if ($editing === name) $editing = '';
    else $editing = name;
  }

  function toggleRatioLock() {
    locked = !locked;
    Toast.add(`Should ${locked ? 'unlock' : 'lock'} sliders for this ratio.`);
  }

  function handleSelection() {
    if (edit) return;
    // console.log('selection:', detail)
    dispatch('use', { ...detail, name })
  }
</script>

<div class="floating ratio" on:click={handleSelection} aria-hidden="true">
  <div class="label-bar">
    <input class="title" name="title" type="text" value={detail.label} on:change={handleRename} style={edit ? 'pointer-events:auto' : 'pointer-events:none'} />
  </div>
  <div class="factors">
    {#each factors as factor, i}
      <Factor {edit} {index} id={detail.label + ' ' + id} parentName={name} parentLabel={detail.label} factor={factor} on:update={handleUpdate} />
    {/each}
  </div>
  {#if edit}
    <button class="edit-action add-factor">
      + New Factor
    </button>
    <div class="edit-actions">
      <button class="edit-action">
        CANCEL
      </button>
      <button class="edit-action">
        APPLY
      </button>
    </div>
    <!-- <CloseButton on:click={toggleEdit} /> -->
  {/if}
  <div class="options">
    <button class="edit-button" on:click|stopPropagation={toggleEdit}>
      <img src={edit ? "cancel.svg" : "edit.svg"} />
    </button>
    {#if !edit}
    <button class="edit-button" on:click|stopPropagation={toggleRatioLock}>
      <img src={locked ? 'unlock.svg' : 'lock.svg'} />
    </button>
    {/if}
  </div>
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
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    width: 2rem;
    border: none;
    background: transparent;
  }
  .factors {
    margin: 0 1rem 1rem 0;
    padding-left: 1rem;
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
  .options {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 8px;
    right: 3px;
    width: 42px;
    pointer-events: auto;
  }
  .hidden {
    display: none;
  }
  .title {
    max-height: 2rem;
  }

  .edit-actions {
    display: flex;
    flex-direction: column;
    align-self: flex-end;
    gap: 0.5rem;
    padding: 0 0.5rem 0.5rem;
    width: 100%;
  }

  .edit-action {
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