import type { AttributeState } from '$lib/attribute.store';
import type { DynamicValue } from '$lib/types';
import type { ItemAffix, ItemDef, ItemType } from '../types';

export class Item {
  readonly weight: DynamicValue<number>;
  readonly scalingFlags: string[];

  constructor(
    protected def: ItemDef, 
    readonly affixes: ItemAffix[] = []
  ) {
    this.weight = { 
      base: this.def.weight, 
      value: this.def.weight 
    };

    this.scalingFlags = (this.def.modifiers ?? []).map(m => m.attr.toUpperCase());
  }

  get group(): string {
    return this.def.group;
  }

  get name(): string {
    return this.def.name;
  }

  get caption(): string {
    return this.def.caption;
  }

  get type(): ItemType {
    return this.def.type;
  }

  get requiredLevel(): number {
    return this.def.requiredLevel;
  }

  get iconUrl(): string | undefined {
    return this.def.iconUrl;
  }

  get description(): string | undefined {
    return this.def.description;
  }

  applyAttributeChange(state: AttributeState): void {
    
  }
}