export class EditProductDto {
    constructor(
        public title: string,
        public price: number,
        public description: string,
        public image: string,
        public stock: number
    ) {
    }
}
