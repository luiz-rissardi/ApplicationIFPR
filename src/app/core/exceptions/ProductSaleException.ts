


export class ProductSaleException extends Error{
    constructor(message:string){
        super(message);
        this.name = "ProductSaleException"
    }
}