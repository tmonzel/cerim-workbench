export class DynamicNumber {
	private _base = 0;
	private _multiplier = 1;
	private _totalMultiplier = 1;
	private _offset = 0;
	private _state = {
		flat: 0,
		total: 0,
		modified: false
	};

	get modified(): boolean {
		return this._state.modified;
	}

	get base(): number {
		return this._base;
	}

	get offset(): number {
		return this._offset;
	}

	get multiplier(): number {
		return this._multiplier;
	}

	get totalMultiplier(): number {
		return this._totalMultiplier;
	}

	get total(): number {
		return this._state.total;
	}

	get flat(): number {
		return this._state.flat;
	}

	constructor(base?: number) {
		this.set(base ?? 0);
	}

	set(num: number): void {
		this._base = num;
		this.update();
	}

	add(num: number): void {
		this._base += num;
		this.update();
	}

	addOffset(offset: number): void {
		this._offset += offset;
		this.update();
	}

	addMultiplier(m: number): void {
		this._multiplier += m;
		this.update();
	}

	addTotalMultiplier(m: number): void {
		this._totalMultiplier += m;
		this.update();
	}

	multiply(n: number): void {
		this._multiplier *= n;
		this.update();
	}

	isPresent(): boolean {
		return this._state.total > 0;
	}

	modificationState(): number {
		return this._base / this._state.total;
	}

	private update(): void {
		this._state.flat = this._base + this._offset;
		this._state.total = this._state.flat * this._multiplier * this._totalMultiplier;
		this._state.modified =
			this._multiplier !== 1 || this._totalMultiplier !== 1 || this._offset !== 0;
	}
}
