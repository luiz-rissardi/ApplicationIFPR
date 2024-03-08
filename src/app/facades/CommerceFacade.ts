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

import qrcode from 'qrcode-generator';
import { MessageService } from "../core/services/HttpRequests/message/message.service";

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
        private messageService:MessageService,
        @Inject(WarningHandlerService) private warningHandler: Handler) { }

    private handlerOperation(operation: Observable<any>, errorMessage: string) {
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

    insertSale(products: Product[], phone: string) {
        const saleId = uuidv4();
        products = products.map(el => ({ ...el, price: Number(el.price) }));
        const observable = this.clientService.handlerClient(phone, saleId).pipe(
            switchMap((data: any) => this.shoppingService.createSale(data.saleId)),
            switchMap((data: any) => {
                const qr = qrcode(0, "M");
                qr.addData(data.saleId)
                qr.make();
                const qrCodeData = qr.createImgTag();
                this.messageService.sendQrcodeToClient(phone,qrCodeData)

                return this.productSale.insertProductsIntoSale(data.saleId, products)
            })
        )
        this.handlerOperation(observable, "não foi possivel criar a venda");
    }

    getProductsOfSale(saleId: string, productId: number) {
        this.spinnerState.setState(true);
        const observable = this.productSale.getAllProductsOfSale(saleId, productId);
        this.handlerOperation(observable, "não foi possivel pegar produtos da venda")
        return observable;
    }

    recordProductSale(saleId: string, productId: number, quantity: number) {
        this.spinnerState.setState(true);
        const observable = this.productSale.lessProductQuantityOfSale(saleId, productId, quantity);
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