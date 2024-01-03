<button class="x-button" on:click|stopPropagation aria-label="Back to overview">
	<svg aria-hidden="true" viewBox="0 0 2.5 2.5">
		<path d="M0.5,0.5 L2,2 M0.5,2 L2,0.5" />
	</svg>
</button>

<style>
	button {
		position: absolute;
		width: 1.5rem;
		height: 1.5rem;
		background: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 0;
		touch-action: manipulation;
		pointer-events: auto;
		top: 0.5rem;
		right: 0.5rem;
	}

	svg {
		width: 100%;
		height: 100%;
	}

	path {
		vector-effect: non-scaling-stroke;
		stroke-width: 2px;
		stroke: #666;
	}
</style>
