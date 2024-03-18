import { Component, Inject } from '@angular/core';
import { CommerceFacade } from 'src/app/facades/CommerceFacade';
import { getProductsIdUserAnexed } from 'src/app/core/storage/sessionStorage';
import { OrderProducts } from 'src/app/core/models/OrderProductModel';
import { WarningHandlerService } from 'src/app/core/services/warningHandler/warning-handler.service';
import { Handler } from 'src/app/core/services/interfaces/warningHandler/handler';
import { FormBuilder, FormControl } from '@angular/forms';
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
  OrderProducts: OrderProducts;
  amountToRemove: number = 0;
  

  constructor(
    formBuiler: FormBuilder,
    private commerceFacade: CommerceFacade,
    private userState:AccountState,
    @Inject(WarningHandlerService) private warningHandler: Handler,
  ) {
    this.controlCommand = formBuiler.control(null);
    this.productId = Number(getProductsIdUserAnexed());
    if(Number.isNaN(this.productId)){
      this.userState.onChangeAccount().subscribe((data: Account) => {
        this.productId = data.productIdAnexed;
      })
    }
  }

  getOrderProducts(){
    const command = Number(this.controlCommand.value)
    
    if(!Number.isNaN(command)){
      // this.commerceFacade.getProductssOfOrder("command",this.productId).subscribe((data:OrderProducts) => {
      //   this.OrderProducts = data
      //   if(!data){
      //     this.warningHandler.reportError("Usuário sem produtos")
      //   }
      // })
    }
    else{
      this.warningHandler.reportError("por favor informe o numero da comanda")
    }
  }

  addToRemove() {
    if (this.amountToRemove < this.OrderProducts?.quantity) {
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
    this.OrderProducts.quantity -= this.amountToRemove;
    this.commerceFacade.recordProductsOrder(this.OrderProducts.orderId, this.OrderProducts.productId, this.amountToRemove)
    this.amountToRemove = 0;
  }

}
