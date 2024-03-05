import { Injectable, Inject } from '@angular/core';
import { StockService } from '../core/services/HttpRequests/Stock/stock-service.service';
import { Product } from '../core/models/productModel';
import { WarningHandlerService } from '../core/services/warningHandler/warning-handler.service';
import { Handler } from '../core/services/interfaces/warningHandler/handler';
import { Observable } from 'rxjs';
import { LoaderSpinnerState } from '../core/states/LoaderSpinnerState';
import { ProductsListState } from '../core/states/ProductsListState';


@Injectable({
    providedIn: 'root'
})

export class StockFacade {
    constructor(
        private service: StockService,
        private productsListState: ProductsListState,
        private spinnerState: LoaderSpinnerState,
        @Inject(WarningHandlerService) private warningHandler: Handler
    ) {

    }

    private handleOperation(operation: Observable<any>, errorMessage: string) {
        operation.subscribe({
            next: (data: any) => {
                this.warningHandler.reportSuccess(data?.message, data?.type);
            },
            error: (error) => {
                console.log(error);
                this.warningHandler.reportError(errorMessage);
            },
            complete: () => {
                this.spinnerState.setState(false);
            }
        });
    }

    createProduct(product: Product): Promise<number> {
        return new Promise((resolve, reject) => {
            try {
                this.service.createProduct(product).subscribe({
                    next: (data: any) => {
                        this.warningHandler.reportSuccess(data.message, data.type);
                        resolve(data.productId);
                    },
                    error: (error) => {
                        console.log(error);
                        this.warningHandler.reportError("Não foi possível criar o produto!");
                    },
                    complete: () => {
                        this.spinnerState.setState(false);
                    },
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    updateProduct(product: Product) {
        this.handleOperation(
            this.service.updateProduct(product),
            "Não foi possível atualizar o produto!"
        )
    }

    inactiveProduct(product: Product) {
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
                },
                complete: () => {
                    this.spinnerState.setState(false);
                }
            })
        })
    }

    SubstractItem(products: Product[], productsOsShoppingCart: Product[]) {
        const { substractsMapped, updates } = this.mapSubstraction(productsOsShoppingCart, products);
        this.substractionOfStock(updates);
        this.productsListState.setProductList(substractsMapped);
    }

    private substractionOfStock(updates: any) {
        this.handleOperation(
            this.service.substractionStock(updates),
            "não foi possivel substrair do estoque"
        )
    }

    private mapSubstraction(productsOsShoppingCart: Product[], products: Product[]) {
        const updates = productsOsShoppingCart.map(el => ({ productId: el.productId, quantity: el.quantity }));

        const map = products.map(el => {
            let obj = el;
            for (const update of updates) {
                if (el?.productId === update?.productId) {
                    obj = { ...el, quantity: el.quantity - update.quantity };
                }
            }
            return obj;
        })
        return {
            substractsMapped: map,
            updates
        }
    }

}