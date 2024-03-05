import { Component } from '@angular/core';
import jsQR from 'jsqr';
import qrcode from 'qrcode-generator';
import { Router } from '@angular/router';
import { CommerceFacade } from 'src/app/facades/CommerceFacade';
import { getProductIdUserAnexed } from 'src/app/core/storage/sessionStorage';
import { ProductsSalesState } from 'src/app/core/states/ProductSalesState';
import { ProductSales } from 'src/app/core/models/producSaleModel';

@Component({
  selector: 'app-ticket-manager',
  templateUrl: './ticket-manager.component.html',
  styleUrls: ['./ticket-manager.component.scss']
})
export class TicketManagerComponent {

  private productId: number

  constructor(
    private commerceFacade: CommerceFacade,
    private productSalesState:ProductsSalesState,
    private router: Router
  ) {
    this.productId = Number(getProductIdUserAnexed());
  }

  scan() {

    this.commerceFacade.getProductsOfSale("2ccff0d4-8228-4fc6-bb5f-d21c2f02c693", 11).subscribe((data:ProductSales) => {
      this.productSalesState.setProductSales(data)
      this.router.navigate(["/home/sale"])
    })

    // const qr = qrcode(0,"M");
    // qr.addData("a9afd6f9-6579-440d-9ae3-910dfec4b225")
    // qr.make();
    // const qrCodeData = qr.createImgTag();
    // const qrCodeContainer = document.getElementById('qrCodeContainer');
    // qrCodeContainer.innerHTML = qrCodeData;


    // const cameraView: HTMLVideoElement = document.getElementsByTagName('video')[0];
    // navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    //   .then((stream) => {
    //     cameraView.srcObject = stream;
    //     requestAnimationFrame(this.tick(cameraView))
    //   })
    //   .catch(function (err) {
    //     console.error('Erro ao acessar a câmera: ', err);
    //   });
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
      if (code) {
        // this.commerceFacade.getProductsOfSale(code.data, this.productId).subscribe(data => {
        //   this.productSalesState.setProductSales(data)
        //   this.router.navigate(["/home/sale"])
        // })
      }
      requestAnimationFrame(this.tick(video));
    };

  }
}
