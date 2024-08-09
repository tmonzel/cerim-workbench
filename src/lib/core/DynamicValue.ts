export class DynamicValue {
	protected _offset: number = 0;
	protected _added: number = 0;
	protected _multiplier: number = 1;

	get offset(): number {
		return this._offset;
	}

	constructor(public base: number = 0) {}

	add(amount: number): void {
		this._added += amount;
	}

	multiply(amount: number): void {
		this._multiplier *= amount;
	}

	getTotal(): number {
		return (this.base + this._offset + this._added) * this._multiplier;
	}

	toString(): string {
		return this.getTotal().toFixed(1);
	}
}
