import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { StockFacade } from 'src/app/abstractionLayer/StockFacade';
import { ProductModel } from 'src/app/core/models/productModel';
import { LoaderSpinnerState } from 'src/app/core/states/LoaderSpinnerState';
import { ProductState } from 'src/app/core/states/ProductState';
import { ProductsListState } from 'src/app/core/states/ProductsListState';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})

export class ProductFormComponent implements OnInit {

  public formProduct!: FormGroup;
  public isUpdate: boolean = false;

  constructor(
    private routeConfig: ActivatedRoute,
    private route: Router,
    private Builder: FormBuilder,
    private productState: ProductState,
    private productListState: ProductsListState,
    private spinnerState: LoaderSpinnerState,
    private stockFacade: StockFacade) {
    try {

      this.formProduct = this.Builder.group({
        productId: [null],
        productName: [null],
        quantity: [null],
        price: [null]
      })

      this.productState.getStateWhenChanging()
        .subscribe((product: ProductModel) => {
          this.formProduct.setValue({
            productName: product.productName,
            price: product.price,
            quantity: product.quantity,
            productId: product.productId
          })
        })
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit(): void {
    this.routeConfig.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.isUpdate = id ? true : false;
      id ? undefined : this.formProduct.setValue({ productName: "", price: null, quantity: null, productId: 0 });
    })
  }

  cancel() {
    this.route.navigate(["/home"])
  }

  async CreateProduct() {
    this.spinnerState.setState(true);
    const { productName, quantity, price } = this.formProduct.value;
    try {
      const productId = await this.stockFacade.createProduct({ productId: 1, productName, price, quantity, active: true });
      const execute = this.productListState.addProductIntoList({ productName, quantity, price, productId, active: true })
      execute();
      this.spinnerState.setState(false);
    } catch (error) {
      console.log(error);
    }
  }

  PutProduct() {
    this.spinnerState.setState(true);
    const { productName, quantity, price, productId } = this.formProduct.value;
    const execute = this.productListState.putProductIntoList({ productName, quantity, price, productId, active: true })
    const rollback = execute();
    try {
      this.stockFacade.updateProduct({ productName, quantity, price, productId, active: true });
    } catch (error) {
      rollback();
    }
  }

}
