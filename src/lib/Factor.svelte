<script>
  export let title = 'New Factor';
  export let value = 0;
  export let unit = 'g';
  export let id = '';
  let placeholder = value;
</script>

<div class="factor">
  <input {id} class="title input" type="text" value={title} />
  <div class="components">
    <input id={id + ' value'} class="numeric input" type="text" {value} />
    <input id={id + ' unit'} class="unit input" type="text" value={unit} />
  </div>
</div>

<style>
  .factor {
    display: flex;
    flex-direction: colummn;
    max-width: 100%;
    align-items: flex-start;
    padding-left: 8px;
  }

  .components {
    display: flex;
    flex-direction: row;
    width: 16rem;
  }

  .title {
    font-size: 1rem;
    max-width: 16rem;
  }

  .input {
    flex: 0;
    border: none;
    color: black;
    padding: 4px 8px;
    margin: 2px;
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