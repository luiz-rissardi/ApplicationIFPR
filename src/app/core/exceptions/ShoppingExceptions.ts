
export class ShoppingExceptions extends Error{
    constructor(ErrorMessage:string){
        super(ErrorMessage);
        this.name = "ShoppingExceptions";
    }
}