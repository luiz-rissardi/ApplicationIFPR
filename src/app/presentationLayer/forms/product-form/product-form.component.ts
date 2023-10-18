import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { StockFacade } from 'src/app/abstractionLayer/StockFacade';
import { ProductModel } from 'src/app/core/models/productModel';
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

  constructor(private routeConfig: ActivatedRoute, private route: Router, productState: ProductState, private Builder: FormBuilder, private productListState: ProductsListState, private stockFacade: StockFacade) {
    try {

      this.formProduct = this.Builder.group({
        productId: [null],
        productName: [null],
        quantity: [null],
        price: [null]
      })

      productState.getStateWhenChanging()
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
      id?undefined:this.formProduct.setValue({ productName: "", price: null, quantity: null, productId: 0 });
    })
  }

  cancel() {
    this.route.navigate([""])
  }

  CreateProduct() {
    const { productName, quantity, price } = this.formProduct.value;
    const execute = this.productListState.addProductIntoList({ productName, quantity, price, productId: 0, active:true})
    const rollback = execute();
    try {
      this.stockFacade.createProduct({ productId: 0, productName, price, quantity, active:true});
    } catch (error) {
      rollback();
    }
  }

  PutProduct() {
    const { productName, quantity, price, productId } = this.formProduct.value;
    const execute = this.productListState.putProductIntoList({ productName, quantity, price, productId, active:true})
    const rollback = execute();
    try {
      this.stockFacade.updateProduct({ productName, quantity, price, productId, active:true });
    } catch (error) {
      rollback();
    }
  }

}
