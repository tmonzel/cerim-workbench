import { AttackType, AttributeType, DamageType, StatusEffectType, type AttackCorrect, type AttributeMutation, type ScalingBase, type UpgradeSchema } from '$lib/core/types';
import { ItemCategory, type ItemAttackInfo, type ItemConfig, type ItemData, type ItemRequirements } from '$lib/item/types';
import { existsSync } from 'fs';
import { prepareXml } from './helpers';
import { affinityMap, weaponTypeMap } from './maps';
import { EquipModelCategory, SpEffectType, type AttackCorrectParam, type CalcCorrectParam, type ItemRow, type ReinforceParam, type SpEffectParam } from './types';

function mapItemConfig(row: ItemRow): ItemConfig {
  const attack: Partial<Record<AttackType, number>> = {};
  const scaling: ScalingBase = {};
  const mutations: Partial<Record<AttackType, string>> = {};
  const apply: number[] = [];

  if(row.attackBasePhysics) {
    attack.phy = row.attackBasePhysics;
  }

  if(row.attackBaseMagic) {
    attack.mag = row.attackBaseMagic;
  }

  if(row.attackBaseFire) {
    attack.fir = row.attackBaseFire;
  }

  if(row.attackBaseThunder) {
    attack.lit = row.attackBaseThunder;
  }

  if(row.attackBaseDark) {
    attack.hol = row.attackBaseDark;
  }

  if(row.attackBaseStamina) {
    attack.sta = row.attackBaseStamina;
  }

  if(row.correctStrength) {
    scaling.str = row.correctStrength;
  }

  if(row.correctAgility) {
    scaling.dex = row.correctAgility;
  }

  if(row.correctMagic) {
    scaling.int = row.correctMagic;
  }

  if(row.correctFaith) {
    scaling.fth = row.correctFaith;
  }

  if(row.correctLuck) {
    scaling.arc = row.correctLuck;
  }

  if(row.correctType_Physics !== 0) {
    mutations.phy = String(row.correctType_Physics);
  }

  if(row.correctType_Magic !== 0) {
    mutations.mag = String(row.correctType_Magic);
  }

  if(row.correctType_Fire !== 0) {
    mutations.fir = String(row.correctType_Fire);
  }

  if(row.correctType_Thunder !== 0) {
    mutations.lit = String(row.correctType_Thunder);
  }

  if(row.correctType_Dark !== 0) {
    mutations.hol = String(row.correctType_Dark);
  }

  if(row.spEffectBehaviorId0 !== -1) {
    apply.push(row.spEffectBehaviorId0)
  }

  if(row.spEffectBehaviorId1 !== -1) {
    apply.push(row.spEffectBehaviorId1)
  }

  const schemaId = row.reinforceTypeId.toFixed();
  const schema = schemaId.substring(0, schemaId.length - 2);
  const config: ItemConfig = {
    attack,
    scaling,
    guard: {
      phy: row.physGuardCutRate,
      mag: row.magGuardCutRate,
      fir: row.fireGuardCutRate,
      lit: row.thunGuardCutRate,
      hol: row.darkGuardCutRate,
      sta: row.staminaGuardDef,
      res: (row.poisonGuardResist 
        + row.diseaseGuardResist 
        + row.bloodGuardResist 
        + row.curseGuardResist 
        + row.freezeGuardResist 
        + row.sleepGuardResist 
        + row.madnessGuardResist) / 7
    },
    schema: schema === '' ? '0' : schema,
    attackCorrectId: String(row.attackElementCorrectId),
    mutations,
    apply
  }

  if(row.enableMagic === 1) {
    config.cast = 'sorceries';
  }

  if(row.enableMiracle === 1) {
    config.cast = 'incantations';
  }

  return config;
}

function mapItemAttackInfo(row: ItemRow): ItemAttackInfo {
  const attackInfo: ItemAttackInfo = {
    damage: [],
    crit: 100 + (row.throwAtkRate ?? 0)
  }

  if(row.isNormalAttackType) {
    attackInfo.damage?.push(DamageType.STANDARD);
  }

  if(row.isBlowAttackType) {
    attackInfo.damage?.push(DamageType.STRIKE);
  }

  if(row.isSlashAttackType) {
    attackInfo.damage?.push(DamageType.SLASH);
  }

  if(row.isThrustAttackType) {
    attackInfo.damage?.push(DamageType.PIERCE);
  }

  return attackInfo;
}

