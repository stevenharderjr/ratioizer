<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import selectOnFocus from '$lib/utils/selectOnFocus';
	import Toast from '../toast';
	const dispatch = createEventDispatcher();
	export let factor: App.Factor = { label: '', value: 0, unit: 'g' };
	export let disabled = false;
	let labelInput, valueInput;
	const initialValues = { softDelete: false, ...factor };

	function handleBlur({ currentTarget }) {
		const { value: inputValue, name: key } = currentTarget;
		const defaultValue = initialValues[key];
		if (defaultValue && !inputValue) currentTarget.value = defaultValue;
	}

	function handleFocus({ currentTarget }) {
		currentTarget.value = '';
	}

	function handleEdits({ currentTarget: { value: inputValue, name: key } }) {
		if (!inputValue && inputValue !== false) return;
		if (key === 'value') inputValue = +inputValue;
		const payload = {
			...factor,
			[key]: inputValue || inputValue === false ? inputValue : initialValues[key]
		};
		dispatch('update', payload);
	}

	function toggleDelete() {
		handleEdits({ currentTarget: { value: !factor.softDelete, name: 'softDelete' } });
	}

	function handleKeyPress({ currentTarget, key }) {
		if (key === 'esc') currentTarget.blur();
		if (key === 'Enter') {
			handleEdits({ currentTarget });
		}
	}

	onMount(() => {
		if (!factor.name) labelInput.focus();
	});
</script>

<div class="factor">
	<input
		bind:this={labelInput}
		name="label"
		class="title input"
		type="text"
		placeholder={initialValues.label || 'Factor Name'}
		value={factor.label}
		on:focus={handleFocus}
		on:blur={handleBlur}
		on:change={handleEdits}
		on:keypress={handleKeyPress}
		disabled={factor.softDelete}
		title="edit factor name"
	/>
	<div class="components">
		<input
			bind:this={valueInput}
			name="value"
			class="numeric input"
			type="text"
			inputmode="numeric"
			placeholder={initialValues.value}
			value={factor.value}
			on:focus={handleFocus}
			on:blur={handleBlur}
			on:change={handleEdits}
			on:keypress={handleKeyPress}
			disabled={factor.softDelete}
			title="edit quantity"
		/>
		<input
			name="unit"
			class="unit input"
			type="text"
			placeholder={initialValues.unit}
			value={factor.unit}
			on:focus={handleFocus}
			on:blur={handleBlur}
			on:change={handleEdits}
			on:keypress={handleKeyPress}
			disabled={factor.softDelete}
			title="edit unit of measure"
		/>
	</div>
	{#if factor.softDelete}
		<button class="button-action" on:click={toggleDelete} title={'restore this factor'}>
			<img src="undo.svg" alt="right to left u-turn arrow" />
		</button>
		<div class="strikethrough"></div>
	{:else}
		<button class="button-action" on:click={toggleDelete} title={'remove this factor'}>
			<img src="trash-2.svg" alt="trash can" />
		</button>
	{/if}
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
		justify-content: flex-end;
		width: 100%;
		flex-shrink: 2;
	}

	.title {
		width: 100%;
		max-width: 20rem;
		flex-grow: 2;
	}

	.numeric {
		text-align: right;
		max-width: 3rem;
		margin-right: 0;
		padding-right: 0;
	}

	.numeric:focus {
		margin-right: 1px;
		padding-right: 4px;
		padding-left: 0;
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

	.strikethrough {
		position: absolute;
		width: 85%;
		border: 1.5px solid #0006;
		height: 1px;
		bottom: 1.15rem;
		left: 0.25rem;
		padding: 0 1rem;
	}

	.button-action {
		cursor: pointer;
	}

	input {
		font-size: 1rem;
		font-weight: 300;
	}

	button {
		position: relative;
		/* right: -0.75rem; */
		display: flex;
		align-items: center;
		justify-content: center;
		height: 42px;
		width: 42px;
		border: none;
		background: #0000;
		opacity: 50%;
		pointer-events: auto;
	}
</style>
