import type { AttributeValue } from '$lib/types';
import { AttributeType } from '../types';

export class AttributeStat {
  [AttributeType.VIGOR] = 0;
  [AttributeType.ENDURANCE] = 0;
  [AttributeType.STRENGTH] = 0;
  [AttributeType.DEXTERITY] = 0;
  [AttributeType.MIND] = 0;
  [AttributeType.INTELLIGENCE] = 0;
  [AttributeType.FAITH] = 0;
  [AttributeType.ARCANE] = 0;
  
  constructor(value: AttributeValue[] = []) {
    this.set(value);
  }

  set(value: AttributeValue[]): void {
    for(const a of value) {
      this[a[1]] = a[0];
    }
  }

  add(attr: AttributeStat): void {
    for(const t of Object.values(AttributeType)) {
      if(!this[t]) {
        this[t] = 0;
      }
      
      this[t] += attr[t];
    }
  }

  getPresentAttributes(): Partial<Record<AttributeType, number>> {
    const attributes: Partial<Record<AttributeType, number>> = {};

    for(const t of Object.values(AttributeType)) {
      if(this[t] === 0) {
        continue;
      }

      attributes[t] = this[t];
    }

    return attributes;
  }

  getTotal(): number {
    return Object.values(AttributeType).map(t => this[t]).reduce((p, c) => p + c, 0);
  }
}
