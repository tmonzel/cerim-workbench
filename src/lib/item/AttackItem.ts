import { calcAttributeScaling, getScalingId, list } from '$lib/core';
import { AffinityType, AttackType, AttributeType, DamageType, GuardType, StatusEffectType, type Attack, type AttributeDamageScaling, type AttributeMutation, type Guard, type UpgradeSchema } from '$lib/core/types';
import { attackCorrectRecord, spEffectsMap, upgradeSchemata } from '$lib/data';
import { affinityRecord, mutationRecord } from '$lib/records';
import { Item } from './Item';
import type { ItemAttackInfo, ItemConfig, ItemData } from './types';

export class AttackItem extends Item {
  attack: Attack = {};
  scaledAttack?: Attack;
  attackInfo: ItemAttackInfo;
  attackSpeed: number;
  statusEffects?: Partial<Record<StatusEffectType, number>>;
  guard: Guard;
  affinities: Map<string, ItemConfig>;
  scaling?: AttributeDamageScaling;

  private attackMutations: Partial<Record<AttackType, AttributeMutation[]>>;
  private _affinity: AffinityType | null;

  get affinity(): AffinityType | null {
    return this._affinity;
  }

  constructor(id: string, data: ItemData) {
    super(id, data);

    this.attackMutations = {};
    this.attackSpeed = data.attackSpeed ?? 1;
    this.guard = data.guard ?? { phy: 0, mag: 0, fir: 0, lit: 0, hol: 0, sta: 0, res: 0 };
    this.affinities = new Map(Object.entries(data.affinities ?? {}));
    this._affinity = null;

    this.attackInfo = { 
      crit: 100, 
      damage: [DamageType.STANDARD], 
      ...data.attackInfo 
    }

    if(data.config) {
      this.setConfig(data.config);
    }
  }

  getAvailableAffinities(): { name: string; value: string }[] {
    return Array.from(this.affinities.keys()).map(key => ({ name: affinityRecord[key].name, value: key }));
  }

  getScalingFlags(): { attr: AttributeType; id: string }[] {
    return list(this.scaling ?? {}).map(s => {
      return { attr: s.key as AttributeType, id: getScalingId(s.value.base) };
    });
  }

  setAffinity(affinity: AffinityType | null): void {
    let config: ItemConfig;

    if(affinity) {
      config = this.affinities.get(affinity) ?? this.data.config!;
    } else {
      config = this.data.config!;
    }
    
    this._affinity = affinity;
    this._modified = affinity !== AffinityType.STANDARD;
    this.setConfig(config);
  }

  applyScaling(attributes: Partial<Record<AttributeType, number>>): Item {
    if(!this.scaling || !this.attack) {
      return this;
    }
    
    this.scaledAttack = this.scaleDamage(attributes);

    return this;
  }
  
