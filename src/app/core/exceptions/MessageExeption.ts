
export class MessageException extends Error{
    constructor(ErrorMessage:string){
        super(ErrorMessage);
        this.name = "MessageException";
    }
}