function mapItemRequirements(row: ItemRow): ItemRequirements {
  const requirements: ItemRequirements = {
    attributes: {}
  };

  if(row.properStrength) {
    requirements.attributes!.str = row.properStrength;
  }

  if(row.properAgility) {
    requirements.attributes!.dex = row.properAgility;
  }

  if(row.properMagic) {
    requirements.attributes!.int = row.properMagic;
  }

  if(row.properFaith) {
    requirements.attributes!.fth = row.properFaith;
  }

  return requirements;
}

export function parseSpEffectData(file: string): Record<string, Partial<Record<StatusEffectType, number | number[]>>> {
  const { rows, defaults } = prepareXml<SpEffectParam>(file);
  const record: Record<string, Partial<Record<StatusEffectType, number | number[]>>> = {};

  for(const r of rows) {
    const row = { ...defaults, ...r };

    switch(row.stateInfo) {
      case SpEffectType.HEMORRHAGE:
        record[row.id] = { [StatusEffectType.HEMORRHAGE]: row.bloodAttackPower };
        break;
      case SpEffectType.ROT:
        record[row.id] = { [StatusEffectType.ROT]: row.diseaseAttackPower };
        break;
      case SpEffectType.FROSTBITE:
        record[row.id] = { [StatusEffectType.FROSTBITE]: row.freezeAttackPower };
        break;
      case SpEffectType.MADNESS:
        record[row.id] = { [StatusEffectType.MADNESS]: row.madnessAttackPower };
        break;
      case SpEffectType.POISON:
        record[row.id] = { [StatusEffectType.POISON]: row.poizonAttackPower };
        break;
      case SpEffectType.BLIGHT:
        record[row.id] = { [StatusEffectType.DEATH]: row.curseAttackPower };
        break;
      case SpEffectType.SLEEP:
        record[row.id] = { [StatusEffectType.SLEEP]: row.sleepAttackPower };
    }
  }

  return record;
}

export function parseReinforceData(file: string): Record<string, UpgradeSchema> {
  const { rows, defaults } = prepareXml<ReinforceParam>(file);
  const record: Record<string, UpgradeSchema> = {};

  for(const r of rows) {
    const row = { ...defaults, ...r };

    const id = row.id.toFixed();
    let schemaId = id.substring(0, id.length - 2);
    //const upgradeId = id.slice(-2);

    if(schemaId === '') {
      schemaId = "0";
    }

    if(!record[schemaId]) {
      record[schemaId] = {
        tiers: -1,
        attack: {
          phy: [],
          mag: [],
          fir: [],
          lit: [],
          hol: [],
          sta: []
        },
        scaling: {
          str: [],
          dex: [],
          int: [],
          fth: [],
          arc: [],
        },
        guard: {
          phy: [],
          mag: [],
          fir: [],
          lit: [],
          hol: [],
          sta: [],
          res: []
        }
      }
    }

    const schema = record[schemaId];
    schema.tiers += 1;
    schema.attack.phy.push(row.physicsAtkRate);
    schema.attack.mag.push(row.magicAtkRate);
    schema.attack.fir.push(row.fireAtkRate);
    schema.attack.lit.push(row.thunderAtkRate);
    schema.attack.hol.push(row.darkAtkRate);
    schema.attack.sta.push(row.staminaAtkRate);

    schema.scaling.str.push(row.correctStrengthRate);
    schema.scaling.dex.push(row.correctAgilityRate);
    schema.scaling.int.push(row.correctMagicRate);
    schema.scaling.fth.push(row.correctFaithRate);
    schema.scaling.arc.push(row.correctLuckRate);

    schema.guard.phy.push(row.physicsGuardCutRate);
    schema.guard.mag.push(row.magicGuardCutRate);
    schema.guard.fir.push(row.fireGuardCutRate);
    schema.guard.lit.push(row.thunderGuardCutRate);
    schema.guard.hol.push(row.darkGuardCutRate);

    schema.guard.sta.push(row.staminaGuardDefRate);
    schema.guard.res.push(row.sleepGuardDefRate);
  }

  return record;
}

export function parseCalcCorrectData(xmlFile: string): Record<string, AttributeMutation[]> {
  const { rows, defaults } = prepareXml<CalcCorrectParam>(xmlFile);

  const record: Record<string, AttributeMutation[]> = {};

  for(const r of rows) {
    const row = { ...defaults, ...r };
    record[row.id] = [
      {
        breakpoint: row.stageMaxVal0,
        grow: row.stageMaxGrowVal0,
        exp: row.adjPt_maxGrowVal0
      },

      {
        breakpoint: row.stageMaxVal1,
        grow: row.stageMaxGrowVal1,
        exp: row.adjPt_maxGrowVal1
      },

      {
        breakpoint: row.stageMaxVal2,
        grow: row.stageMaxGrowVal2,
        exp: row.adjPt_maxGrowVal2
      },

      {
        breakpoint: row.stageMaxVal3,
        grow: row.stageMaxGrowVal3,
        exp: row.adjPt_maxGrowVal3
      },

      {
        breakpoint: row.stageMaxVal4,
        grow: row.stageMaxGrowVal4,
        exp: row.adjPt_maxGrowVal4
      },
    ]
  }

  return record;
}

