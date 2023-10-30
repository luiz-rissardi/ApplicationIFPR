import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from 'src/app/core/models/productModel';
import { StockException } from 'src/app/core/exceptions/StockExceptions';



@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }

  private headers = {
    'Content-Type': 'application/json',
  };

  createProduct(product: ProductModel) {
    try {
      const options = { headers: this.headers };
      return this.http.post("http://localhost:8723/api/createProduct", product, options);
    } catch (error: any) {
      throw new StockException(`não foi possível criar um novo usuário => ${error.message}`)
    }
  }

  substractionStock(updates:any){
    try {
      const options = { headers:this.headers };
      return this.http.post("http://localhost:8723/api/substractionStock",{ updates }, options);
    } catch (error) {
      throw new StockException("não foi possivel subtrair do estoque");
    }
  }

  getAllProduct() {
    try {
      return this.http.get("http://localhost:8723/api/getAllProducts");
    } catch (error: any) {
      throw new StockException(`não foi possivel buscar todos os dados => ${error.message}`)
    }
  }

  updateProduct(product: ProductModel) {
    try {
      const options = { headers: this.headers };
      const body = { productId: product.productId, product }
      return this.http.put("http://localhost:8723/api/updateProduct", body, options);
    } catch (error: any) {
      throw new StockException(`não foi possivel atualizar o usuário => ${error.message}`)
    }
  }
}
