import { environment } from 'src/environments/environment';

export type MaskType = 'huipil' | 'corte' | 'kids';

export class Mask {
    price: number;
    priceKey: string;

    constructor(
        public id: number,
        public type: MaskType,
        public length: number,
        public height: number,
        public imageURL: string
    ) {
        this.price = this.calcPrice();
        this.priceKey = this.calcPriceKey();
    }

    calcPrice(): number{
        switch (this.type) {
            case 'huipil':
                return environment.HUIPIL_PRICE;
            case 'corte':
                return environment.CORTE_PRICE;
            case 'kids':
                return environment.KIDS_PRICE;
            default:
                return environment.KIDS_PRICE;
        }
    }

    calcPriceKey() {
        switch (this.type) {
            case 'huipil':
                return environment.HUIPIL_PRICE_KEY;
            case 'corte':
                return environment.CORTE_PRICE_KEY;
            case 'kids':
                return environment.KIDS_PRICE_KEY;
            default:
                return '';
        }
    }
}