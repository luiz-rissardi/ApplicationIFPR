import { Injectable } from "@angular/core"
import { ProductModel } from "../models/productModel";
import { ReplaySubject, Subject } from "rxjs"

@Injectable({
    providedIn:"root"
})

export class ProductState {
    private subject:ReplaySubject<ProductModel> = new ReplaySubject<ProductModel>(2);

    public setState(product:ProductModel):void{
        this.notifyAll(product);
    }

    public getStateWhenChanging():Subject<ProductModel>{
        return this.subject;
    }

    private notifyAll(product:ProductModel):void{
        this.subject.next(product)
    }


}