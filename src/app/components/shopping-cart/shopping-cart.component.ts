import { Component, Renderer2, ElementRef, OnInit, Inject } from '@angular/core';
import { Product } from 'src/app/core/models/productModel';
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

  public productsOfShoppingCart: Map<number, Product> = new Map();
  private products: Map<number, Product> = new Map();

  constructor(
    @Inject(WarningHandlerService) private listenHander: Handler,
    private shoppingCartState: ShoppingCartState,
    private productsListState: ProductsListState,
    private stockFacade: StockFacade,
    private commerceFacade: CommerceFacade,
    private spinnerState: LoaderSpinnerState,
    dom: Renderer2,
    el: ElementRef) {
    super(el, dom);
  }

  ngOnInit(): void {
    this.shoppingCartState.onChangeShoppingCart()
      .subscribe(data => {
        this.openShoppingCart();
        this.setShoppingCart(data);
      })

    this.productsListState.onProductListChange().subscribe(data => {
      this.products.clear();
      data.forEach((product: Product) => {
        this.products.set(product.productId, product)
      })
    })
  }

  mapEntries(arr: Map<number, Product>): Product[] {
    return Array.from(arr.values())
  }

  isProduct(item: any): item is Product {
    return item instanceof Object && 'active' in item;
  }

  addOneItem(product: Product) {
    if (this.checkQuantityForSale(product)) {
      this.shoppingCartState.addToCart(product);
    } else {
      this.listenHander.reportError("produto com quantiedade insuficiente");
      this.addClassToElement(`product-${product.productId}`, "productInvalid");
      setTimeout(() => {
        this.removeClassToElement(`product-${product.productId}`, "productInvalid");
      }, 1500);
    }
  }

  removeOneItem(product: Product) {
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
      this.listenHander.reportSuccess("venda cancelada", "valid")
    } catch (error) {
      this.listenHander.reportError("não foi possivel remover os produtos");
    }
  }

  async confirmSale() {
    try {
      const phone:string = this.findElement("phone").value;
      if( phone == undefined || phone.length <= 10){
        this.listenHander.reportError("telefone inválido");
        return;
      }
      this.spinnerState.setState(true);
      let productsOsShoppingCart = this.shoppingCartState.getAllProducts();
      productsOsShoppingCart = productsOsShoppingCart.map(el => ({ ...el, active: el.active ? true : false, productChosen: el.productChosen ? true : false }));
      this.commerceFacade.insertSale(productsOsShoppingCart,phone);
      this.stockFacade.SubstractItem(this.mapEntries(this.products), productsOsShoppingCart);
      this.removeAllItensOfShoppingCart();
      this.closeShoppingCart();
    } catch (error) {
      this.listenHander.reportError("não foi possive realizar venda");
    }
  }

  closeShoppingCart() {
    this.removeClassToElement("backgroundCurtain", "showBackgroundCurtain");
    this.setAttributeStyle("shoppingCart", "display", "none");
    this.removeClassToElement("shoppingCart", "show");
    this.addClassToElement("shoppingCart", "hidden");
  }

  openShoppingCart() {
    this.addClassToElement("backgroundCurtain", "showBackgroundCurtain");
    this.setAttributeStyle("shoppingCart", "display", "block");
    this.removeClassToElement("shoppingCart", "hidden");
    this.addClassToElement("shoppingCart", "show");
  }

  private removeAllItensOfShoppingCart() {
    this.productsOfShoppingCart.forEach(product => {
      this.shoppingCartState.removeItem(product);
      document.getElementById(`product-${product.productId}`).classList.remove('product-active')
    })
  }


  private setShoppingCart(data: Map<number, Product>) {
    this.productsOfShoppingCart = new Map([...data]);
    if (this.productsOfShoppingCart.size - 1 < 0) {
      this.closeShoppingCart();
    } else {
      this.openShoppingCart();
    }
  }

  private checkQuantityForSale(product: Product): boolean {
    const productOfListQtde = this.products.get(product.productId).quantity;
    const productOfShoopingCart = this.productsOfShoppingCart.get(product.productId).quantity;
    return productOfListQtde - productOfShoopingCart > 0
  }

}
