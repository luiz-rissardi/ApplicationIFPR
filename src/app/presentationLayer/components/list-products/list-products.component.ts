import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/core/models/productModel';
import { Router } from '@angular/router';
import { ProductState } from 'src/app/core/states/ProductState';
import { StockFacade } from 'src/app/abstractionLayer/StockFacade';
import { ProductsListState } from 'src/app/core/states/ProductsListState';


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})

export class ListProductsComponent implements OnInit {

  public windowWidth: number = window.innerWidth;
  public productChosen!: ProductModel;
  public products: ProductModel[] = [];
  public modalIsOpen: boolean = window.innerWidth <= 765 ? true : false;
  private productState: ProductState;


  constructor(private router: Router, productState: ProductState, private productsListState: ProductsListState,private stockFacade:StockFacade) {
    this.productState = productState;
  }

  ngOnInit(): void {
    this.productsListState.onProductListChange().subscribe(data => {
      this.products.length = 0;
      data.forEach((product:ProductModel) =>{
        this.products.push(product);
      })
    })
  }

  chosenProduct(product: ProductModel) {
    this.productChosen = product;
  }

  updateProduct(product: ProductModel) {
    this.productState.setState(product)
    this.router.navigate(["/Product/" + product.productId])
  }

  inactiveProduct(product:ProductModel){
    const execute = this.productsListState.deleteProductIntoList(product);
    const rollback = execute();
    try {
      this.stockFacade.inactiveProduct(product);
    } catch (error) {
      rollback();
    }
  }

}
