import { writable } from 'svelte/store';

export const ratios = writable({
	'cup of coffee': {
		label: 'Cup of Coffee',
		factors: [
			{
				id: 0,
				name: 'coffee',
				label: 'Coffee',
				value: 200,
				unit: 'g'
			},
			{
				id: 1,
				name: 'half & half',
				label: 'Half & Half',
				value: 150,
				unit: 'g'
			},
			{
				id: 2,
				name: 'sugar',
				label: 'Sugar',
				value: 20,
				unit: 'g'
			}
		]
	},
	'pot of coffee': {
		label: 'Pot of Coffee',
		factors: [
			{
				id: 0,
				name: 'coffee grounds',
				label: 'Coffee Grounds',
				value: 36,
				unit: 'g'
			},
			{
				id: 1,
				name: 'water',
				label: 'Water',
				value: 1140,
				unit: 'g'
			}
		]
	}
});

export const newRatio = {
	'new ratio': {
		label: 'New Ratio',
		factors: [
			{
				id: 0,
				name: 'new factor',
				label: 'New Factor',
				value: '',
				unit: 'g'
			}
		]
	}
};

export const toasts = writable([]);

export const blur = writable(false);

export const editing = writable('');

// export const use = writable(false);
