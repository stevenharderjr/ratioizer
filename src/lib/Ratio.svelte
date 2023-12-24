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
  let factors = ratio.factors.sort(({ value: a }, { value: b }) => (a > b ? -1 : (a < b ? 1 : 0)));

  function use() {
    dispatch('use', ratio.name);
  }

  function edit() {
    dispatch('edit', ratio.name);
  }
</script>

<div class="floating ratio" on:click={use} aria-hidden="true">
  <div class="label-bar">
    <span class="label">{ratio.label}</span>
  </div>
  <div class="factors">
    {#each factors as factor}
      <Factor parentName={ratio.name} parentLabel={ratio.label} factor={factor} />
    {/each}
  </div>

  <div class="options">
    <button class="option-button" on:click|stopPropagation={edit}>
      <img src="edit.svg" />
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
    padding: 10px 14px;
  }
  input {

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
    display: flex;
    flex-direction: column;
    padding: 1rem 4.25rem 1rem 0.5rem;
    width: 100%;
    gap: 0.5rem;
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
    font-size: 1.25rem;
    font-weight: 500;
    flex: 1;
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