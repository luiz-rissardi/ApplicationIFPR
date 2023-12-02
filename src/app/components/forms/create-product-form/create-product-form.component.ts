import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { StockFacade } from 'src/app/facades/StockFacade';
import { LoaderSpinnerState } from 'src/app/core/states/LoaderSpinnerState';
import { ProductsListState } from 'src/app/core/states/ProductsListState';

@Component({
  selector: 'app-create-product-form',
  templateUrl: './create-product-form.component.html',
  styleUrls: ['./create-product-form.component.scss']
})
export class CreateProductFormComponent {

  public formProduct!: FormGroup;

  constructor(
    private Builder: FormBuilder,
    private productListState: ProductsListState,
    private spinnerState: LoaderSpinnerState,
    private stockFacade: StockFacade
    ) {
    this.formProduct = this.Builder.group({
      productId: [null],
      productName: [null],
      quantity: [null],
      price: [null]
    })
  }

  async CreateProduct() {
    this.spinnerState.setState(true);
    const { productName, quantity, price } = this.formProduct.value;
    try {
      const productId = await this.stockFacade.createProduct({ productId: 1, productName, price, quantity, active: true });
      const execute = this.productListState.addProductIntoList({ productName, quantity, price, productId, active: true })
      const rollback = execute();
      if(productId == undefined) rollback();
    } catch (error) {
      console.log(error);
    }
  }
}
