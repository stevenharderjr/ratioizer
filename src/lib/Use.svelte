<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import Slider from '$lib/Slider.svelte';
	import Factor from './Factor.svelte';
  const dispatch = createEventDispatcher();

  export let ratio = {};
  let factors = [];
  let rangeMultipliers = [0.25, 1.75];
  let lowFactor = ratio.factors[0];
  let valueMap = new Map(ratio.factors.map((factor) => {
      const { name, value } = factor;
      factors.push(factor)
      if (value < lowFactor.value) lowFactor = factor;
      return [name, value];
    }));

  function updateValues({ detail: { name, value } }) {
    const conversionRate = value / valueMap.get(name);
    factors = factors.map((factor, i) => {
      const staticFactor = ratio.factors[i];
      const updatedValue = Math.round(staticFactor.value * conversionRate);
      return { ...staticFactor, value: updatedValue };
    });
  }


  function half() {
    let floor;
    const refactor = factors.map((factor, i) => {
      const value = factors[i].value * 0.5;
      if (!floor || value < floor) floor = value;
      return { ...factor, value };
    });
    if (floor < 1) return;
    factors = refactor;
    const rangeConversion = floor / lowFactor.value;
    rangeMultipliers = [(rangeConversion * 0.25).toPrecision(2), (rangeConversion * 1.75).toPrecision(2)];
  }

  function resetValues() {
    factors = factors.map((factor, i) => ({ ...factor, value: ratio.factors[i].value }));
    const rangeConversion = lowFactor.value / valueMap.get(lowFactor.name);
    rangeMultipliers = [0.25, 1.75];  }

  function double() {
    let floor;
    factors = factors.map((factor, i) => {
      const value = Math.round(factors[i].value * 2);
      if (!floor || value < floor) floor = value;
      return { ...factor, value };
    });
    const rangeConversion = floor / lowFactor.value;
    rangeMultipliers = [(rangeConversion * 0.25).toPrecision(2), (rangeConversion * 1.75).toPrecision(2)];
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
        <button class="x-button" on:click={close} aria-label="Close modal">
          <svg aria-hidden="true" viewBox="0 0 2.5 2.5">
            <path d="M0.5,0.5 L2,2 M0.5,2 L2,0.5" />
          </svg>
        </button>
    </div>
    {#each factors as factor}
      <Slider {factor} multipliers={rangeMultipliers} on:update={updateValues} />
    {/each}
    <div class="shortcuts">
      <button class="shortcut" on:click={half}>
        ½
      </button>
      <button class="shortcut" on:click={resetValues}>
        Reset
      </button>
      <button class="shortcut" on:click={double}>
        x2
      </button>
    </div>
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .x-button {
    width: 1.5rem;
    height: 1.5rem;
    background: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 0;
		touch-action: manipulation;
		font-size: 2rem;
    pointer-events: auto;
    margin-right: -0.25rem;
    /* margin-top: -0.15rem; */
  }
  svg {
		width: 100%;
		height: 100%;
	}

	path {
		vector-effect: non-scaling-stroke;
		stroke-width: 2px;
		stroke: #666;
	}

  .shortcuts {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .shortcut {
    padding: 0.5rem 1rem;
    background: #666;
    color: #fff;
    font-size: 1rem;
    margin: 0 0.5rem;
    border: none;
    border-radius: 4px;
  }
</style>