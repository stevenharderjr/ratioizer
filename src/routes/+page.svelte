<script>
  import { onMount } from 'svelte';
  import Dashboard from '$lib/Dashboard.svelte';
  import Use from '$lib/Use (old).svelte';
  import Edit from '$lib/Edit.svelte';
  import { ratios } from '../stores';
  import Toast from '../toast';

  let using = '';
  let editing = '';

  function useRatio({ detail: { name } }) {
    editing = '';
    using = name;
  }

  function updateRatio({ detail }) {
    console.log('UPDATE RATIO', detail);
  }

  function editRatio({ detail }) {
    using = '';
    editing = detail;
  }

  function cancel() {
    using = '';
    editing = '';
  }

  function deleteRatio({ detail: { name } }) {
    delete $ratios[name];
  }

  // onMount(() => Toast.add({ message: 'Hello World!', type: 'error', title: 'Error Example' }));

</script>

<svelte:head>
  <title>Ratioizer</title>
</svelte:head>

<!-- {#if !using} -->
  <Dashboard {editing} {using} on:use={useRatio} on:edit={editRatio} on:close={cancel} on:delete={deleteRatio} />
<!-- {:else if !editing}
  <Use ratio={$ratios[using]} on:close={cancel} />
{:else}
  <Edit detail={$ratios[editing]} on:update={updateRatio} on:cancel={cancel} />
{/if} -->