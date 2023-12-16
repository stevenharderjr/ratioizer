<script>
  import Ratio from '$lib/Ratio.svelte';

  const defaultRatio =     {
      id: 0,
      title: 'Cup of Coffee',
      factors: [
        {
          id: 0,
          title: 'Coffee',
          value: 200,
          unit: 'g'
        },
        {
          id: 1,
          title: 'Half & Half',
          value: 150,
          unit: 'g'
        },
        {
          id: 2,
          title: 'Sugar',
          value: 20,
          unit: 'g'
        }
      ]
    };

  let ratios = [];

  for (let i = 0; i < 20; i++) {
    ratios[i] = {
      ...defaultRatio,
      id: i
    }
  }

</script>

<div class="ratios">
  {#each ratios as ratio}
    <Ratio id={ratio.id} title={ratio.title} factors={ratio.factors} />
  {/each}
</div>

<style>
  .ratios {
    display: flex;
    flex-direction: column;
    height: fit-content;
  }
</style>
