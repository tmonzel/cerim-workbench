import { Item } from './Item';
import type { ItemData } from './types';

export class ProtectionItem extends Item {
  constructor(id: string, data: ItemData) {
    super(id, data);

    if(data.config) {
      this.setConfig(data.config);
    }
  }

  update(): void {
    //throw new Error('Method not implemented.');
  }
}