import { Component, Inject } from '@angular/core';
import { CommerceFacade } from 'src/app/facades/CommerceFacade';
import { getProductIdUserAnexed } from 'src/app/core/storage/sessionStorage';
import { ProductSales } from 'src/app/core/models/producSaleModel';
import { WarningHandlerService } from 'src/app/core/services/warningHandler/warning-handler.service';
import { Handler } from 'src/app/core/services/interfaces/warningHandler/handler';
import { FormBuilder, FormControl } from '@angular/forms';
import { UserFacade } from 'src/app/facades/UserFacade';
import { AccountState } from 'src/app/core/states/AccountState';
import { Account } from 'src/app/core/models/AccountModel';

@Component({
  selector: 'app-ticket-manager',
  templateUrl: './ticket-manager.component.html',
  styleUrls: ['./ticket-manager.component.scss']
})
export class TicketManagerComponent {

  private productId: number;
  controlCommand:FormControl;
  productSales: ProductSales;
  amountToRemove: number = 0;
  

  constructor(
    formBuiler: FormBuilder,
    private commerceFacade: CommerceFacade,
    private userState:AccountState,
    @Inject(WarningHandlerService) private warningHandler: Handler,
  ) {
    this.controlCommand = formBuiler.control(null);
    this.productId = Number(getProductIdUserAnexed());
    if(Number.isNaN(this.productId)){
      this.userState.onChangeAccount().subscribe((data: Account) => {
        this.productId = data.productIdAnexed;
      })
    }
  }

  getProductSales(){
    const command = Number(this.controlCommand.value)
    
    if(!Number.isNaN(command)){
      this.commerceFacade.getProductsOfSale(command,this.productId).subscribe((data:ProductSales) => {
        this.productSales = data
        if(!data){
          this.warningHandler.reportError("Usuário sem produtos")
        }
      })
    }
    else{
      this.warningHandler.reportError("por favor informe o numero da comanda")
    }
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

  confirmRemove() {
    this.productSales.quantity -= this.amountToRemove;
    this.commerceFacade.recordProductSale(this.productSales.orderId, this.productSales.productId, this.amountToRemove)
    this.amountToRemove = 0;
  }

}
