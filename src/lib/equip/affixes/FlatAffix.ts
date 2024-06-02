import { writable, type Invalidator, type Subscriber, type Unsubscriber, type Updater } from 'svelte/store';
import type { ItemAffix } from '../types';

export class FlatAffix implements ItemAffix<number> {
  private store = writable(0);

  constructor(
    readonly id: string,
    readonly name: string,
    private values: number[],
    private _tier: number = 0
  ) { 
    this.setTier(_tier);
  }

  get tier(): number {
    return this._tier;
  }

  setTier(num: number): void {
    this._tier = num;
    this.store.set(this.values[this._tier]);
  }

  set(value: number): void {
    this.store.set(value);
  }

  update(updater: Updater<number>): void {
    this.store.update(updater);
  }

  subscribe(run: Subscriber<number>, invalidate?: Invalidator<number> | undefined): Unsubscriber {
    return this.store.subscribe(run, invalidate);
  }
}