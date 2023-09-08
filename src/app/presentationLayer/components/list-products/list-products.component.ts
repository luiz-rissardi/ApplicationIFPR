import { Component } from '@angular/core';
import { ProductModel } from 'src/app/core/models/productModel';
import { Router } from '@angular/router';
import { ProdudtState } from 'src/app/core/states/ProductState';


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})

export class ListProductsComponent {

  public windowWidth:number = window.innerWidth;
  public productChosen!:ProductModel;  
  private productState:ProdudtState;

  constructor(private router:Router,productState:ProdudtState){
    this.productState = productState;
  }

  chosenProduct(product:ProductModel){
    this.productChosen = product;
  }

  delectProduct(){
    
  }

  updateProduct(product:ProductModel){
    this.productState.setState(product)
    this.router.navigate(["/Product"])
  }

}
