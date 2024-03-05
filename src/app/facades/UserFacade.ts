import { Inject, Injectable } from "@angular/core";
import { AccountService } from "../core/services/HttpRequests/User/user.service";
import { WarningHandlerService } from "../core/services/warningHandler/warning-handler.service";
import { Handler } from "../core/services/interfaces/warningHandler/handler";
import { AccountState } from "../core/states/AccountState";
import { Router } from "@angular/router";
import { setProductIdUserAnexed, setUserNameStorage } from "../core/storage/sessionStorage";

@Injectable({
    providedIn: "root"
})

export class UserFacade {
    constructor(
        @Inject(WarningHandlerService) private waninrgHandler: Handler,
        private accountService: AccountService,
        private AccountState: AccountState,
        private router: Router,
    ) {

    }

    login(name: string, password: string) {
        try {
            setUserNameStorage(name);
            this.accountService.login(name, password).subscribe((data: any) => {
                let { authenticated, user } = data;
                if (authenticated) {
                    user = user[0];
                    this.AccountState.setState(user);
                    setProductIdUserAnexed(user.productIdAnexed);
                    const isAdmin = user.typeAccount === 1;
                    if (isAdmin) {
                        this.router.navigate(["/home"]);
                    }
                    else {
                        this.router.navigate(["/home/manager"]);
                    }
                } else {
                    this.waninrgHandler.reportError("usuario ou senha incorretos")
                }
            })
        } catch (error) {
            this.waninrgHandler.reportError("não foi possivel realizar o login")
        }
    }

    createAccount(account: any) {
        try {
            this.accountService.createAccount(account)
                .subscribe((data: any) => {
                    let { authenticated, user } = data;
                    if (authenticated) {
                        user = user[0];
                        this.AccountState.setState(account);
                        this.router.navigate(["/home/manager"]);
                    } else {
                        this.waninrgHandler.reportError(data?.message)
                    }
                })
        } catch (error) {
            this.waninrgHandler.reportError("não foi possivel criar nova conta")
        }
    }

    updatePassword(userName: string, password: string) {
        try {
            this.accountService.updatePassword(userName, password)
                .subscribe((data: any) => {
                    this.waninrgHandler.reportSuccess(data?.message,data?.type);
                    if(data?.type !== "invalid") this.router.navigate(["/auth"]);
                })
        } catch (error) {
            this.waninrgHandler.reportError("não foi possivel atualizar a senha")
        }
    }

}