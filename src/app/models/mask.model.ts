
const HUIPIL_PRICE = 15;
const CORTE_PRICE = 12;
const KIDS_PRICE = 10;

export class Mask {
    price: number;

    constructor(
        public id: number,
        public type: 'huipil' | 'corte' | 'kids',
        public length: number,
        public height: number,
        public imageURL: string
    ) {
        this.calcPrice();
    }

    calcPrice() {
        switch (this.type) {
            case 'huipil':
                this.price = HUIPIL_PRICE;
            case 'corte':
                this.price = CORTE_PRICE;
            case 'kids':
                this.price = KIDS_PRICE;
            default:
                this.price = KIDS_PRICE;
        }
    }
}