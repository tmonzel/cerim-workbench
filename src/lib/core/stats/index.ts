import { DynamicAttack } from '../DynamicAttack';
import { DynamicNumber } from '../DynamicNumber';

export * from './AttackDamageStat';
export * from './AttributeStat';

function createDynamicStat<T>(label: string, type: new(base?: number) => T): () => T {
  return () => {
    return new type();
  }
}

export const ImmunityStat = createDynamicStat('Immunity', DynamicNumber);
export const HealthStat = createDynamicStat('Health', DynamicNumber);


export const createStats = () => {
  return {
    'hp': new DynamicNumber(),
    'fp': new DynamicNumber(),
    'stamina': new DynamicNumber(),
    'discovery': new DynamicNumber(),
    'weight': new DynamicNumber(),
    'equipLoad': new DynamicNumber(),
    'attack': new DynamicAttack(),
    'res:immunity': new DynamicNumber(),
    'res:robustness': new DynamicNumber(),
    'res:focus': new DynamicNumber(),
    'res:vitality': new DynamicNumber(),
    'res:poise': new DynamicNumber(),
    'def:strike': new DynamicNumber(),
    'def:slash': new DynamicNumber(),
    'def:pierce': new DynamicNumber(),
    'def:phy': new DynamicNumber(),
    'def:hol': new DynamicNumber(),
    'def:lit': new DynamicNumber(),
    'def:fir': new DynamicNumber(),
    'def:mag': new DynamicNumber(),
  }
}