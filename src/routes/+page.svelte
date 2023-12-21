<script>
  import { onMount } from 'svelte';
  import Dashboard from '$lib/Dashboard.svelte';
  import Use from '$lib/Use.svelte';
  import Edit from '$lib/Edit.svelte';
  import { ratios } from '../stores';
  import Toast from '../toast';

  let using = '';
  let editing = '';

  function useRatio({ detail }) {
    console.log('selection:', detail);
    using = detail.name;
  }

  function updateRatio({ detail }) {
    console.log(detail);
  }

  function editRatio({ detail: name }) {
    editing = name;
  }

  function cancel() {
    using = '';
    editing = '';
  }

  function deleteRatio({ detail: name }) {
    delete $ratios[name];
  }

  // onMount(() => Toast.add({ message: 'Hello World!', type: 'error', title: 'Error Example' }));

</script>

{#if !using}
  <Dashboard on:selection={useRatio} />
{:else if !editing}
  <Use ratio={$ratios[using]} on:close={cancel} />
{:else}
  <Edit detail={$ratios[editing]} on:update={updateRatio} on:cancel={cancel} />
{/if}