import { Component, ElementRef, ViewChild } from '@angular/core';
import jsQR from 'jsqr';
import qrcode from 'qrcode-generator';

@Component({
  selector: 'app-ticket-manager',
  templateUrl: './ticket-manager.component.html',
  styleUrls: ['./ticket-manager.component.scss']
})
export class TicketManagerComponent {
  

  constructor() {}

  scan() {
    // const qr = qrcode(0,"M");
    // qr.addData("cc339596-53ea-4e1e-a0d9-b2ddfc862970")
    // qr.make();
    // const qrCodeData = qr.createImgTag();
    // const qrCodeContainer = document.getElementById('qrCodeContainer');
    //     qrCodeContainer.innerHTML = qrCodeData;
    this.startCamera()  
  }

  private startCamera() {
     const cameraView: HTMLVideoElement = document.getElementsByTagName('video')[0];
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        cameraView.srcObject = stream;
        requestAnimationFrame(this.tick(cameraView))
      })
      .catch(function (err) {
        console.error('Erro ao acessar a câmera: ', err);
      });
  }

  private tick(video: HTMLVideoElement) {
    return async () => {
      const canvasElement = document.createElement('canvas');
      canvasElement.width = 200;
      canvasElement.height = 200;
      const context = canvasElement.getContext('2d');
      context.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

      const imageData = context.getImageData(0, 0, canvasElement.width, canvasElement.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      console.log(code);
      if (code) {
        console.log('QR Code detected: ', code.data);
      }
      requestAnimationFrame(this.tick(video));
    };
  }
}
