import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/core/models/productModel';
import { ProductSaleException } from 'src/app/core/exceptions/ProductSaleException';
import { ServiceBase } from '../shared/serviceBase';

@Injectable({
  providedIn: 'root'
})
export class ProductSalesService extends ServiceBase {

  constructor(http: HttpClient) {
    super(http)
  }

  insertProductsIntoSale(saleId: string, products: Product[]) {
    try {
      const body = { saleId, products };
      return this.http.post(this.uri + "/product/sale", body, this.options);
    } catch (error) {
      throw new ProductSaleException("não foi possivel inserir os produtos na venda");
    }
  }

  getAllProductsOfSale(saleId: string, productId: number) {
    try {
      return this.http.get(this.uri + `/product/sale/${saleId}&${productId}`, this.options);
    } catch (error) {
      throw new ProductSaleException("não foi possivel pegar os produtos da venda");
    }
  }

  lessProductQuantityOfSale(saleId: string, productId: number, quantity: number) {
    try {
      const body = { saleId, productId, quantity };
      return this.http.post(this.uri + "/product/sale/remove", body, this.options);
    } catch (error) {
      throw new ProductSaleException("não foi possivel realizar baixa");
    }
  }

  getTopSellingProducts(rank: string) {
    try {
      return this.http.get(this.uri + `/product/top/${rank}`,this.options);
    } catch (error) {
      throw new ProductSaleException("não foi possivel pegar top produtos vendidos");
    }
  }

}
