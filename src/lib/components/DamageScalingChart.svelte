<script lang='ts'>
	import { AttackType, type Attack, type AttributeType } from '$lib/core/types';
	import type { Item } from '$lib/item';
	import { attackTypeRecord } from '$lib/records';
	import { heroState } from '$lib/state';
  import { VisXYContainer, VisLine, VisAxis, VisStackedBar } from '@unovis/svelte';
	import AttributeBadge from './AttributeBadge.svelte';
  
  export let item: Item;
  export let attributeType: AttributeType;
  export let showAttackTypes: AttackType[] = [];

  type DataRecord = { attr: number, attack: Attack }
  
  const attributeRange = 99;
  let maxAttack = 0;
  let data: DataRecord[];
  
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

  $: attributeValue = $heroState.attributes.get(attributeType);

  $: {
    const newData: DataRecord[] = [];
    maxAttack = 0;

    for(let i = 0; i < attributeRange; i++) {
      const attack = item.scaleDamage({ [attributeType]: i }, true);

      for(const at of Object.values(AttackType)) {
        if(showAttackTypes.includes(at)) {
          const attackAmount = attack[at];

          if(attackAmount && attackAmount > maxAttack) {
            maxAttack = attackAmount;
          }

          continue;
        }

        delete attack[at];
      }

      newData.push({ attr: i, attack });
    }

    data = newData;
  }
</script>
<div style="--vis-axis-grid-color: rgba(255, 255, 255, 0.1)" class="flex flex-col items-end">
  <div class="mb-2">
    <VisXYContainer {data} width={150} height={100} duration={0} xDomain={[0, 100]} yDomain={[0, maxAttack > 250 ? maxAttack : 250]}>
      <VisLine {x} {y} {color} />
      <VisAxis type="x" tickValues={[0,25,50,75,100]} />
      <VisAxis type="y" tickValues={[0,50,150,250,500]} />
      <VisStackedBar barWidth={1} x={attributeValue} y={maxAttack > 500 ? maxAttack : 500} color={() => '#bbb'} />
    </VisXYContainer>
  </div>
  <div class="text-xs text-zinc-500">
    <AttributeBadge type={attributeType} />
  </div>
</div>

<style>
  
</style>