import { ReplaySubject } from "rxjs";
import { Injectable } from "@angular/core";

// pattern observable 
@Injectable({
    providedIn: "root"
})

export class CommandState {
    private subject: ReplaySubject<any> = new ReplaySubject<any >(1);
    private commandId: number;
    private show: boolean = false;

    onChangeAccount(){
        return this.subject;
    }

    setState(commandId: number, show:boolean) {
        this.commandId = commandId;
        this.show = show;
        this.notifyAll();
    }

    private notifyAll() {
        this.subject.next({ commandId:this.commandId, show:this.show });
    }
}