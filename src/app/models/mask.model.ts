export class Mask {

    constructor(
        public id: number,
        public type: 'huipil' | 'corte' | 'kids',
        public length: number,
        public height: number,
        public imageURL: string
    ) {
    }
}