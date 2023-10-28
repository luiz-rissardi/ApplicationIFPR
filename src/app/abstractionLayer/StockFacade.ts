import { Injectable, Inject } from '@angular/core';
import { StockService } from '../core/services/HttpRequests/Stock/stock-service.service';
import { ProductModel } from '../core/models/productModel';
import { WarningHandlerService } from '../core/services/warningHandler/warning-handler.service';
import { Handler } from '../core/services/interfaces/warningHandler/handler';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class StockFacade {
    constructor(private service: StockService, @Inject(WarningHandlerService) private warningHandler: Handler) {

    }

    private handleOperation(operation: Observable<any>, errorMessage: string) {
        operation.subscribe({
            next: (data: any) => this.warningHandler.reportSuccess(data.message, data.type),
            error: (error) => {
                console.log(error);
                this.warningHandler.reportError(errorMessage);
            }
        });
    }

    createProduct(product: ProductModel) {
        this.handleOperation(
            this.service.createProduct(product),
            "Não foi possível criar o produto!"
        )
    }

    updateProduct(product: ProductModel) {
        this.handleOperation(
            this.service.updateProduct(product),
            "Não foi possível atualizar o produto!"
        )
    }

    inactiveProduct(product: ProductModel) {
        product.active = false;

        this.handleOperation(
            this.service.updateProduct(product),
            "Não foi possível inativar o produto!"
        )
    }

    findAllProducts(): Observable<any> {
        return new Observable(subscriber => {
            this.service.getAllProduct().subscribe({
                next: (data: any) => {
                    subscriber.next(data)
                },
                error: (error) => {
                    subscriber.error("invalid")
                    this.warningHandler.reportError("Não foi possível pegar os produtos!");
                }
            })
        })
    }
}