export function parseAttackCorrectData(xmlFile: string): Record<string, AttackCorrect> {
  const { rows, defaults } = prepareXml<AttackCorrectParam>(xmlFile);

  const record: Record<string, AttackCorrect> = {};

  for(const r of rows) {
    const row = { ...defaults, ...r };
    const atkCorrect: AttackCorrect = {
      [AttributeType.STRENGTH]: [],
      [AttributeType.DEXTERITY]: [],
      [AttributeType.INTELLIGENCE]: [],
      [AttributeType.FAITH]: [],
      [AttributeType.ARCANE]: []
    }

    // Strength
    if(row.isStrengthCorrect_byPhysics) {
      atkCorrect.str.push(AttackType.PHYSICAL);
    }

    if(row.isStrengthCorrect_byMagic) {
      atkCorrect.str.push(AttackType.MAGIC);
    }

    if(row.isStrengthCorrect_byFire) {
      atkCorrect.str.push(AttackType.FIRE);
    }

    if(row.isStrengthCorrect_byThunder) {
      atkCorrect.str.push(AttackType.LIGHTNING);
    }

    if(row.isStrengthCorrect_byDark) {
      atkCorrect.str.push(AttackType.HOLY);
    }

    // Dexterity
    if(row.isDexterityCorrect_byPhysics) {
      atkCorrect.dex.push(AttackType.PHYSICAL);
    }

    if(row.isDexterityCorrect_byMagic) {
      atkCorrect.dex.push(AttackType.MAGIC);
    }

    if(row.isDexterityCorrect_byFire) {
      atkCorrect.dex.push(AttackType.FIRE);
    }

    if(row.isDexterityCorrect_byThunder) {
      atkCorrect.dex.push(AttackType.LIGHTNING);
    }

    if(row.isDexterityCorrect_byDark) {
      atkCorrect.dex.push(AttackType.HOLY);
    }

    // Intelligence
    if(row.isMagicCorrect_byPhysics) {
      atkCorrect.int.push(AttackType.PHYSICAL);
    }

    if(row.isMagicCorrect_byMagic) {
      atkCorrect.int.push(AttackType.MAGIC);
    }

    if(row.isMagicCorrect_byFire) {
      atkCorrect.int.push(AttackType.FIRE);
    }

    if(row.isMagicCorrect_byThunder) {
      atkCorrect.int.push(AttackType.LIGHTNING);
    }

    if(row.isMagicCorrect_byDark) {
      atkCorrect.int.push(AttackType.HOLY);
    }

    // Faith
    if(row.isFaithCorrect_byPhysics) {
      atkCorrect.fth.push(AttackType.PHYSICAL);
    }

    if(row.isFaithCorrect_byMagic) {
      atkCorrect.fth.push(AttackType.MAGIC);
    }

    if(row.isFaithCorrect_byFire) {
      atkCorrect.fth.push(AttackType.FIRE);
    }

    if(row.isFaithCorrect_byThunder) {
      atkCorrect.fth.push(AttackType.LIGHTNING);
    }

    if(row.isFaithCorrect_byDark) {
      atkCorrect.fth.push(AttackType.HOLY);
    }

    // Arcane
    if(row.isLuckCorrect_byPhysics) {
      atkCorrect.arc.push(AttackType.PHYSICAL);
    }

    if(row.isLuckCorrect_byMagic) {
      atkCorrect.arc.push(AttackType.MAGIC);
    }

    if(row.isLuckCorrect_byFire) {
      atkCorrect.arc.push(AttackType.FIRE);
    }

    if(row.isLuckCorrect_byThunder) {
      atkCorrect.arc.push(AttackType.LIGHTNING);
    }

    if(row.isLuckCorrect_byDark) {
      atkCorrect.arc.push(AttackType.HOLY);
    }

    record[row.id] = atkCorrect;
  }

  return record;
}

