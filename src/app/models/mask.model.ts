import { CartItem } from 'ng-shopping-cart'

const HUIPIL_PRICE = 15;
const CORTE_PRICE = 12;
const KIDS_PRICE = 10;

export class Mask extends CartItem{
    quantity = 1;

    constructor(
        public id: number,
        public type: 'huipil' | 'corte' | 'kids',
        public length: number,
        public height: number,
        public imageURL: string
    ) {
        super();
    }

    getId(): number {
        return this.id;
    }

    getName(): string {
        return ``;
    }

    getPrice(): number {
        let price: number;
        switch(this.type) {
            case 'huipil': {
                price = HUIPIL_PRICE;
            }
            case 'corte': {
                price = CORTE_PRICE;
            }
            default: {
                price = KIDS_PRICE;
            }
        }
        return price;
    }

    getImage(): string {
        return this.imageURL;
    }

    getQuantity(): number{
        return this.quantity;
    }

    setQuantity(quantity: number):  void {
        if (this.quantity !== 0 && this.quantity !== 1) {
            return
        }
        this.quantity = quantity;
        return;
    }

    static fromJSON(itemData: any) {
        return new Mask(itemData.id, itemData.type, itemData.length, itemData.height, itemData.imageURL);
    }
}