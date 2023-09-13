import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from 'src/app/core/models/productModel';
import { StockExceptions } from 'src/app/core/exceptions/StockExceptions';


@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

  createProduct(product: ProductModel) {
    try {

      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      };
      const options = { headers: headers };
      
      return this.http.get("http://localhost:8723/api/getAllProducts",options)
    } catch (error:any) {
      throw new StockExceptions(`não foi possível criar um novo usuário => ${error.message}`)
    }
  }

}
