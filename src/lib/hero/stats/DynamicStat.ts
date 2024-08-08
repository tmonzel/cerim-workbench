export abstract class DynamicStat {
	protected _offset: number = 0;
	protected _added: number = 0;
	protected _multiplier: number = 1;

	get base(): number {
		return this._base;
	}

	get offset(): number {
		return this._offset;
	}

	constructor(protected _base: number = 0) {}

	add(amount: number): void {
		this._added += amount;
	}

	multiply(amount: number): void {
		this._multiplier *= amount;
	}

	getTotal(): number {
		return (this._base + this._offset + this._added) * this._multiplier;
	}

	toString(): string {
		return this.getTotal().toFixed(1);
	}
}
