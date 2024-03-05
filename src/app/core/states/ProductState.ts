import { Injectable } from "@angular/core"
import { Product } from "../models/productModel";
import { ReplaySubject, Subject } from "rxjs"

@Injectable({
    providedIn:"root"
})

export class ProductState {
    private subject:ReplaySubject<Product> = new ReplaySubject<Product>(2);

    public setState(product:Product):void{
        product.productChosen = product.productChosen == 0?false:true;
        this.notifyAll(product);
    }

    public getStateWhenChanging():Subject<Product>{
        return this.subject;
    }

    private notifyAll(product:Product):void{
        this.subject.next(product)
    }


}