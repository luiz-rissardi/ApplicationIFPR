import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';

import { ProductModel } from 'src/app/core/models/productModel';
import { ProductsListState } from 'src/app/core/states/ProductsListState';
import { ShoppingCartState } from 'src/app/core/states/ShoppingCartState';
import { DOMManipulation } from "src/app/shared/domManipulation/dommanipulation";

@Component({
  selector: 'app-commerce',
  templateUrl: './select-products.component.html',
  styleUrls: ['./select-products.component.scss']
})
export class SelectProductsComponent extends DOMManipulation implements OnInit,OnDestroy {

  public products: ProductModel[] = [];

  constructor(
    private productsListState: ProductsListState,
    private shoppingCartState: ShoppingCartState,
    el: ElementRef,
    dom: Renderer2
  ) {
    super(el, dom);
  }
  ngOnDestroy(): void {
    this.shoppingCartState.removeAll();
  }

  ngOnInit(): void {
    this.productsListState.onProductListChange().subscribe(data => {
      this.products.length = 0;
      data.forEach((product: ProductModel) => {
        this.products.push(product)
      })
    })
  }

  selectProduct(product: ProductModel) {
    if (product.quantity > 0) {
      const isSelected = this.elementContais(`product-${product.productId}`, "product-active")
      if (isSelected) {
        this.shoppingCartState.removeItem(product);
        this.removeClassToElement(`product-${product.productId}`, "product-active")
      } else {
        this.shoppingCartState.addToCart(product);
        this.addClassToElement(`product-${product.productId}`, 'product-active');
      }
    }
  }

}
