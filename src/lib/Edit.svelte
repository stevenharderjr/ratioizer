<script>
  import Factor from '$lib/Factor.svelte';
  import CloseButton from '$lib/CloseButton.svelte';
  import selectOnFocus from '$lib/utils/selectOnFocus';
  import { createEventDispatcher } from 'svelte';
  import { editing, toasts, using } from '../stores';
  import Toast from '../toast';
  // import '$static/lock.svg';
  // import '$static/unlock.svg';
  const dispatch = createEventDispatcher();

  export let ratio = {};
  export let edit = true;
  let partialFactor = false;
  const initialLabel = ratio.label;
  let labelInput;

  export let locked = true;
  let dirty = false;
  $: image = locked ? 'lock.svg' : 'unlock.svg';
  let factors = ratio.factors.sort(({ value: a }, { value: b }) => (a > b ? -1 : (a < b ? 1 : 0)));

  function handleBlur({ currentTarget }) {
    const { value: inputValue, name: key } = currentTarget;
    if (initialLabel && !inputValue) currentTarget.value = initialLabel;
  }

  function handleRename(e) {
    const { value } = e.currentTarget;
    if (!value) return;
    e.currentTarget.blur();
    console.log('Should rename "' + ratio.label + '" to "' + value + '"');
  }

  function updateFactor({ detail }) {
    console.log(detail);
    const { parentName, name, label, value, unit } = detail;
    if (!name) return;
    factors = factors.map(factor => {
      if (factor.name !== parentName) return factor;
      return { name, label, value, unit };
    })
  }

  function applyChanges({ detail: { parentName, name, label, value, unit }}) {

    const test = label.toLowerCase();
    // if (!name) {
    //   // new factor
    //   const duplicate = factors.find(({ name }) => name === test);
    //   if (!duplicate) {
    //     factors
    //   }
    // }
    // if (name !== test) {

    //   if (!name) {
    //     // new factor
    //     newFactor =
    //   }
    // }
  }

  function handleUpdate({ detail: { parentName, name, label, value, unit } }) {
    const test = label.toLowerCase();
    console.log({ parentName, name, label, value, unit });
    // edge cases:
    // partial info
    // rename
    // new factor
  }

  function handleDelete({ detail: { factor, parentName } }) {
    const { name: factorName } = factor;
    if (!factorName) return cancelPartialFactor();
  }

  function cancelPartialFactor() {
    factors = factors.filter(({ name }) => !!name);
    partialFactor = false;
  }

  function toggleEdit() {
    if (edit) {
      cancelPartialFactor();
      return dispatch('close');
    }

    dispatch('edit', ratio.name);
    labelInput.focus();
  }

  function toggleRatioLock() {
    locked = !locked;
    Toast.add({ message: locked ? 'Unlocked' : 'Locked', blur: false, replace: true });
  }

  function handleSelection() {
    if (edit) return;
    // console.log('selection:', detail)
    dispatch('use', { name: ratio.name })
  }

  function addFactor() {
    // Toast.add({ message: 'Should add another factor', blur: false })
    factors = [...factors, { label: '', value: 0, unit: 'g' }];
    partialFactor = true;
  }
</script>

<div class="floating ratio" on:click={handleSelection} aria-hidden="true">
  <div class="label-bar">
    <input class="label" name="label" type="text" value={ratio.label} placeholder={initialLabel} bind:this={labelInput} on:focus={selectOnFocus} on:blur={handleBlur} on:change={handleRename} style={edit ? 'pointer-events:auto' : 'pointer-events:none'} />
  </div>
  <div class="factors">
    {#each factors as factor}
      <Factor {edit} parentName={ratio.name} parentLabel={ratio.label} factor={factor} on:update={updateFactor} on:delete={handleDelete} />
    {/each}
    {#if edit && !partialFactor}
      <button class="add-factor" on:click={addFactor}>
        + New Factor
      </button>
    {/if}
  </div>
  {#if edit}
    <div class="edit-actions">
      <button class="edit-action" on:click|stopPropagation={toggleEdit}>
        CANCEL
      </button>
      <button class="edit-action" on:click|stopPropagation={applyChanges}>
        APPLY
      </button>
    </div>
    <!-- <CloseButton on:click={toggleEdit} /> -->
  {/if}
  <div class="options">
    <button class="option-button" on:click|stopPropagation={toggleEdit}>
      <img src={edit ? "x.svg" : "edit.svg"} />
    </button>
    <!-- {#if use && !edit}
      <button class="option-button" on:click|stopPropagation={toggleRatioLock}>
        <img src={locked ? 'unlock.svg' : 'lock.svg'} />
      </button>
    {/if} -->
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
  .option-button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 42px;
    width: 42px;
    border: none;
    background: transparent;
  }
  .factors {
    margin: 0 1rem 1rem 0;
    padding-left: 1rem;
    width: 100%;
    /* background: #f006; */
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
    top: 0;
    right: 0;
    pointer-events: auto;
  }
  .hidden {
    display: none;
  }
  .label {
    max-height: 2rem;
  }

  .edit-actions {
    display: flex;
    flex-direction: row;
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
    width: 100%;
    flex: 1;
    font-size: small;
    font-weight: 300;
  }

  .add-factor {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative;
    top: 0;
    background: #fff;
    /* box-shadow: 8px 2px 8px #000; */
    border: none;
    border-radius: 6px;
    /* min-width: 7rem; */
    height: 42px;
    /* margin-bottom: 1rem; */
    width: 100%;
    font-size: 1rem;
    color: #666;
    font-weight: 500;
    font-size: small;
    text-transform: uppercase;
    text-align: center;
    padding: 4px 8px;
    /* background: #f006; */
  }
</style>