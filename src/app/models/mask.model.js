"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mask = void 0;
const environment_1 = require("src/environments/environment");
class Mask {
    constructor(id, type, length, height, imageURL) {
        this.id = id;
        this.type = type;
        this.length = length;
        this.height = height;
        this.imageURL = imageURL;
        this.price = this.calcPrice();
        this.priceKey = this.calcPriceKey();
    }
    calcPrice() {
        switch (this.type) {
            case 'huipil':
                return environment_1.environment.HUIPIL_PRICE;
            case 'corte':
                return environment_1.environment.CORTE_PRICE;
            case 'kids':
                return environment_1.environment.KIDS_PRICE;
            default:
                return environment_1.environment.KIDS_PRICE;
        }
    }
    calcPriceKey() {
        switch (this.type) {
            case 'huipil':
                return environment_1.environment.HUIPIL_PRICE_KEY;
            case 'corte':
                return environment_1.environment.CORTE_PRICE_KEY;
            case 'kids':
                return environment_1.environment.KIDS_PRICE_KEY;
            default:
                return '';
        }
    }
}
exports.Mask = Mask;
//# sourceMappingURL=mask.model.js.map