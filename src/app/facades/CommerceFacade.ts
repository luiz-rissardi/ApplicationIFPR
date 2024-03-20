import { Inject, Injectable } from "@angular/core";
import { OrderService } from "../core/services/HttpRequests/Order/order.service";
import { OrderProductsService } from "../core/services/HttpRequests/OrderProduct/order-product.service";
import { Products } from "../core/models/ProductsModel";
import { Observable, switchMap } from "rxjs";
import { WarningHandlerService } from "../core/services/warningHandler/warning-handler.service";
import { Handler } from "../core/services/interfaces/warningHandler/handler";
import { LoaderSpinnerState } from "../core/states/LoaderSpinnerState";
import { ClientService } from "../core/services/HttpRequests/Client/client.service";
import { v4 as uuidv4 } from 'uuid';
import { TopProductssSellingState } from "../core/states/TopProductSelling";
import { TopProductssSelling } from "../core/models/TopProductSelling";
import { CommandsService } from "../core/services/HttpRequests/Commands/commands.service";
import { CommandState } from "../core/states/Command";

@Injectable({
    providedIn: 'root'
})
export class CommerceFacade {
    constructor(
        private orderService: OrderService,
        private productOrderService: OrderProductsService,
        private clientService: ClientService,
        private spinnerState: LoaderSpinnerState,
        private topProductssState: TopProductssSellingState,
        private commandService: CommandsService,
        private commandState: CommandState,
        @Inject(WarningHandlerService) private warningHandler: Handler) { }

    private handlerOperation(operation: Observable<any>, errorMessage: string) {
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

    insertOrder(products: Products[], phone: string) {
        const orderId = uuidv4();
        let commandId: number;
        products = products.map(el => ({ ...el, price: Number(el.price) }));
        const observable = this.commandService.getAvaibleCommand()
            .pipe(
                switchMap((data: any) => {
                    commandId = data.command.commandId;
                    const observable = this.clientService.handlerClient(phone, orderId)
                    return observable;
                }),
                switchMap((data: any) => {
                    // se ele já existia não presisa usar a proxima comanda 
                    if (data?.alreadyExists == false) {
                        this.commandService.updateStatusCommand(commandId, false).subscribe(() => { })
                    }
                    this.commandState.setState(commandId,true)
                    return this.orderService.createOrder(data.orderId, commandId)
                }),
                switchMap((data: any) => this.productOrderService.insertProductsIntoOrder(data.orderId, products))
            )
        this.handlerOperation(observable, "não foi possivel criar a venda");
}

getProductssOfOrder(commandUrl: string, productId: number) {
    // this.spinnerState.setState(true);
    // const observable = this.productOrderService.getAllProductsOfOrder(data?.orderId, productId)

    // this.handlerOperation(observable, "comanda não existe")
    // return observable
}

recordProductsOrder(orderId: string, productId: number, quantity: number) {
    this.spinnerState.setState(true);
    const observable = this.productOrderService.lessProductsQuantityOfOrder(orderId, productId, quantity);
    this.handlerOperation(observable, "não foi possivel realizar baixa");
}

getTopProductss(rank: string) {
    const observable = this.productOrderService.getTopSellingProducts(rank);
    observable.subscribe((data: TopProductssSelling[]) => {
        this.topProductssState.setTopProductss(data)
    })
    this.handlerOperation(observable, "não foi possivel pegar a qualificação");
    return observable;
}
}