export function parseArmors(xmlFile: string): Record<string, ItemData> {
  const { rows, defaults } = prepareXml<ItemRow>(xmlFile);
  const items: Record<string, ItemData> = {};

  for(let i = 0; i < rows.length; i++) {
    const row = { ...defaults, ...rows[i] };
    const id = row.id.toFixed();
    //const baseId = id.substring(0, id.length - 4);
    //const variantId = id.slice(-4);
  
    if(!row.paramdexName || row.paramdexName == '') {
      console.log(`Armor name missing for #${id} (skipping)`)
      continue;
    }

    const iconId = String(row.iconIdF).padStart(5, '0');
    const iconFile = `./static/images/items_webp/MENU_Knowledge_${iconId}.webp`;

    if(!existsSync(iconFile)) {
      console.log(`Armor image file ${iconFile} for ${row.paramdexName} does not exist (skipping)`);
      continue;
    }

    let type = '';
    let group = '';
    let category: ItemCategory = ItemCategory.ARMOR;

    switch(row.equipModelCategory) {
      case EquipModelCategory.HEAD:
        type = 'helm';
        group = 'helmets';
        category = ItemCategory.HELMET;
        break;
      case EquipModelCategory.ARMS:
        type = 'gauntlet';
        group = 'gauntlets';
        category = ItemCategory.ARMS;
        break;
      case EquipModelCategory.BODY:
        type = 'armor';
        group = 'armors';
        category = ItemCategory.ARMOR;
        break;
      case EquipModelCategory.LEGS:
        type = 'leg';
        group = 'legs';
        category = ItemCategory.LEGS;
    }

    if(type === '' || group === '') {
      continue;
    }

    const item: ItemData = {
      name: row.paramdexName,
      weight: row.weight,
      rarity: row.rarity,
      category,
      type,
      group
    };
    
    item.iconUrl = `/images/items_webp/MENU_Knowledge_${iconId}.webp`,

    item.damageNegation = {
      standard: (1 - row.neutralDamageCutRate) * 100,
      slash: (1 - row.slashDamageCutRate) * 100,
      strike: (1 - row.blowDamageCutRate) * 100,
      pierce: (1 - row.thrustDamageCutRate) * 100,
      mag: (1 - row.magicDamageCutRate) * 100,
      fir: (1 - row.fireDamageCutRate) * 100,
      lit: (1 - row.thunderDamageCutRate) * 100,
      hol: (1 - row.darkDamageCutRate) * 100
    }

    item.resistance = {
      focus: (row.resistSleep + row.resistMadness) / 2,
      immunity: (row.resistDisease + row.resistPoison) / 2,
      robustness: (row.resistBlood + row.resistFreeze) / 2,
      vitality: row.resistCurse,
      poise: row.toughnessCorrectRate * 1000
    }
    
    items[`${row.equipModelCategory}#${row.id}`] = item;
  }
  return items;
}

export function parseWeapons(xmlFile: string): Record<string, ItemData> {
  const { rows, defaults } = prepareXml<ItemRow>(xmlFile);
  const items: Record<string, ItemData> = {};

  for(let i = 0; i < rows.length; i++) {
    const row = { ...defaults, ...rows[i] };
    const id = row.id.toFixed();
  
    if(!row.paramdexName || row.paramdexName == '') {
      console.log(`Weapon name missing for #${id} (skipping)`)
      continue;
    }

    const item: ItemData = {
      name: row.paramdexName,
      group: '',
      type: '',
      weight: row.weight,
      category: ItemCategory.WEAPON,
      rarity: row.rarity
    };

    const weaponType = weaponTypeMap[row.wepType];

    if(!weaponType) {
      console.log(`Weapon type missing for ${row.paramdexName} #${id}`);
      continue;
    }

    const iconId = String(row.iconId).padStart(5, '0');
    const iconFile = `./static/images/items_webp/MENU_Knowledge_${iconId}.webp`;

    if(!existsSync(iconFile)) {
      console.log(`Weapon image file ${iconFile} for ${row.paramdexName} does not exist (skipping)`);
      continue;
    }
    
    item.iconUrl = `/images/items_webp/MENU_Knowledge_${iconId}.webp`,
    item.type = weaponType.name;
    item.group = weaponType.group;
    item.attackInfo = mapItemAttackInfo(row);
    item.requirements = mapItemRequirements(row);

    if(items[`${row.equipModelCategory}#${row.originEquipWep}`]) {
      const item: ItemData = items[`${row.equipModelCategory}#${row.originEquipWep}`];
      
      if(!item.affinities) {
        item.affinities = {}
      }
      
      item.affinities[affinityMap[row.id % 10000]] = mapItemConfig(row);
    } else if(row.originEquipWep === row.id) {
      
      item.config = mapItemConfig(row);
      
      items[`${row.equipModelCategory}#${row.id}`] = item;
    }
  }

  return items;
}