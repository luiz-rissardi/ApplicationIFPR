
export class ShoppingException extends Error{
    constructor(ErrorMessage:string){
        super(ErrorMessage);
        this.name = "ShoppingExceptions";
    }
}