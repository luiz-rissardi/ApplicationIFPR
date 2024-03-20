import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientException } from 'src/app/core/exceptions/ClientExeption';
import { ServiceBase } from '../shared/serviceBase';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends ServiceBase {

  constructor(http: HttpClient) {
    super(http)
  }

  handlerClient(phone: string, orderId: string) {
    try {
      const body = { orderId, phone };
      return this.http.post(this.uri + "/client", body, this.options);
    } catch (error) {
      throw new ClientException("não foi possivel anexar o cliente")
    }
  }

  getClient(phone: string) {
    try {
      return this.http.get(this.uri + "/client/" + phone, this.options);
    } catch (error) {
      throw new ClientException("não foi possivel anexar o cliente")
    }
  }

}
