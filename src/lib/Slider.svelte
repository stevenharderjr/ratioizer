<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let factor = {};
  const min = Math.round(factor.value * 0.25);
  const max = Math.round(factor.value * 1.75);

  function handleChange({ currentTarget: { value }}) {
    dispatch('update', { name: factor.name, value });
  }
</script>

<div class="factor">
  <span class="label">{factor.label}</span>
  <div>
    <span class="value">{Math.round(factor.value)}</span>
    <span class="unit">{factor.unit}</span>
  </div>
</div>
<input class="slider" type="range" {min} {max} value={factor.value} on:input={handleChange} />

<style>
  .factor {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-right: 1rem;
  }
  .label, .value, .unit {
    font-size: 1rem;
    font-weight: 300;
  }

  .label {
    margin-right: 1rem;
  }

  input {
    margin-bottom: 1.5rem;
  }
</style>