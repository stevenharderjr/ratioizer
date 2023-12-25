// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
		interface Factor {
			name?: string;
			label: string;
			value: number;
			unit: string | 'g';
			parentName?: string;
			parentLabel?: string;
		}

		interface Ratio {
			name?: string;
			label?: string;
			factors: Factor[] | [];
		}

		type RatioFlag = Ratio | undefined;
		type FactorFlag = Factor | undefined;
	}
}

export {};
