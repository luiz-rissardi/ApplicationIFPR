import { ReplaySubject } from "rxjs";
import { Injectable } from "@angular/core";
import { TopProductsSelling } from "../models/TopProductSelling";


// pattern observable 
@Injectable({
    providedIn: "root"
})

export class TopProductsSellingState {

    private topProducts: TopProductsSelling[]
    private subject: ReplaySubject<TopProductsSelling[]> = new ReplaySubject(1);

    setTopProducts(productSale: TopProductsSelling[]) {
        this.topProducts = productSale;
        this.notifyAll();
    }


    onProductListChange() {
        return this.subject;
    }

    private notifyAll() {
        this.subject.next(this.topProducts);
    }
}