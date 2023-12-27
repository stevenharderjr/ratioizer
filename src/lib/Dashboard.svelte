<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Confirm from '$lib/Confirm.svelte';
  import Ratio from '$lib/Ratio.svelte';
  import EditRatio from '$lib/EditRatio.svelte';
  import UseRatio from '$lib/UseRatio.svelte';
  import { ratios } from '../stores'
  import Toast from '../toast';
  const dispatch = createEventDispatcher();

  let using: App.RatioFlag = undefined;
  let editing: App.RatioFlag = undefined;
  let deleting: App.RatioFlag = undefined;
  let partialRatio = false;

  function addRatio() {
    Toast.add({ blur: false, message: 'Should add a new ratio', duration: 1000, dismissable: false });
    // ratios.update(all => [newRatio, ...all]);
  }

  function updateFactor({ detail: { parentName, label, value, unit } }: { detail: App.Factor }) {
    const name = label.toLowerCase();

  }

  function awaitConfirmation({ detail: ratio }: { detail: App.Ratio }) {
    deleting = ratio;
  }

  function useRatio({ detail: ratio }: { detail: App.Ratio }) {
    editing = undefined;
    using = ratio;
  }

  function updateRatio({ detail: ratio }: { detail: App.Ratio }) {
    console.log('UPDATE RATIO', ratio);
  }

  function editRatio({ detail: ratio }: { detail: App.Ratio }) {
    using = undefined;
    editing = ratio;
  }

  function deleteRatio() {
    const deleteName = deleting!.name;
    $ratios = $ratios.filter(({ name }) => (name !== deleteName));
    deleting = undefined;
  }

  function cancel() {
    using = undefined;
    editing = undefined;
  }


</script>

<div class="ratios">
  {#each $ratios as ratio}
    {#if using?.name === ratio.name}
      <UseRatio {ratio} on:close={cancel} />
    {:else if editing?.name === ratio.name}
      <EditRatio {ratio} on:update={updateRatio} on:close={cancel} />
    {:else}
      <Ratio {ratio} on:use={useRatio} on:edit={editRatio} on:delete={awaitConfirmation} />
    {/if}
    {/each}
</div>

{#if deleting}
  <Confirm question={`Delete "${deleting.label}"?`} on:confirm={deleteRatio} on:reject={() => (deleting = undefined)} />
{/if}

<div class="button-container">
  <button on:click={addRatio} aria-label="Add new ratio.">
    <svg aria-hidden="true" viewBox="0 0 1 1">
      <path d="M0,0.5 L1,0.5 M0.5,0 L0.5,1" />
    </svg>
  </button>
</div>

<style>
  .ratios {
    max-width: 100%;
    display: flex;
    flex-direction: column;
  }
  .button-container {
    position: absolute;
    display: flex;
    justify-content: center;
    bottom: 1.5rem;
    pointer-events: none;
    width: 100%;
    padding-bottom: env(safe-area-inset-bottom);
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
