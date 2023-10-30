import { ReplaySubject } from "rxjs";
import { Injectable } from "@angular/core";
import { Account, AccountSeller } from "../models/AccountModel";


// pattern observable 
@Injectable({
    providedIn: "root"
})

export class AccountState {
    private account: Account | AccountSeller;
    private subject: ReplaySubject<Account | AccountSeller> = new ReplaySubject<Account | AccountSeller>(1);

    onChangeAccount(){
        return this.subject;
    }

    setState(acconut: Account | AccountSeller) {
        this.account = acconut;
        this.notifyAll();
    }

    private notifyAll() {
        this.subject.next(this.account);
    }
}