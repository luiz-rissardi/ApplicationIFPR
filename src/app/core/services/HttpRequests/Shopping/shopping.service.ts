import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShoppingException } from 'src/app/core/exceptions/ShoppingExceptions';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor(private http: HttpClient) { }

  private headers = {
    'Content-Type': 'application/json',
  };

  createSale() {
    try {
      const options = { headers: this.headers };
      return this.http.post("http://localhost:8723/api/insertNewSale",{},options);
    } catch (error) {
      throw new ShoppingException("não foi possivel criar uma nova venda")
    }
  }

}

