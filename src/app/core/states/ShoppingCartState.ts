import { ReplaySubject, Subject } from "rxjs";
import { Product } from "../models/productModel";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class ShoppingCartState {

    private products: Map<number, Product> = new Map<number, Product>();
    private subject: ReplaySubject<any> = new ReplaySubject(1);

    addToCart(product: Product) {
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

    removeOneToCart(product: Product) {
        const productSale = this.products.get(product.productId);
        productSale.quantity -= 1;
        this.products.delete(product.productId);
        this.products.set(product.productId, productSale);
        this.notifyAll();
    }

    removeItem(product: Product) {
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

    private addToShoppingCart(product: Product) {
        const productSale = this.products.get(product.productId);
        productSale.quantity += 1;
        this.products.delete(product.productId);
        this.products.set(product.productId, productSale);
    }

    private createToShoppingCart(product:Product) {
        const productSale = { ...product, quantity: 1 };
        this.products.set(product.productId, productSale);
    }
}