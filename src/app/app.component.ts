import { Component } from '@angular/core';
import { StockFacade } from './abstractionLayer/StockFacade';
import { ProductsListState } from './core/states/ProductsListState';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Project';
  //get data of database
  constructor(private stockFacade:StockFacade,private productListState:ProductsListState){
    this.stockFacade.findAllProducts().subscribe(data =>{
      this.productListState.setProductList(data);
    })
  }
}
