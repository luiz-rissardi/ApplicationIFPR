import { Inject, Injectable } from "@angular/core";
import { Observable, switchMap } from "rxjs";
import { WarningHandlerService } from "../core/services/warningHandler/warning-handler.service";
import { Handler } from "../core/services/interfaces/warningHandler/handler";
import { LoaderSpinnerState } from "../core/states/LoaderSpinnerState";
import { CommandsService } from "../core/services/HttpRequests/Commands/commands.service";
import { OrderService } from "../core/services/HttpRequests/Order/order.service";


@Injectable({
    providedIn: 'root'
})
export class CommandFacade {
    constructor(
        @Inject(WarningHandlerService) private warningHandler: Handler,
        private spinnerState: LoaderSpinnerState,
        private commandService:CommandsService,
        private orderService:OrderService
        ) {
    }

    private handlerOperation(operation:Observable<any>,errorMessage:string){
        operation.subscribe({
            next: (data) => {
                this.warningHandler.reportSuccess(data?.message, data?.type);
            },
            error: (error) => {
                console.log(error);
                this.warningHandler.reportError(errorMessage);
            },
            complete: () => {
                this.spinnerState.setState(false);
            }
        })
    }

    resetCommand(commandId:number){
        this.spinnerState.setState(true);
        const observable = this.orderService.inactiveOrder(commandId).pipe(
            switchMap(data => this.commandService.updateStatusCommand(commandId,true))
        );
        this.handlerOperation(observable,"não foi possível resetar comanda")

    }
}