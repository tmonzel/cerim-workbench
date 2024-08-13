import { GoodsType } from './types';

type GoodTypeInfo = {
	name: string;
};

export const goodTypeInfo: Record<string, GoodTypeInfo> = {
	[GoodsType.GREAT_RUNE]: {
		name: 'Great Rune'
	}
};
