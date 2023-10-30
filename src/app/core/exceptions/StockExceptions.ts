
export class StockException extends Error{
    constructor(ErrorMessage:string){
        super(ErrorMessage);
        this.name = "StockExceptions";
    }
}