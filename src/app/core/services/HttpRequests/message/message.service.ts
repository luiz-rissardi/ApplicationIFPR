import { Injectable } from '@angular/core';
import { ServiceBase } from '../shared/serviceBase';
import { HttpClient } from '@angular/common/http';
import { MessageException } from 'src/app/core/exceptions/MessageExeption';

@Injectable({
  providedIn: 'root'
})
export class MessageService extends ServiceBase{

  constructor(http:HttpClient) {
    super(http);
  }

  sendQrcodeToClient(to:string,qrCodeUrl:string){
    try {
      const body = {to,qrCodeUrl, from:"15737495198"};
      console.log(body);
      this.http.post(this.uri+"/message",body,this.options).subscribe(data => {
        console.log(data);
      });
    } catch (error) {
      throw new MessageException("não foi possivel enviar o qr code para o cliente");
    }
  }

}
