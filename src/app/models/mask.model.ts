export class Mask {

    constructor(
        public id: string,
        public type: 'H' | 'C' | 'N',
        public length: number,
        public height: number,
        public imageURL: string
    ) {
    }
}