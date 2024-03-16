import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShoppingException } from 'src/app/core/exceptions/ShoppingExceptions';
import { ServiceBase } from '../shared/serviceBase';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService extends ServiceBase {

  constructor(http: HttpClient) {
    super(http)
  }

  createSale(orderId: string) {
    try {
      return this.http.post(this.uri + "/sale", { orderId }, this.options);
    } catch (error) {
      throw new ShoppingException("não foi possivel criar uma nova venda")
    }
  }

}

