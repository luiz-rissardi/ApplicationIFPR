import { Component, OnInit } from '@angular/core';
import { StockFacade } from './abstractionLayer/StockFacade';
import { ProductsListState } from './core/states/ProductsListState';
import { LoaderSpinnerState } from './core/states/LoaderSpinnerState';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Project';
  //get data of database
  constructor(
    private stockFacade: StockFacade,
    private productListState: ProductsListState,
    private spinnerState: LoaderSpinnerState
  ) {
  }

  ngOnInit(): void {
    this.spinnerState.setState(true);
    this.stockFacade.findAllProducts().subscribe(data => {
      this.productListState.setProductList(data);
    })
  }
}
