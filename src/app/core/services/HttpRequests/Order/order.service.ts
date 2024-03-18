import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderException } from 'src/app/core/exceptions/OrderExceptions';
import { ServiceBase } from '../shared/serviceBase';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends ServiceBase {

  constructor(http: HttpClient) {
    super(http)
  }

  createOrder(orderId: string, commandId:number) {
    try {
      return this.http.post(this.uri + "/order", { orderId,commandId }, this.options);
    } catch (error) {
      throw new OrderException("não foi possivel criar uma nova venda")
    }
  }

}

