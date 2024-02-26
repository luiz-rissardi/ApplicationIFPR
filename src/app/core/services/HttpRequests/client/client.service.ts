import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientException } from 'src/app/core/exceptions/ClientExeption';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private headers = {
    'Content-Type': 'application/json'
  }

  constructor(private http: HttpClient) { }

  handlerClient(phone: string, saleId: string) {
    try {
      const options = { headers: this.headers };
      const body = { saleId, phone };
      return this.http.post("http://localhost:8723/api/client", body, options);
    } catch (error) {
      throw new ClientException("não foi possivel anexar o cliente")
    }
  }
}
