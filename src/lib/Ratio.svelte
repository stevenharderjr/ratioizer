<script>
  import Factor from '$lib/Factor.svelte';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let id = '';
  export let factors = [];
  export let title = "New Ratio"
</script>

<div class="ratio">
  <input class="title" type="text" value={title} />
  <div class="factors">
    {#each factors as factor}
      <Factor id={id + ' item'} title={factor.title} value={factor.value} unit={factor.unit} />
    {/each}
  </div>
</div>

<style>
  .ratio {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 4px;
    border-radius: 8px;
    margin-bottom: 1rem;
    box-shadow: 0 8px 8px 0 #0003;
    background: #fff;
  }
  .title {
    font-size: 1.25rem;
    font-weight: 500;
    border: none;
    padding: 4px 8px;
  }
  .factors {
    padding: 8px 0;
  }
</style>