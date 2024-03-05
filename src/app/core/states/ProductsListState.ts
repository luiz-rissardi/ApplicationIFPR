import { ReplaySubject, Subject, map } from "rxjs";
import { Product } from "../models/productModel";
import { Injectable } from "@angular/core";


// pattern observable 
@Injectable({
    providedIn: "root"
})

export class ProductsListState {

    private productList: Map<number, Product> = new Map<number, Product>();
    private subject: ReplaySubject<any> = new ReplaySubject(1);

    setProductList(productList: Product[]) {
        this.productList.clear();
        productList.forEach(product => {
            this.productList.set(product.productId, product);
        })
        this.notifyAll();
    }

    addProductIntoList(product: Product) {
        //execute
        return () => {
            const savedData = new Map<number, Product>(this.productList);
            this.productList.set(product.productId, product);
            this.notifyAll();
            //roll back
            return () => {
                this.productList = new Map<number, Product>(savedData);
                this.notifyAll();
            }
        }
    }

    putProductIntoList(product: Product) {
        //execute
        return () => {
            const savedData = new Map<number, Product>(this.productList);
            if (this.productList.has(product.productId)) {
                this.productList.delete(product.productId);
                this.productList.set(product.productId, product);
                this.notifyAll();
            }
            //roll back
            return () => {
                this.productList = new Map<number, Product>(savedData);
                this.notifyAll();
            }

        }
    }

    deleteProductIntoList(product: Product) {
        //execute
        return () => {
            const savedData = new Map<number, Product>(this.productList);
            this.productList.delete(product.productId);
            this.notifyAll();
            //roll back
            return () => {
                this.productList = new Map<number, Product>(savedData);
                this.notifyAll();
            }

        }
    }

    onProductListChange() {
        return this.subject;
    }

    private notifyAll() {
        this.subject.next(this.productList);
    }
}