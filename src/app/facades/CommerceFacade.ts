import { Inject, Injectable } from "@angular/core";
import { ShoppingService } from "../core/services/HttpRequests/Shopping/shopping.service";
import { ProductSalesService } from "../core/services/HttpRequests/ProductSale/product-sales.service";
import { Product } from "../core/models/productModel";
import { Observable, switchMap } from "rxjs";
import { WarningHandlerService } from "../core/services/warningHandler/warning-handler.service";
import { Handler } from "../core/services/interfaces/warningHandler/handler";
import { LoaderSpinnerState } from "../core/states/LoaderSpinnerState";
import { ClientService } from "../core/services/HttpRequests/client/client.service";
import { v4 as uuidv4 } from 'uuid';
import { TopProductsSellingState } from "../core/states/TopProductSelling";
import { TopProductsSelling } from "../core/models/TopProductSelling";

@Injectable({
    providedIn: 'root'
})
export class CommerceFacade {
    constructor(
        private shoppingService: ShoppingService,
        private productSale: ProductSalesService,
        private clientService: ClientService,
        private spinnerState: LoaderSpinnerState,
        private topProductsState: TopProductsSellingState,
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

    insertSale(products: Product[], phone: string) {
        const orderId = uuidv4();
        products = products.map(el => ({ ...el, price: Number(el.price) }));
        const observable = this.clientService.handlerClient(phone, orderId).pipe(
            switchMap((data: any) => {
                console.log(data);
                return this.shoppingService.createSale(data.orderId)
            }),
            switchMap((data: any) => this.productSale.insertProductsIntoSale(data.orderId, products))
        )
        this.handlerOperation(observable, "não foi possivel criar a venda");
    }

    getProductsOfSale(command: number, productId: number) {
        this.spinnerState.setState(true);
        const observable = this.clientService.getByCommand(command).pipe(
            switchMap((data: any) => this.productSale.getAllProductsOfSale(data?.orderId, productId))
        )
        this.handlerOperation(observable, "comanda não existe")
        return observable
    }

    recordProductSale(orderId: string, productId: number, quantity: number) {
        this.spinnerState.setState(true);
        const observable = this.productSale.lessProductQuantityOfSale(orderId, productId, quantity);
        this.handlerOperation(observable, "não foi possivel realizar baixa");
    }

    getTopProducts(rank: string) {
        const observable = this.productSale.getTopSellingProducts(rank);
        observable.subscribe((data: TopProductsSelling[]) => {
            this.topProductsState.setTopProducts(data)
        })
        this.handlerOperation(observable, "não foi possivel pegar a qualificação");
        return observable;
    }
}