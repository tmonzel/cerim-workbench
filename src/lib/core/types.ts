export type Mutation = {
  from: { [0]: number; [1]: number };
  to: { [0]: number; [1]: number };
}

export type Maybe<T> = T | null | undefined;

export type DynamicValue<T = number> = {
  multiplier: number;
  added: T[];

  set(v: T): void;
  isModified(): boolean;
  getAdded(): T;
  getTotal(): T;
}

export type Stat<T = number> = {
  label: string;
  value: DynamicValue<T>;
}