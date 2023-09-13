import { Injectable,Inject } from '@angular/core';
import { StockService } from '../core/services/HttpRequests/Stock/stock-service.service';
import { ProductModel } from '../core/models/productModel';
import { WarningHandlerService } from '../core/services/warningHandler/warning-handler.service';
import { Handler } from '../core/services/interfaces/warningHandler/handler';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StockFacade{
    constructor(private service:StockService, @Inject(WarningHandlerService) private warningHandler:Handler ){

    }

    createProduct(product:ProductModel){
        try {
            const data = this.service.createProduct(product);
            console.log(data);
            data.subscribe((data:any)=>{
                console.log("data=>",data);
                this.warningHandler.reportSuccess("produto criado com sucesso!")
            })
        } catch (error) {
            this.warningHandler.reportError("não foi possível criar o produto!")
        }
    }
}