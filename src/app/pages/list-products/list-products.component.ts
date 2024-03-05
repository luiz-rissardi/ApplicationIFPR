import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/productModel';
import { Router } from '@angular/router';
import { ProductState } from 'src/app/core/states/ProductState';
import { StockFacade } from 'src/app/facades/StockFacade';
import { ProductsListState } from 'src/app/core/states/ProductsListState';
import { LoaderSpinnerState } from 'src/app/core/states/LoaderSpinnerState';


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})

export class ListProductsComponent implements OnInit {

  public windowWidth: number = window.innerWidth;
  public productChosen!: Product;
  public products: Product[] = [];
  public modalIsOpen: boolean = window.innerWidth <= 765 ? true : false;

  constructor(
    private router: Router,
    private spinnerState:LoaderSpinnerState,
    private productState: ProductState, 
    private productsListState: ProductsListState,
    private stockFacade:StockFacade) {
  }

  ngOnInit(): void {
    this.productsListState.onProductListChange().subscribe(data => {
      this.products.length = 0;
      data.forEach((product:Product) =>{
        this.products.push(product);
      })
    })
  }

  chosenProduct(product: Product) {
    this.productChosen = product;
  }

  updateProduct(product: Product) {
    this.productState.setState(product)
    this.router.navigate(["/home/updateProduct/"])
  }

  inactiveProduct(product:Product){
    this.spinnerState.setState(true);
    const execute = this.productsListState.deleteProductIntoList(product);
    const rollback = execute();
    try {
      product.productChosen = product.productChosen == 0?false:true;
      this.stockFacade.inactiveProduct(product);
    } catch (error) {
      rollback();
    }
  }

}
