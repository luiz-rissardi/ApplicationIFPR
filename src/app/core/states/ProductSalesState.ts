import { ReplaySubject } from "rxjs";
import { Injectable } from "@angular/core";
import { ProductSales } from "../models/producSaleModel";


// pattern observable 
@Injectable({
    providedIn: "root"
})

export class ProductsSalesState {

    private productSales:ProductSales
    private subject: ReplaySubject<ProductSales> = new ReplaySubject(1);

    setProductSales(productSale: ProductSales) {
        this.productSales = productSale;
        this.notifyAll();
    }


    onProductListChange() {
        return this.subject;
    }

    private notifyAll() {
        this.subject.next(this.productSales);
    }
}