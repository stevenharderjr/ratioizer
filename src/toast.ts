import { toasts } from './stores.ts';

class Toaster {
	constructor() {
		this.count = 0;
	}

	add(options) {
		if (typeof options === 'string') options = { message: options };
		const id = this.count++;
		const defaults = {
			id,
			active: false,
			type: 'info',
			blur: true,
			dismissable: true,
			duration: 2000,
			dismiss: () => this.dismiss(id)
		};

		const t = { ...defaults, ...options };
		toasts.update((all) => (options.replace ? [t] : [...all, t]));

		if (t.duration) t.timeout = setTimeout(t.dismiss, t.duration);

		return id;
	}

	dismiss(toastId) {
		toasts.update((all) =>
			all.filter((t) => {
				if (t.id !== toastId) return true;
				this.count--;
				clearTimeout(t.timeout);
			})
		);
	}
}

const Toast = new Toaster();

export default Toast;
