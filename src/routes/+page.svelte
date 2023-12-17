<script>
  import { onMount } from 'svelte';
  import Dashboard from '$lib/Dashboard.svelte';
  import Ratio from '$lib/Ratio.svelte';
  import Edit from '$lib/Edit.svelte';
  import { ratios } from '../stores';
  import Toast from '../toast';

  let using = '';
  let editing = '';

  function useRatio({ detail: name }) {
    using = name;
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
  <Dashboard on:select={useRatio} />
{:else if !editing}
  <Ratio detail={$ratios[editing]} on:edit={editRatio} on:delete={deleteRatio} on:cancel={cancel} />
{:else}
  <Edit detail={$ratios[editing]} on:update={updateRatio} />
{/if}