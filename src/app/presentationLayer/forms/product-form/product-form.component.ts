import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StockFacade } from 'src/app/abstractionLayer/StockFacade';
import { ProductModel } from 'src/app/core/models/productModel';
import { ProdudtState } from 'src/app/core/states/ProductState';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})

export class ProductFormComponent implements OnDestroy {

  public formProduct!: FormGroup;

  constructor(private route: Router, productState: ProdudtState, private Builder:FormBuilder, private stockFacade:StockFacade) {
    try {

      this.formProduct = this.Builder.group({
        productName:[null],
        productQtde:[null],
        productPrice:[null]
      })

      productState.getStateWhenChanging()
        .subscribe((product: ProductModel) => {
          this.formProduct.setValue({
            productName:product.productName,
            productPrice:product.productPrice,
            productQtde:product.productQtde
          })
        })
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy(): void {
    this.formProduct.setValue({productName:"",productPrice:0,productQtde:0})
  }


  public cancel() {
    this.route.navigate([""])
  }

  public PutProduct(){
    const { productName,productQtde,productPrice } = this.formProduct.value;
    this.stockFacade.createProduct({ productId:0,productName,productPrice,productQtde })
  }
}
