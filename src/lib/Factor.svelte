<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let factor = {};
  export let parentName = '';
  export let parentLabel = '';
  export let id = '';
  export let index = -1;
  export let edit = false;
  let undo = false;

  function handleUpdate({ currentTarget: { value: inputValue, id } }) {
    dispatch('update', { ...factor, [id]: inputValue, parentName });
  }

  function toggleDelete() {
    dispatch(undo ? 'restoreFactor' : 'deleteFactor', { factor, parentName });
    undo = !undo;
  }
</script>

<div class="factor">
  <input name="label" class="title input" type="text" value={factor.label} on:change={handleUpdate} style={edit ? 'pointer-events:auto' : 'pointer-events:none'} />
  <div class="components">
    <input name="value" class="numeric input" type="text" value={factor.value} on:change={handleUpdate
} style={edit ? 'pointer-events:auto' : 'pointer-events:none'} />
    <input name="unit" class="unit input" type="text" value={factor.unit} on:change={handleUpdate
} style={edit ? 'pointer-events:auto' : 'pointer-events:none'} />
  </div>
  {#if edit}
    <button class='button-action' on:click={toggleDelete}>
      <img src={undo ? 'undo.svg' : 'trash.svg'} />
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
    align-items: flex-start;
    padding-left: 8px;
    flex-wrap: wrap;
    font-size: 1.25rem;
    width: fit-content;
  }

  .components {
    display: flex;
    flex-direction: row;
    max-width: 16rem;
    font-size: 1rem;
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
    border: 0.5px solid black;
    height: 1px;
    bottom: 0.75rem;
    left: 1rem;
    padding: 0 1rem;
  }

  button {
    position: absolute;
    right: -20px;
    top: 2px;
    border: none;
    background: #0000;
    opacity: 60%;
  }
</style>