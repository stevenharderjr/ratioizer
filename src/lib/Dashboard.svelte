<script>
  import { createEventDispatcher } from 'svelte';
  import Ratio from '$lib/Ratio.svelte';
  import { ratios, newRatio } from '../stores.ts'
  import Toast from '../toast';
  const dispatch = createEventDispatcher();

  function addRatio() {
    ratios.update(all => [newRatio, ...all]);
  }

  function handleSelection({ detail }) {
    dispatch('selection', detail);
  }
</script>

<div class="ratios">
  {#each Object.keys($ratios) as key, i}
    <Ratio index={i} name={key} detail={$ratios[key]} on:selection={handleSelection} />
  {/each}

</div>

<div class="button-container">
  <button on:click={() => {
    Toast.add({ blur: false, message: 'Should add a new ratio', duration: 1000, dismissable: false });
  }} aria-label="Add new ratio.">
    <svg aria-hidden="true" viewBox="0 0 1 1">
      <path d="M0,0.5 L1,0.5 M0.5,0 L0.5,1" />
    </svg>
  </button>
</div>

<style>
  .ratios {
    display: flex;
    flex-direction: column;
    height: fit-content;
  }
  .button-container {
    position: absolute;
    display: flex;
    justify-content: center;
    bottom: 1.5rem;
    pointer-events: none;
    width: 100%;
  }
  button {
    border-radius: 9999px;
    background: #fff9;
    width: 4rem;
    height: 4rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 0;
		touch-action: manipulation;
		font-size: 2rem;
    box-shadow: 0 0 4px 2px #0003;
    backdrop-filter: blur(4px);
    pointer-events: auto;
	}

	svg {
		width: 30%;
		height: 30%;
	}

	path {
		vector-effect: non-scaling-stroke;
		stroke-width: 2px;
		stroke: #444;
	}

</style>
