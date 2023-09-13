


export class StockExceptions extends Error{
    constructor(Errormessage:string){
        super(Errormessage);
        this.name = "StockExceptions";
    }
}