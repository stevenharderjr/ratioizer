import { writable } from 'svelte/store';

export const ratios = writable<App.Ratio[]>([
	{
		id: '0',
		name: 'cup of coffee',
		label: 'Cup of Coffee',
		factors: [
			{
				id: '0',
				name: 'coffee',
				label: 'Coffee',
				value: 200,
				unit: 'g'
			},
			{
				id: '1',
				name: 'half & half',
				label: 'Half & Half',
				value: 150,
				unit: 'g'
			},
			{
				id: '2',
				name: 'sugar',
				label: 'Sugar',
				value: 20,
				unit: 'g'
			}
		]
	},
	{
		id: '1',
		name: 'pot of coffee',
		label: 'Pot of Coffee',
		factors: [
			{
				id: '0',
				name: 'coffee grounds',
				label: 'Coffee Grounds',
				value: 36,
				unit: 'g'
			},
			{
				id: '1',
				name: 'water',
				label: 'Water',
				value: 1140,
				unit: 'g'
			}
		]
	}
]);

export const newRatio = () => ({
	id: crypto.randomUUID(),
	label: '',
	factors: []
});

export const newFactor = () => ({
	id: crypto.randomUUID(),
	label: '',
	value: 1,
	unit: ''
});

export const toasts = writable([]);

export const blur = writable(false);

export const editing = writable<App.RatioFlag>();

export const using = writable<App.RatioFlag>();

// export const use = writable(false);
