import { Inject, Injectable } from "@angular/core";
import { ShoppingService } from "../core/services/HttpRequests/Shopping/shopping.service";
import { ProductSalesService } from "../core/services/HttpRequests/ProductSale/product-sales.service";
import { ProductModel } from "../core/models/productModel";
import { Observable, switchMap } from "rxjs";
import { WarningHandlerService } from "../core/services/warningHandler/warning-handler.service";
import { Handler } from "../core/services/interfaces/warningHandler/handler";


@Injectable({
    providedIn: 'root'
})
export class CommerceFacade {
    constructor(
        private shoppingService: ShoppingService,
        private productSale: ProductSalesService,
        @Inject(WarningHandlerService) private warningHandler: Handler) { }

    handlerOperation(operation: Observable<any>, errorMessage: string) {
        operation.subscribe({
            next: (data) => {
                this.warningHandler.reportSuccess(data.message, data.type);
            },
            error: (error) => {
                console.log(error);
                this.warningHandler.reportError(errorMessage);
            }
        })
    }

    insertSale(products: ProductModel[]) {
        const observable = this.shoppingService.createSale().pipe(
            switchMap((data:any) => this.productSale.insertProductsIntoSale(data.saleId,products))
        )

        this.handlerOperation(observable,"não foi possivel criar a venda");
        
    }
}