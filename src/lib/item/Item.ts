import { AttributeType, type DamageNegation, type Resistance, type UpgradeSchema } from '$lib/core/types';
import { ItemModifier } from './ItemModifier';
import type { ItemCategory, ItemConfig, ItemData, ItemModifierData, ItemRequirements, ModifierType } from './types';

export abstract class Item {
  readonly type: string;
  readonly name: string;
  readonly group: string;
  readonly weight: number;
  readonly category: ItemCategory;

  tier: number;
  possibleUpgrades: number;
  requirements: ItemRequirements;
  
  config!: ItemConfig;
  resistance?: Resistance;
  damageNegation?: DamageNegation;
  
  upgradeSchema?: UpgradeSchema;
  modifiers: ItemModifier[] = [];
  iconUrl?: string;
  description?: string;
  effects?: string[];

  protected _modified = false;

  get modified(): boolean {
    return this._modified;
  }

  constructor(
    readonly id: string, 
    protected data: ItemData,
  ) {
    this.type = data.type;
    this.name = data.name;
    this.group = data.group;
    this.category = data.category;
    this.tier = data.tier ?? 0;
    this.iconUrl = data.iconUrl;
    this.weight = data.weight ?? 0;
    this.possibleUpgrades = data.upgrades ? data.upgrades.length : 0;
    this.description = data.description;
    this.requirements = data.requirements ?? {};
    this.effects = data.effects;
    this.damageNegation = data.damageNegation;
    this.resistance = data.resistance;

    if(data.modifiers) {
      this.setModifiers(data.modifiers);
    }
  }

  setConfig(config: ItemConfig): void {
    this.config = config;
    this.update();
  }

  abstract update(): void;

  setModifiers(modifiers: Record<ModifierType, ItemModifierData>): void {
    const newModifiers: ItemModifier[] = [];

    for(const [type, data] of Object.entries(modifiers)) {
      newModifiers.push(new ItemModifier(data, type as ModifierType));
    }

    this.modifiers = newModifiers;
  }

  upgrade(tier: number): void {
    this.tier = tier;
    this._modified = tier !== 0;

    if(this.data.upgrades && this.tier > 0) {
      const upgrade = this.data.upgrades[this.tier - 1];

      if(upgrade.modifiers) {
        this.setModifiers(upgrade.modifiers);
      }
      
      this.iconUrl = upgrade.iconUrl;

    } else {
      if(this.data.modifiers) {
        this.setModifiers(this.data.modifiers);
      }

      this.iconUrl = this.data.iconUrl;
    }

    this.update();
  }

  checkRequirements(attributes: Partial<Record<AttributeType, number>>): boolean {
    if(!this.requirements.attributes) {
      return true;
    }

    for(const [k, v] of Object.entries(this.requirements.attributes)) {
      const type = k as AttributeType;
      const attrValue = attributes[type] ?? 0;

      if(attrValue < v) {
        return false;
      }
    }

    return true;
  }
}