  update(): void {
    if(!this.config) {
      return;
    }

    if(this.config.guard) {
      this.guard = this.config.guard;
    }
    

    if(this.config.mutations) {
      if(typeof this.config.mutations === 'string') {
        for(const t of Object.values(AttackType)) {
          this.attackMutations[t] = mutationRecord[this.config.mutations];
        }
      } else if(Array.isArray(this.config.mutations)) {
        for(const t of Object.values(AttackType)) {
          this.attackMutations[t] = this.config.mutations as AttributeMutation[];
        }
      } else if(typeof this.config.mutations === 'object') {
        for(const t of Object.values(AttackType)) {
          this.attackMutations[t] = this.config.mutations[t] ? mutationRecord[this.config.mutations[t]] : mutationRecord['0'];
        }
      }
    } else {
      for(const t of Object.values(AttackType)) {
        this.attackMutations[t] = mutationRecord['0'];
      }
    }

    if(this.config.apply) {
      this.statusEffects = {};

      for(const id of this.config.apply) {
        const upgradedId = id >= 105000 ? id + this.tier : id;

        if(!spEffectsMap.has(upgradedId)) {
          continue;
        }

        Object.assign(this.statusEffects, spEffectsMap.get(upgradedId));
      }
    }

    const schema: UpgradeSchema = typeof this.config.schema === 'string' ? upgradeSchemata[this.config.schema] : upgradeSchemata['0'];
    
    if(!schema) {
      return;
    }

    this.possibleUpgrades = schema.tiers ?? 25;
    
    
    if(!this.config.attack || !schema.attack) {
      return;
    }

    const attack: Attack = {};
    const guard: Partial<Guard> = {};
    const maxTiers = this.possibleUpgrades;
    const attributeScaling: Partial<Record<AttributeType, { base: number, allowedDamageTypes: AttackType[] }>> = {};

    if(this.possibleUpgrades > 0) {
      for(const t of Object.values(AttackType)) {
        if(!this.config.attack[t] || !schema.attack[t] || maxTiers === 0) {
          continue;
        }
        
        const base = this.config.attack[t]!;
        const multiplier = schema.attack[t][this.tier];
        //const diff = multiplierRange[1] - multiplierRange[0];

        //const multiplier = multiplierRange[0] + this.tier * (diff / maxTiers);
        attack[t] = base * multiplier;
        
      }

      if(schema.guard && this.config.guard) {
        for(const t of Object.values(GuardType)) {
          if(!this.config.guard[t] || maxTiers === 0 || !schema.guard[t]) {
            continue;
          }
          
          const base = this.config.guard[t];
          const multiplierRange = schema.guard[t];
          const diff = multiplierRange[1] - multiplierRange[0];
  
          const multiplier = multiplierRange[0] + this.tier * (diff / maxTiers);
          guard[t] = base * multiplier;
        }

        if(this.guard) {
          this.guard = { ...this.guard, ...guard }
        }
      }

      const scalingAttributes = [
        AttributeType.STRENGTH, 
        AttributeType.DEXTERITY,
        AttributeType.INTELLIGENCE,
        AttributeType.FAITH,
        AttributeType.ARCANE
      ];

      for(const attrType of scalingAttributes) {
        if(!schema.scaling || !schema.scaling[attrType] || !this.config.scaling || !this.config.scaling[attrType]) {
          continue
        }

        const scalingVal = this.config.scaling[attrType];

        let base = 0;
        let allowedDamageTypes: AttackType[] = [];

        if(Array.isArray(scalingVal)) {
          base = scalingVal[0];
          allowedDamageTypes = typeof scalingVal[1] === 'string' ? [scalingVal[1]] : scalingVal[1];
        } else {
          base = scalingVal as number;

          const attackCorrect = attackCorrectRecord[this.config.attackCorrectId ?? '0'];

          switch(attrType) {
            case AttributeType.STRENGTH:
              allowedDamageTypes = attackCorrect.str;
              break;
            case AttributeType.DEXTERITY:
              allowedDamageTypes = attackCorrect.dex;
            break;
            case AttributeType.INTELLIGENCE:
              allowedDamageTypes = [...attackCorrect.int, AttackType.SORCERY];
            break;
            case AttributeType.FAITH:
              allowedDamageTypes = [...attackCorrect.fth, AttackType.INCANTATION];
              break;
            case AttributeType.ARCANE:
              allowedDamageTypes = attackCorrect.arc;
          }
        }

        const multiplierRange = schema.scaling[attrType];
        let multiplier = 1;

        if(multiplierRange.length > 2) {
          multiplier = multiplierRange[this.tier];
        } else {
          const diff = multiplierRange[1] - multiplierRange[0];
          multiplier = multiplierRange[0] + this.tier * (diff / maxTiers);
        }
        
        attributeScaling[attrType] = {
          base: base * multiplier,
          allowedDamageTypes
        };
      }
    }
    
    this.attack = attack;
    this.scaling = attributeScaling;
  }

  private scaleDamage(attributes: Partial<Record<AttributeType, number>>, ignoreRequirements: boolean = false): Attack {
    if(!this.attack || !this.scaling) {
      return {};
    }

    const scaledAttack = { ...this.attack };

    for(const [t, attrScale] of Object.entries(this.scaling)) {
      const attrType = t as AttributeType;

      if(!attributes[attrType] || !this.config.scaling) {
        continue;
      }
      
      const attrTotal = attributes[attrType] ?? 0;
      
      for(const damageType of Object.values(AttackType)) {
        if(!this.attack[damageType] || !attrScale.allowedDamageTypes.includes(damageType)) {
          continue;
        }
        
        const attrScaling = calcAttributeScaling(attrTotal, this.attackMutations[damageType] ?? []) / 100;
        const upgradeScaling = attrScale.base / 100;

        let elementBase = this.attack[damageType] ?? 0;
        elementBase *= attrScaling;
        elementBase *= upgradeScaling;

        if(this.config.cast === 'sorceries' && attrType === AttributeType.INTELLIGENCE) {
          if(this.checkRequirements(attributes) || ignoreRequirements) {
            scaledAttack[AttackType.SORCERY] = (1 + (upgradeScaling * attrScaling)) * 100;
          } else {
            scaledAttack[AttackType.SORCERY] = 60;
          }
        } else if(this.config.cast === 'incantations' && attrType === AttributeType.FAITH) {
          if(this.checkRequirements(attributes) || ignoreRequirements) {
            scaledAttack[AttackType.INCANTATION] = (1 + (upgradeScaling * attrScaling)) * 100;
          } else {
            scaledAttack[AttackType.INCANTATION] = 60;
          }
        } else if(scaledAttack[damageType] !== undefined) {
          scaledAttack[damageType]! += elementBase;
        }
      }
    }

    return scaledAttack
  }
}