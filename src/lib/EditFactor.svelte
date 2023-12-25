<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import selectOnFocus from '$lib/utils/selectOnFocus';
  import Toast from '../toast';
  const dispatch = createEventDispatcher();
  export let factor = {};
  export let parentName = '';
  export let parentLabel = '';
  export let edit = false;
  let labelInput;
  const initialValues = { ...factor };
  let undo = false;

  function handleBlur({ currentTarget }) {
    const { value: inputValue, name: key } = currentTarget;
    const defaultValue = initialValues[key];
    if (defaultValue && !inputValue) currentTarget.value = defaultValue;
  }

  function handleEdits({ currentTarget: { value: inputValue, name: key } }) {
    if (!inputValue) return;
    const payload = { ...factor, [key]: inputValue || defaultValue, parentName };
    dispatch('update', payload);
  }

  function handleLabelUpdate({ currentTarget: { value: inputValue }}) {

  }

  function toggleDelete() {
    dispatch(undo ? 'restore' : 'delete', { factor, parentName });
    undo = !undo;
    if (!factor.name) undo = false;
  }

  onMount(() => {
    if (!factor.name) labelInput.focus();
  })
</script>

<div class="factor">
  <input bind:this={labelInput} name="label" class="title input" type="text" placeholder={initialValues.label || "New Factor"} value={factor.label} on:focus={selectOnFocus} on:blur={handleBlur} on:change={handleEdits} style={edit ? 'pointer-events:auto' : 'pointer-events:none'} />
  <div class="components">
    <input name="value" class="numeric input" type="text" inputmode="numeric" placeholder={initialValues.value} value={factor.value} on:focus={selectOnFocus} on:blur={handleBlur} on:change={handleEdits
} style={edit ? 'pointer-events:auto' : 'pointer-events:none'} />
    <input name="unit" class="unit input" type="text" placeholder={initialValues.unit} value={factor.unit} on:focus={selectOnFocus} on:blur={handleBlur} on:change={handleEdits
} style={edit ? 'pointer-events:auto' : 'pointer-events:none'} />
  </div>
  {#if edit}
    <button class='button-action' on:click={toggleDelete}>
      <img src={undo ? 'undo.svg' : 'trash-2.svg'} />
    </button>
    {#if undo}
      <div class="strikethrough"></div>
    {/if}
  {/if}
</div>

<style>
  .factor {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    /* padding-left: 8px; */
    flex-wrap: nowrap;
    /* width: 90%; */
    /* margin-left: -1rem; */
  }

  .components {
    display: flex;
    flex-direction: row;
    max-width: 16rem;
  }

  .title {
    min-width: 50%;
    max-width: 8rem;
  }

  .numeric {
    text-align: right;
    max-width: 3.5rem;
    margin-right: 0;
    padding-right: 0;
  }

  .numeric:focus {
    margin-right: 1px;
    padding-right: 4px;
  }

  .unit {
    max-width: 2rem;
    margin-left: 0;
    padding-left: 0;
  }

  .unit:focus {
    margin-left: 1px;
    padding-left: 4px;
  }

  .strikethrough {
    position: absolute;
    width: 85%;
    border: 1.5px solid #0006;
    height: 1px;
    bottom: 1.15rem;
    left: 0.25rem;
    padding: 0 1rem;
  }

  input {
    font-size: 1rem;
    font-weight: 300;
  }

  button {
    position: relative;
    /* right: -0.75rem; */
    display: flex;
    align-items: center;
    justify-content: center;
    height: 42px;
    width: 42px;
    border: none;
    background: #0000;
    opacity: 50%;
  }
</style>