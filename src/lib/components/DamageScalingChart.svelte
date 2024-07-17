<script lang='ts'>
	import { AttackType, type Attack, type AttributeType } from '$lib/core/types';
	import { AttackItem } from '$lib/item';
	import { attackTypeRecord } from '$lib/records';
  import { VisXYContainer, VisLine, VisAxis, VisStackedBar } from '@unovis/svelte';
	import AttributeBadge from './AttributeBadge.svelte';
  
  export let item: AttackItem;
  export let attributeType: AttributeType;
  

  type DataRecord = { attr: number, attack: Attack }
  
  const attributeRange = 99;
  let maxAttack = 0;
  let data: DataRecord[];
  let attributeValue: number;
  let attackTypes: AttackType[] = [];
  
  const x = (d: DataRecord) => d.attr;
  const y = [
    (d: DataRecord) => d.attack.phy,
    (d: DataRecord) => d.attack.mag,
    (d: DataRecord) => d.attack.lit,
    (d: DataRecord) => d.attack.sor,
    (d: DataRecord) => d.attack.fir,
    (d: DataRecord) => d.attack.hol,
    (d: DataRecord) => d.attack.inc,
    (d: DataRecord) => d.attack.sta
  ];

  const color = (d: DataRecord, i: number) => [
    attackTypeRecord.phy.color, 
    attackTypeRecord.mag.color,
    attackTypeRecord.lit.color,
    attackTypeRecord.sor.color,
    attackTypeRecord.fir.color,
    attackTypeRecord.hol.color,
    attackTypeRecord.inc.color,
    attackTypeRecord.sta.color
  ][i]

  let currentValue: Partial<Record<AttackType, number>> = {};
  let nextValue: Partial<Record<AttackType, number>> = {};
  let yGraphMax = 200;
  
  $: {
    const newData: DataRecord[] = [];
    maxAttack = 0;
    attributeValue = item.appliedAttributes[attributeType] ?? 0;
    attackTypes = item.scaling[attributeType]?.attackTypes ?? [];

    for(let i = 0; i < attributeRange; i++) {
      const attack = item.calculateAttributeAttack(i, attributeType);
      newData.push({ attr: i, attack });

      const newMax = Object.values(attack).find(v => v > maxAttack);
      
      if(newMax) {
        maxAttack = newMax;
      }
    }

    data = newData;
    yGraphMax = maxAttack > 200 ? maxAttack : 200;
  }
</script>
<div style="--vis-axis-grid-color: rgba(255, 255, 255, 0.1)" class="flex flex-col items-end">
  <div class="mb-2">
    <VisXYContainer {data} width={150} height={100} duration={0} xDomain={[0, 99]} yDomain={[0, yGraphMax]}>
      <VisLine {x} {y} {color} />
      <VisAxis type="x" tickValues={[0,25,50,75]} />
      <VisAxis type="y" tickValues={[0,100,200,300,400,500]} />
      <VisStackedBar barWidth={1} x={attributeValue} y={yGraphMax} color={() => '#bbb'} />
    </VisXYContainer>
  </div>
  <div class="text-xs text-zinc-500 flex">
    <AttributeBadge type={attributeType} /><span class="ms-1">({attributeValue})</span>
  </div>
</div>
