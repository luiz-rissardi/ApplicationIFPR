import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserException } from 'src/app/core/exceptions/UserException';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  private Headers = {
    'Content-Type': 'application/json'
  }

  login(userName: string, password: string) {
    try {
      const body = {
        userName, password
      };

      const options = {
        headers: this.Headers
      };

      return this.http.post("http://localhost:8723/api/login", body, options);
    } catch (error) {
      throw new UserException("não foi possivel realizar o login")
    }
  }

  createAccount(account: any) {
    try {
      const options = {
        headers: this.Headers
      };

      const body = {
        userName: account.userName,
        password: account.password,
        productIdAnexed: account.productIdAnexed
      }

      return this.http.post("http://localhost:8723/api/createAccount", body, options);
    } catch (error) {
      throw new UserException("não foi possivel criar nova conta")
    }
  }

  updatePassword(userName: string, password: string) {
    try {
      const options = {
        headers: this.Headers
      }

      const body = {
        userName, password
      }

      return this.http.put("http://localhost:8723/api/updatePassword",body,options);
    } catch (error) {
      throw new UserException("não foi possivel mudar a senha")
    }
  }

}
