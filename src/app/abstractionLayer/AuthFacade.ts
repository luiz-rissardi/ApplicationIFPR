import { Inject, Injectable } from "@angular/core";
import { AuthService } from "../core/services/HttpRequests/auth/auth.service";
import { WarningHandlerService } from "../core/services/warningHandler/warning-handler.service";
import { Handler } from "../core/services/interfaces/warningHandler/handler";
import { AccountState } from "../core/states/AccountState";
import { Router } from "@angular/router";


@Injectable({
    providedIn: "root"
})

export class AuthFacade {
    constructor(
        @Inject(WarningHandlerService) private waninrgHandler: Handler,
        private authService: AuthService,
        private AccountState: AccountState,
        private router: Router
    ) {

    }

    login(name: string, password: string) {
        try {
            this.authService.login(name, password).subscribe((data: any) => {
                let { authenticated, user } = data;
                if (authenticated) {
                    user = user[0];
                    this.AccountState.setState(user);
                    const isAdmin = user.typeAccount === 1;
                    if (isAdmin) {
                        this.router.navigate(["/home"])
                    }
                    else{
                        
                    }
                } else {
                    this.waninrgHandler.reportError("usuario ou senha incorretos")
                }
            })
        } catch (error) {
            this.waninrgHandler.reportError("não foi possivel realizar o login")
        }
    }

}