import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/core/models/productModel';
import { ProdudtState } from 'src/app/core/states/ProductState';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})

export class ProductFormComponent implements OnDestroy {

  public product: ProductModel = {
    productId: 0,
    productPrice: 0,
    productQtde: 0,
    productName: ''
  };

  constructor(private route: Router, private productState: ProdudtState) {
    try {
      productState.getStateWhenChanging()
        .subscribe((product: ProductModel) => {
          this.product = product;
        })
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy(): void {
    this.productState.setState({
      productId: 0,
      productPrice: 0,
      productQtde: 0,
      productName: ''
    })
  }


  public cancel() {
    this.route.navigate([""])
  }
}
