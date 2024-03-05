import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { StockFacade } from 'src/app/facades/StockFacade';
import { Product } from 'src/app/core/models/productModel';
import { LoaderSpinnerState } from 'src/app/core/states/LoaderSpinnerState';
import { ProductState } from 'src/app/core/states/ProductState';
import { ProductsListState } from 'src/app/core/states/ProductsListState';

@Component({
  selector: 'app-update-product-form',
  templateUrl: './update-product-form.component.html',
  styleUrls: ['./update-product-form.component.scss']
})
export class UpdateProductFormComponent {

  public formProduct!: FormGroup;

  constructor(
    private Builder: FormBuilder,
    private productState: ProductState,
    private productListState: ProductsListState,
    private spinnerState: LoaderSpinnerState,
    private stockFacade: StockFacade) {

    this.formProduct = this.Builder.group({
      productId: [null],
      productName: [null],
      quantity: [null],
      price: [null],
      productChosen:[null]
    })

    this.productState.getStateWhenChanging()
      .subscribe((product: Product) => {
        this.formProduct.setValue({
          productName: product.productName,
          price: product.price,
          quantity: product.quantity,
          productId: product.productId,
          productChosen:product.productChosen
        })
      })
  }

  PutProduct() {
    this.spinnerState.setState(true);
    const { productName, quantity, price, productId, productChosen } = this.formProduct.value;
    const execute = this.productListState.putProductIntoList({ productName, quantity, price, productId, active: true, productChosen })
    const rollback = execute();
    try {
      this.stockFacade.updateProduct({ productName, quantity, price, productId, active: true, productChosen });
    } catch (error) {
      rollback();
    }
  }
}
