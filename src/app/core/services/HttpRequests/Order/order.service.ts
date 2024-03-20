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

  createOrder(orderId: string, commandId: number) {
    try {
      const body = { orderId, commandId }
      return this.http.post(this.uri + "/order", body, this.options);
    } catch (error) {
      throw new OrderException("não foi possivel criar uma nova venda")
    }
  }

  inactiveOrder(commandId: number) {
    try {
      const body = { commandId };
      return this.http.patch(this.uri + "/order", body, this.options);
    } catch (error) {
      throw new OrderException("não foi possivel atualizar a venda")
    }
  }

  putCommandIntoOrder(orderId: string, newCommandId: number) {
    try {
      const body = { commandId:newCommandId,orderId };
      return this.http.put(this.uri + "/order", body, this.options);
    } catch (error) {
      throw new OrderException("não foi possivel atualizar a venda")
    }
  }

}

