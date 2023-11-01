import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/core/models/productModel';
import { ShoppingCartState } from 'src/app/core/states/ShoppingCartState';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  products: Map<number, ProductModel> = new Map();

  constructor(private shoppingCartState: ShoppingCartState, private dom: Renderer2, private el: ElementRef) {
  }
  ngOnInit(): void {
    this.shoppingCartState.onChangeShoppingCart()
      .subscribe(data => {
        this.setShoppingCart(data);
      })
  }

  mapEntries() {
    return Array.from(this.products).flat().filter(el => !Number.isInteger(el))
  }

  isProduct(item: any): item is ProductModel {
    return item instanceof Object && 'active' in item;
  }

  addOneItem(product: ProductModel) {
    this.shoppingCartState.addToCart(product);
  }

  removeOneItem(product: ProductModel) {
    this.shoppingCartState.removeOneToCart(product);
    if (product.quantity < 0) {
      this.shoppingCartState.removeItem(product);
      this.products.delete(product.productId)
      document.getElementById(`product-${product.productId}`).classList.remove("product-active")
    }
  }

  private hiddenShoppingCart() {
    const el = this.el.nativeElement.querySelector(`#shoppingCart`, true);
    this.dom.removeClass(el, "show");
    this.dom.addClass(el, "hidden");
  }

  private showShoppingCart() {
    const el = this.el.nativeElement.querySelector(`#shoppingCart`, true);
    this.dom.addClass(el, "show");
    this.dom.removeClass(el, "hidden");
  }

  private setShoppingCart(data: Map<number, ProductModel>) {
    this.products = new Map([...data]);
    if (this.products.size - 1 < 0) {
      this.hiddenShoppingCart();
    } else {
      this.showShoppingCart();
    }
  }

}
