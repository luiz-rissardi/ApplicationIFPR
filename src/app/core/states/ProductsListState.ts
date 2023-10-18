import { ReplaySubject, Subject, map } from "rxjs";
import { ProductModel } from "../models/productModel";
import { Injectable } from "@angular/core";


// pattern observable 
@Injectable({
    providedIn: "root"
})

export class ProductsListState {

    #productList: Map<number, ProductModel> = new Map<number, ProductModel>();
    #subject: ReplaySubject<any> = new ReplaySubject(1);
    constructor() {
    }

    setProductList(productList: ProductModel[]) {
        productList.forEach(product => {
            this.#productList.set(product.productId, product);
        })
        this.#notifyAll();
    }

    addProductIntoList(product: ProductModel) {
        //execute
        return () => {
            const savedData = new Map<number, ProductModel>(this.#productList);
            this.#productList.set(product.productId, product);
            this.#notifyAll();
            //roll back
            return () => {
                this.#productList = new Map<number, ProductModel>(savedData);
                this.#notifyAll();
            }
        }
    }

    putProductIntoList(product: ProductModel) {
        //execute
        return () => {
            const savedData = new Map<number, ProductModel>(this.#productList);
            if (this.#productList.has(product.productId)) {
                this.#productList.delete(product.productId);
                this.#productList.set(product.productId, product);
                this.#notifyAll();
            }
            //roll back
            return () => {
                this.#productList = new Map<number, ProductModel>(savedData);
                this.#notifyAll();
            }

        }
    }

    deleteProductIntoList(product: ProductModel) {
        //execute
        return () => {
            const savedData = new Map<number, ProductModel>(this.#productList);
            this.#productList.delete(product.productId);
            this.#notifyAll();
            //roll back
            return () => {
                this.#productList = new Map<number, ProductModel>(savedData);
                this.#notifyAll();
            }

        }
    }

    onProductListChange() {
        return this.#subject;
    }

    #notifyAll() {
        this.#subject.next(this.#productList);
    }
}