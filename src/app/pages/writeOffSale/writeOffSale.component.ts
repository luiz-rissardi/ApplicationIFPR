import { Component, Inject } from '@angular/core';
import { ProductSales } from 'src/app/core/models/producSaleModel';
import { Handler } from 'src/app/core/services/interfaces/warningHandler/handler';
import { WarningHandlerService } from 'src/app/core/services/warningHandler/warning-handler.service';
import { ProductsSalesState } from 'src/app/core/states/ProductSalesState';
import { CommerceFacade } from 'src/app/facades/CommerceFacade';

@Component({
  selector: 'app-write-off-sale',
  templateUrl: './writeOffSale.component.html',
  styleUrls: ['./writeOffSale.component.scss']
})
export class WriteOffSaleComponent {

  productSales: ProductSales;
  
  amountToRemove: number = 0;


  constructor(
    private productSalesState: ProductsSalesState,
    @Inject(WarningHandlerService) private warningHandler: Handler,
    private commerceFacade:CommerceFacade
  ) {
    this.productSalesState.onProductListChange().subscribe((data: ProductSales) => {
      this.productSales = data
    })
  }

  addToRemove() {
    if (this.amountToRemove < this.productSales?.quantity) {
      this.amountToRemove++;
    } else {
      this.warningHandler.reportError("quantiedade máxima atingida")
    }
  }

  lessToRemove() {
    if (this.amountToRemove > 1) {
      this.amountToRemove--;
    } else {
      this.warningHandler.reportError("quantiedade minima atingida")
    }
  }

  confirmRemove(){
    this.productSales.quantity -= this.amountToRemove;
    this.commerceFacade.recordProductSale(this.productSales.saleId,this.productSales.productId,this.amountToRemove)
    this.amountToRemove = 0;
  }

}
