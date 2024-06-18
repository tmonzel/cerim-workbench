import type { FlatDamage } from './values/FlatDamage';
import type { FlatResistance } from './values/FlatResistance';

export type Mutation = {
  from: { [0]: number; [1]: number };
  to: { [0]: number; [1]: number };
}

export type Maybe<T> = T | null | undefined;

export type DynamicValue<T = number | FlatDamage | FlatResistance> = {
  base: T;
  added: T;
  multiplier: number;

  addModifier(m: PercentualModifier | FlatModifier<T>): void;
  isModified(): boolean;
  getValue(): T;
}

export type Stat<T = number> = {
  label: string;
  value: DynamicValue<T>;
}

export type Modifier<T = number | FlatDamage | FlatResistance> = FlatModifier<T> | PercentualModifier;

export type FlatModifier<T = number | FlatDamage | FlatResistance> = {
  type: 'add';
  value: T;
}

export type PercentualModifier = {
  type: 'multiply';
  value: number;
}
