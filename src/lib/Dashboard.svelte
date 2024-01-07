<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Confirm from '$lib/Confirm.svelte';
	import Ratio from '$lib/Ratio.svelte';
	import EditRatio from '$lib/EditRatio.svelte';
	import UseRatio from '$lib/UseRatio.svelte';
	import { ratios, newRatio } from '../stores';
	import Toast from '../toast';
	const dispatch = createEventDispatcher();

	let using: App.RatioFlag = undefined;
	let editing: App.RatioFlag = undefined;
	let deleting: App.RatioFlag = undefined;
	let partialRatio: App.RatioFlag = undefined;

	console.log(crypto);

	function addRatio() {
		if (editing) return;

		editing = newRatio();
		$ratios = [...$ratios, editing];
	}

	function updateFactor({ detail: { parentName, label, value, unit } }: { detail: App.Factor }) {
		const name = label.toLowerCase();
	}

	function getConfirmation({ detail: ratio }: { detail: App.Ratio }) {
		deleting = ratio;
	}

	function useRatio({ detail: ratio }: { detail: App.Ratio }) {
		editing = undefined;
		using = ratio;
	}

	function updateRatio({ detail: update }: { detail: App.Ratio }) {
		let rename = update.label!.toLowerCase();
		if (!update.name) {
			$ratios.pop();
			// must be a new ratio
			console.log('add', rename);
			$ratios = [...$ratios, { ...update, name: rename }];
		} else if (rename === update.name) {
			// no name change, so just record other changes
			console.log('update', rename);
			$ratios = $ratios.map((ratio) => (ratio.name === rename ? update : ratio));
		} else {
			// ratio has been renamed
			console.log(`rename ${update.name} to ${rename}`);
			$ratios = $ratios.map((ratio) =>
				ratio.name === update.name ? { ...update, name: rename } : ratio
			);
		}

		editing = undefined;
	}

	function resetRatio({ detail: initialRatio }: { detail: App.Ratio }) {
    const { id: resetId } = editing;
		$ratios = $ratios.map(ratio => (ratio.id === resetId ? editing : ratio));
	}

	function editRatio({ detail: ratio }: { detail: App.Ratio }) {
		using = undefined;
		editing = { ...ratio };
	}

	function deleteRatio() {
		const deleteName = deleting!.name;
		$ratios = $ratios.filter(({ name }) => name !== deleteName);
		cancel();
	}

	function cancel() {
		deleting = undefined;
		partialRatio = undefined;
		using = undefined;
		editing = undefined;
	}
</script>

<div class="ratios">
	{#each $ratios as ratio}
		{#if using?.name === ratio.name}
			<UseRatio {ratio} on:close={cancel} />
		{:else if editing?.name === ratio.name}
			<EditRatio
				{ratio}
				on:update={updateRatio}
				on:close={cancel}
				on:reset={resetRatio}
				on:delete={getConfirmation}
			/>
		{:else}
			<Ratio {ratio} on:use={useRatio} on:edit={editRatio} />
		{/if}
	{/each}
</div>

{#if deleting}
	<Confirm
		question={`Delete "${deleting.label}"?`}
		on:confirm={deleteRatio}
		on:reject={() => (deleting = undefined)}
	/>
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
		pointer-events: auto;
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
