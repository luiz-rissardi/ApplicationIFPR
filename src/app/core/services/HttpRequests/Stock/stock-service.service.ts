import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/core/models/productModel';
import { StockException } from 'src/app/core/exceptions/StockExceptions';
import { ServiceBase } from '../shared/serviceBase';



@Injectable({
  providedIn: 'root'
})
export class StockService extends ServiceBase {

  constructor(http: HttpClient) {
    super(http)
  }

  createProduct(product: Product) {
    try {
      return this.http.post(this.uri + "/product", product, this.options);
    } catch (error: any) {
      throw new StockException(`não foi possível criar um novo usuário => ${error.message}`)
    }
  }

  substractionStock(updates: any) {
    try {
      return this.http.post(this.uri + "/product/substraction", { updates }, this.options);
    } catch (error) {
      throw new StockException("não foi possivel subtrair do estoque");
    }
  }

  getAllProduct() {
    try {
      return this.http.get(this.uri + "/product");
    } catch (error: any) {
      throw new StockException(`não foi possivel buscar todos os dados => ${error.message}`)
    }
  }

  updateProduct(product: Product) {
    try {
      const body = { productId: product.productId, product }
      return this.http.put(this.uri + "/product", body, this.options);
    } catch (error: any) {
      throw new StockException(`não foi possivel atualizar o usuário => ${error.message}`)
    }
  }
}
