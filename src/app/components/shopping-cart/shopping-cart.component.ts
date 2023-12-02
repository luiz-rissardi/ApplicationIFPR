import { Component, Renderer2, ElementRef, OnInit, Inject } from '@angular/core';
import { ProductModel } from 'src/app/core/models/productModel';
import { Handler } from 'src/app/core/services/interfaces/warningHandler/handler';
import { WarningHandlerService } from 'src/app/core/services/warningHandler/warning-handler.service';
import { LoaderSpinnerState } from 'src/app/core/states/LoaderSpinnerState';
import { ProductsListState } from 'src/app/core/states/ProductsListState';
import { ShoppingCartState } from 'src/app/core/states/ShoppingCartState';
import { CommerceFacade } from 'src/app/facades/CommerceFacade';
import { StockFacade } from 'src/app/facades/StockFacade';
import { DOMManipulation } from 'src/app/shared/domManipulation/dommanipulation';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent extends DOMManipulation implements OnInit {

  public productsOfShoppingCart: Map<number, ProductModel> = new Map();
  private products: ProductModel[] = [];

  constructor(
    @Inject(WarningHandlerService) private listenHander: Handler,
    private shoppingCartState: ShoppingCartState,
    private productsListState: ProductsListState,
    private stockFacade:StockFacade,
    private commerceFacade: CommerceFacade,
    private spinnerState: LoaderSpinnerState,
    dom: Renderer2,
    el: ElementRef) {
    super(el, dom);
  }

  ngOnInit(): void {
    this.shoppingCartState.onChangeShoppingCart()
      .subscribe(data => {
        this.setShoppingCart(data);
      })

    this.productsListState.onProductListChange().subscribe(data => {
      this.products.length = 0;
      data.forEach((product: ProductModel) => {
        this.products.push(product)
      })
    })
  }

  mapEntries() {
    return Array.from(this.productsOfShoppingCart).flat().filter(el => !Number.isInteger(el))
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
      this.productsOfShoppingCart.delete(product.productId);
      document.getElementById(`product-${product.productId}`).classList.remove("product-active");
    }
  }

  cancel() {
    try {
      this.removeAllItensOfShoppingCart();
      this.listenHander.reportSuccess("produtos removidos com sucesso", "valid")
    } catch (error) {
      console.log(error);
      this.listenHander.reportError("não foi possivel remover os produtos")
    }
  }

  async confirmSale() {
    try {
      this.spinnerState.setState(true);
      let productsOsShoppingCart = this.shoppingCartState.getAllProducts();
      productsOsShoppingCart = productsOsShoppingCart.map(el => ({ ...el, active: el.active ? true : false }));
      this.commerceFacade.insertSale(productsOsShoppingCart);
      this.stockFacade.SubstractItem(this.products, productsOsShoppingCart);
    } catch (error) {
      console.log(error);
      this.listenHander.reportError("não foi possive realizar venda");
    }
  }

  private removeAllItensOfShoppingCart() {
    this.productsOfShoppingCart.forEach(product => {
      this.shoppingCartState.removeItem(product);
      document.getElementById(`product-${product.productId}`).classList.remove('product-active')
    })
  }

  private hiddenShoppingCart() {
    this.removeClassToElement("shoppingCart", "show");
    this.addClassToElement("shoppingCart", "hidden");
  }

  private showShoppingCart() {
    this.removeClassToElement("shoppingCart", "hidden");
    this.addClassToElement("shoppingCart", "show")
  }

  private setShoppingCart(data: Map<number, ProductModel>) {
    this.productsOfShoppingCart = new Map([...data]);
    if (this.productsOfShoppingCart.size - 1 < 0) {
      this.hiddenShoppingCart();
    } else {
      this.showShoppingCart();
    }
  }

}
