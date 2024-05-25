import { scaleValue } from '$lib';
import { DamageValue, PercentageValue } from './helpers';
import type { AttributeScaling, AttributeState } from './types';

export type ItemAttribute<T = unknown> = {
  readonly name: string;
  readonly affects: string;
  readonly tier: number;

  applyAttributeChange(attrs: AttributeState): void;
  get value(): T;
}

export class FlatValueAttribute implements ItemAttribute<number> {
  private scalingValue = 0;

  constructor(
    readonly name: string,
    readonly affects: string,
    private values: number[], 
    readonly tier: number = 0,
    private scaling?: AttributeScaling
  ) {}

  applyAttributeChange(attrs: AttributeState): void {
    if(this.scaling && attrs[this.scaling.attr] > 0) {
      this.scalingValue = scaleValue(attrs[this.scaling.attr], this.scaling.span, this.scaling.rate)
    }
  }

  get value(): number {
    return this.values[this.tier] + this.scalingValue;
  }
}

export class PercentageValueAttribute implements ItemAttribute<PercentageValue> {
  constructor(
    readonly name: string,
    readonly affects: string,
    private values: number[], 
    readonly tier: number = 0,
    private scaling?: AttributeScaling
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyAttributeChange(attrs: AttributeState): void {
    
  }

  get value(): PercentageValue {
    return new PercentageValue(this.values[this.tier]);
  }
}

export class FlatDamageAttribute implements ItemAttribute<DamageValue> {
  private scalingValue = 0;

  constructor(
    readonly name: string,
    readonly affects: string,
    private values: (number[])[], 
    readonly tier: number = 0,
    private scaling?: AttributeScaling
  ) {}

  applyAttributeChange(attrs: AttributeState): void {
    if(this.scaling && attrs[this.scaling.attr] > 0) {
      this.scalingValue = scaleValue(attrs[this.scaling.attr], this.scaling.span, this.scaling.rate)
    } else {
      this.scalingValue = 0;
    }
  }

  get value(): DamageValue {
    return new DamageValue([this.values[this.tier][0] + this.scalingValue, this.values[this.tier][1] + this.scalingValue]);
  }
}

export class PercentageDamageAttribute implements ItemAttribute<PercentageValue> {
  constructor(
    readonly name: string,
    readonly affects: string,
    private values: number[], 
    readonly tier: number = 0,
    private scaling?: AttributeScaling
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyAttributeChange(attrs: AttributeState): void {
    
  }

  get value(): PercentageValue {
    return new PercentageValue(this.values[this.tier]);
  }
}