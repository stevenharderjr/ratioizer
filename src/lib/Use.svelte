<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import Slider from '$lib/Slider.svelte';
  const dispatch = createEventDispatcher();

  export let ratio = {};
  let factors = [];
  let valueMap = new Map(ratio.factors.map((factor) => {
      factors.push(factor)
      return [factor.name, factor.value];
    }));

  function updateValues({ detail: { name, value } }) {
    const conversionRate = value / valueMap.get(name);
    factors = factors.map((factor, i) => {
      const staticFactor = ratio.factors[i];
      return { ...staticFactor, value: staticFactor.value * conversionRate };
    });
  }

  function close() {
    // restore stored values
    dispatch('close');
  }
</script>

<div class="backdrop" on:click|self={close}>
  <div class="floating container">
    <div class="title-bar">
      <h2>{ratio.label}</h2>
    </div>
    {#each factors as factor}
      <Slider {factor} on:update={updateValues} />
    {/each}
  </div>
</div>

<style>
  h2 {
    margin-bottom: 1rem;
  }
  .backdrop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .container {
    display: flex;
    flex-direction: column;
    width: 20rem;
    max-width: 96vw;
    background: #fff;
    border-radius: 8px;
    padding: 0.75rem 1rem;
  }
  .title-bar {
    margin-bottom: 1rem;
  }
</style>