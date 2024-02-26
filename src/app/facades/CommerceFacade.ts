import { Inject, Injectable } from "@angular/core";
import { ShoppingService } from "../core/services/HttpRequests/Shopping/shopping.service";
import { ProductSalesService } from "../core/services/HttpRequests/ProductSale/product-sales.service";
import { ProductModel } from "../core/models/productModel";
import { Observable, switchMap } from "rxjs";
import { WarningHandlerService } from "../core/services/warningHandler/warning-handler.service";
import { Handler } from "../core/services/interfaces/warningHandler/handler";
import { LoaderSpinnerState } from "../core/states/LoaderSpinnerState";
import { ClientService } from "../core/services/HttpRequests/client/client.service";
import { v4 as uuidv4 } from 'uuid';


@Injectable({
    providedIn: 'root'
})
export class CommerceFacade {
    constructor(
        private shoppingService: ShoppingService,
        private productSale: ProductSalesService,
        private clientService:ClientService,
        private spinnerState: LoaderSpinnerState,
        @Inject(WarningHandlerService) private warningHandler: Handler) { }

    handlerOperation(operation: Observable<any>, errorMessage: string) {
        operation.subscribe({
            next: (data) => {
                this.warningHandler.reportSuccess(data.message, data.type);
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

    insertSale(products: ProductModel[],phone:string) {
        const saleId = uuidv4();
        products = products.map(el => ({ ...el, price: Number(el.price) }));
        const observable = this.clientService.handlerClient(phone,saleId).pipe(
            switchMap((data:any) => this.shoppingService.createSale(data.saleId)),
            switchMap((data:any) => this.productSale.insertProductsIntoSale(data.saleId,products))
        )
        this.handlerOperation(observable, "não foi possivel criar a venda");
    }
}