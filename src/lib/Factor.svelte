<script>
  export let factor = {};
  const initial = { ...factor };
  $: delta = factor.value - initial.value;
</script>

<div class="factor">
  <span class="label">{factor.label}</span>
  <div class="components">
    {#if delta}
      <span class="delta">({delta > 0 ? '+' : ''}{delta})</span>
    {/if}
    <span class="value">{factor.value}</span>
    <span class="unit">{factor.unit}</span>
  </div>
</div>

<style>
  .factor {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    /* padding-left: 8px; */
    flex-wrap: nowrap;
    /* width: 90%; */
    /* margin-left: -1rem; */
  }

  .components {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    max-width: 16rem;
    gap: 4px;
  }

  .label {
    min-width: 50%;
    max-width: 8rem;
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

  .delta {
    position: relative;
    top: -1px;
    font-size: small;
    font-weight: 300;
    color: #999;
    margin-right: 4px;
  }

</style>