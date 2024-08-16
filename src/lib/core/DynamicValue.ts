import type { DynamicNumber } from './types';

export class DynamicValue implements DynamicNumber {
	offset: number = 0;
	multiplier: number = 1;

	constructor(public base: number = 0) {}

	add(amount: number): void {
		this.offset += amount;
	}

	multiply(amount: number): void {
		this.multiplier *= amount;
	}

	getTotal(): number {
		return (this.base + this.offset) * this.multiplier;
	}

	toString(): string {
		return this.getTotal().toFixed(1);
	}
}
