
export class StockExceptions extends Error{
    constructor(ErrorMessage:string){
        super(ErrorMessage);
        this.name = "StockExceptions";
    }
}