<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let factor = {};
  export let multipliers = [0.25, 1.75];

  const baseline = factor.value;
  $: delta = Math.round(factor.value - baseline);
  $: min = Math.round(baseline * multipliers[0]);
  $: max = Math.round(baseline * multipliers[1]);
  // const min = Math.round(baseline * 0.25);
  // const max = Math.round(baseline * 1.75);

  function handleChange({ currentTarget: { value }}) {
    dispatch('update', { name: factor.name, value });
  }
</script>

{#if factor.label }
  <div class="factor">
    <span class="label">{factor.label}</span>
    <div>
      {#if delta}
        <span class="delta">({delta > 0 ? '+' : ''}{delta})</span>
      {/if}
      <span class="value">{Math.round(factor.value)} {factor.unit}</span>
      <!-- <span class="unit">{factor.unit}</span> -->
    </div>
  </div>
{/if}
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
    white-space: nowrap;
  }

  .label {
    margin-right: 1rem;
  }

  .delta {
    font-size: small;
    font-weight: 300;
    color: #999;
  }

  input {
    margin-bottom: 1.5rem;
  }

</style>