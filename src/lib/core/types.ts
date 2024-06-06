import type { DamageValue } from '$lib/types';

export type Mutation = {
  from: { [0]: number; [1]: number };
  to: { [0]: number; [1]: number };
}

export type Maybe<T> = T | null | undefined;

export type FlatNumber = { value: number; type: 'flat' };
export type PercentageNumber = { value: number; type: 'percentual' };
export type DamageNumber = { value: DamageValue; type: 'damage' };