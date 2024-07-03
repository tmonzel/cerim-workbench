<script lang='ts'>
	import { AttackType, AttributeType, type Attack, type Item } from '$lib/core';
	import { attackTypeRecord } from '$lib/records';
  import { VisXYContainer, VisLine, VisAxis } from '@unovis/svelte'
  
  export let item: Item;
  export let attributeType: AttributeType;
  export let showAttackTypes: AttackType[] = [];

  type DataRecord = { attr: number, attack: Attack }
  
  const attributeRange = 150;
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

  $: {
    const newData: DataRecord[] = [];

    for(let i = 0; i < attributeRange; i++) {
      const attack = item.scaleDamage({ [attributeType]: i }, true);

      for(const at of Object.values(AttackType)) {
        if(showAttackTypes.includes(at)) {
          continue;
        }

        delete attack[at];
      }

      newData.push({ attr: i, attack });
    }

    data = newData;
  }
</script>
<div style="--vis-axis-grid-color: rgba(255, 255, 255, 0.1);">
  <VisXYContainer {data} width={150} height={100} duration={0}>
    <VisLine {x} {y} {color} />
    <VisAxis type="x" label={attributeType} tickValues={[0,50,100,150]} />
    <VisAxis type="y" />
  </VisXYContainer>
</div>