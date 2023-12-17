<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let detail = {};
  export let parentName = '';
  export let parentLabel = '';
  export let id = '';
  export let index = -1;
  export let edit = false;

  function handleUpdate({ currentTarget: { value: inputValue, id } }) {
    dispatch('update', { ...detail, [id]: inputValue, parentName });
  }
</script>

<div class="factor">
  <input name="label" class="title input" type="text" value={detail.label} on:change={handleUpdate} />
  <div class="components">
    <input name="value" class="numeric input" type="text" value={detail.value} on:change={handleUpdate
}/>
    <input name="unit" class="unit input" type="text" value={detail.unit} on:change={handleUpdate
} />
  </div>
</div>

<style>
  .factor {
    display: flex;
    flex-direction: colummn;
    align-items: flex-start;
    padding-left: 8px;
    flex-wrap: wrap;
    font-size: 1rem;
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

  .input {
    color: black;
    padding: 2px 6px;
    margin: 2px;
    border: 2px solid transparent;
    border-radius: 4px;
  }

  .input:focus {
    outline: none !important;
    border: 2px solid #ccc;
  }

  .numeric {
    text-align: right;
    max-width: 4rem;
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
</style>