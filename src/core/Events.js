import { capitalize } from "./components/Table/utils";


export class Events {
	constructor($root, listners = []) {
		if (!$root) {
			throw new Error(`No root provided for Events!`);
		}
		this.$root = $root;
		this.listners = listners;
	}

	addEventListener() {
		this.listners.forEach((listner) => {
			const method = capitalize(listner);
			if (!this[method]) {
				throw new Error(
					`Method ${method} is not implemented in ${this.name || ''} Component`
				);
			}
			this[method] = this[method].bind(this);
			this.$root.on(listner, this[method]);
		});
	}

	removeEventListener() {
		this.listners.forEach((listner) => {
			const method = capitalize(listner);
			this.$root.off(listner, this[method]);
		});
	}
}
