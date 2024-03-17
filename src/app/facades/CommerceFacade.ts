import { Inject, Injectable } from "@angular/core";
import { OrderService } from "../core/services/HttpRequests/Order/order.service";
import { OrderProductsService } from "../core/services/HttpRequests/OrderProduct/order-product.service";
import { Products } from "../core/models/ProductsModel";
import { Observable, switchMap } from "rxjs";
import { WarningHandlerService } from "../core/services/warningHandler/warning-handler.service";
import { Handler } from "../core/services/interfaces/warningHandler/handler";
import { LoaderSpinnerState } from "../core/states/LoaderSpinnerState";
import { ClientService } from "../core/services/HttpRequests/client/client.service";
import { v4 as uuidv4 } from 'uuid';
import { TopProductssSellingState } from "../core/states/TopProductSelling";
import { TopProductssSelling } from "../core/models/TopProductSelling";

@Injectable({
    providedIn: 'root'
})
export class CommerceFacade {
    constructor(
        private OrderService: OrderService,
        private productOrderService: OrderProductsService,
        private clientService: ClientService,
        private spinnerState: LoaderSpinnerState,
        private topProductssState: TopProductssSellingState,
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
        products = products.map(el => ({ ...el, price: Number(el.price) }));
        const observable = this.clientService.handlerClient(phone, orderId).pipe(
            switchMap((data: any) => {
                console.log(data);
                return this.OrderService.createOrder(data.orderId)
            }),
            switchMap((data: any) => this.productOrderService.insertProductssIntoOrder(data.orderId, products))
        )
        this.handlerOperation(observable, "não foi possivel criar a venda");
    }

    getProductssOfOrder(command: number, productId: number) {
        this.spinnerState.setState(true);
        const observable = this.clientService.getByCommand(command).pipe(
            switchMap((data: any) => this.productOrderService.getAllProductssOfOrder(data?.orderId, productId))
        )
        this.handlerOperation(observable, "comanda não existe")
        return observable
    }

    recordProductsOrder(orderId: string, productId: number, quantity: number) {
        this.spinnerState.setState(true);
        const observable = this.productOrderService.lessProductsQuantityOfOrder(orderId, productId, quantity);
        this.handlerOperation(observable, "não foi possivel realizar baixa");
    }

    getTopProductss(rank: string) {
        const observable = this.productOrderService.getTopSellingProductss(rank);
        observable.subscribe((data: TopProductssSelling[]) => {
            this.topProductssState.setTopProductss(data)
        })
        this.handlerOperation(observable, "não foi possivel pegar a qualificação");
        return observable;
    }
}