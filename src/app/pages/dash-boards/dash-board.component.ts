import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TopProductsSelling } from 'src/app/core/models/TopProductSelling';
import { CommerceFacade } from 'src/app/facades/CommerceFacade';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})

export class DashBoardComponent {

  form: FormGroup;
  productsSelling:TopProductsSelling[]
  totalPriceOfSales:number;


  constructor(formBuilder: FormBuilder, private commerceFacade: CommerceFacade) {
    this.form = formBuilder.group({
      qualification: []
    })

    this.commerceFacade.getTopProducts("5")
    this.commerceFacade.getTopProducts("").subscribe((data:TopProductsSelling[]) => {
      this.productsSelling = data
      this.totalPriceOfSales = data.reduce((acc,el)=> {
        acc += Number(el.totalPrice)
        return acc
      },0)
    })
  }

  getTopProducts() {
    const rank = this.form.get("qualification").value;
    this.commerceFacade.getTopProducts(rank)
  }
}

