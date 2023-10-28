import { Subject } from "rxjs";
import { ProductModel } from "../models/productModel";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class ShoppingCartState {

    private products: Map<number, ProductModel> = new Map<number, ProductModel>();
    private subject: Subject<any> = new Subject();

    addToCart(product: ProductModel) {
        if (this.products.has(product.productId)) {
            this.addToShoppingCart(product);
        } else {
            this.createToShoppingCart(product);
        }
        this.notifyAll();
    }

    getAllProducts(){
        return Array.from(this.products.values()).flat().filter(el => !Number.isInteger(el))
    }

    removeOneToCart(product: ProductModel) {
        const productSale = this.products.get(product.productId);
        productSale.quantity -= 1;
        this.products.delete(product.productId);
        this.products.set(product.productId, productSale);
        this.notifyAll();
    }

    removeItem(product: ProductModel) {
        this.products.delete(product.productId);
        this.notifyAll();
    }

    removeAll() {
        this.products.clear();
        this.notifyAll();
    }

    onChangeShoppingCart() {
        return this.subject;
    }

    private notifyAll() {
        this.subject.next(this.products);
    }

    private addToShoppingCart(product: ProductModel) {
        const productSale = this.products.get(product.productId);
        productSale.quantity += 1;
        this.products.delete(product.productId);
        this.products.set(product.productId, productSale);
    }

    private createToShoppingCart(product:ProductModel) {
        const productSale = { ...product, quantity: 1 };
        this.products.set(product.productId, productSale);
    }
}