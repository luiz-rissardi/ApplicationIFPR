import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserException } from 'src/app/core/exceptions/UserException';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  private Headers = {
    'Content-Type': 'application/json'
  }

  login(userName:string,password:string){
    try {
      const body = {
        userName,password
      };

      const options = {
        headers:this.Headers
      };

      return this.http.post("http://localhost:8723/api/login",body,options);
    } catch (error) {
      throw new UserException("não foi possivel realizar o login")
    }
  }

}
