import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from 'src/app/core/models/productModel';
import { ProductSaleException } from 'src/app/core/exceptions/ProductSaleException';

@Injectable({
  providedIn: 'root'
})
export class ProductSalesService {

  private headers = {
    'Content-Type': 'application/json'
  }

  constructor(private http: HttpClient) { }

  insertProductsIntoSale(saleId: string, products: ProductModel[]) {
    try {
      const options = { headers: this.headers };
      const body = { saleId, products };
      return this.http.post("http://localhost:8723/api/insertProducts",body,options);
    } catch (error) {
      throw new ProductSaleException("não foi possivel inserir os produtos na venda");
    }
  }

}
