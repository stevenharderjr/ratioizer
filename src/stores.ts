import { writable } from 'svelte/store';

export const ratios = writable([
	{
		name: 'cup of coffee',
		label: 'Cup of Coffee',
		factors: [
			{
				name: 'coffee',
				label: 'Coffee',
				value: 200,
				unit: 'g'
			},
			{
				name: 'half & half',
				label: 'Half & Half',
				value: 150,
				unit: 'g'
			},
			{
				name: 'sugar',
				label: 'Sugar',
				value: 20,
				unit: 'g'
			}
		]
	},
	{
		name: 'pot of coffee',
		label: 'Pot of Coffee',
		factors: [
			{
				name: 'coffee grounds',
				label: 'Coffee Grounds',
				value: 36,
				unit: 'g'
			},
			{
				name: 'water',
				label: 'Water',
				value: 1140,
				unit: 'g'
			}
		]
	}
]);

export const newRatio = {
	'new ratio': {
		label: 'New Ratio',
		factors: [
			{
				name: '',
				label: '',
				value: 0,
				unit: 'g'
			}
		]
	}
};

export const toasts = writable([]);

export const blur = writable(false);

export const editing = writable('');

export const using = writable('');

// export const use = writable(false);
