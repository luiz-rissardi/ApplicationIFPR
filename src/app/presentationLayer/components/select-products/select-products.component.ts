import { Component, ElementRef, Inject, OnInit, Renderer2 } from '@angular/core';
import { CommerceFacade } from 'src/app/abstractionLayer/CommerceFacade';
import { StockFacade } from 'src/app/abstractionLayer/StockFacade';
import { ProductModel } from 'src/app/core/models/productModel';
import { Handler } from 'src/app/core/services/interfaces/warningHandler/handler';
import { WarningHandlerService } from 'src/app/core/services/warningHandler/warning-handler.service';
import { LoaderSpinnerState } from 'src/app/core/states/LoaderSpinnerState';
import { ProductsListState } from 'src/app/core/states/ProductsListState';
import { ShoppingCartState } from 'src/app/core/states/ShoppingCartState';

@Component({
  selector: 'app-select-products',
  templateUrl: './select-products.component.html',
  styleUrls: ['./select-products.component.scss']
})
export class SelectProductsComponent implements OnInit {

  public products: ProductModel[] = [];

  constructor(
    @Inject(WarningHandlerService) private listenHander: Handler,
    private commerceFacade: CommerceFacade,
    private stockFacade: StockFacade,
    private dom: Renderer2,
    private el: ElementRef,
    private productsListState: ProductsListState,
    private spinnerState: LoaderSpinnerState,
    private shoppingCartState: ShoppingCartState) {
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
      const el = this.el.nativeElement.querySelector(`#product-${product.productId}`, true);
      const isSelected = el.classList.contains('product-active');
      if (isSelected) {
        this.removeItemOfShoppingCart(el, product);
      } else {
        this.addItemOfShoppingCart(el, product);
      }
    }
  }

  cancel() {
    try {
      this.removeAllItensOfShoppingCart();
      this.listenHander.reportSuccess("produtos removidos com sucesso", "valid")
    } catch (error) {
      this.listenHander.reportError("não foi possivel remover os produtos")
    }
  }

  async confirmSale() {
    try {
      this.spinnerState.setState(true);
      let products = this.shoppingCartState.getAllProducts();
      products = products.map(el => ({ ...el, active: el.active ? true : false }));
      const mapUpdates = this.updateScreen(products);
      this.commerceFacade.insertSale(products);
      this.stockFacade.substractionOfStock(mapUpdates);
    } catch (error) {
      console.log(error);
      this.listenHander.reportError("não foi possive realizar venda");
    }
  }

  private updateScreen(products: ProductModel[]) {
    const mapUpdates = this.mapSubstraction(products);
    this.products = this.mapAfterSubstraction(this.products, mapUpdates);
    this.productsListState.setProductList(this.products);
    this.shoppingCartState.removeAll();
    this.removeAllItensOfShoppingCart();
    return mapUpdates;
  }

  private removeItemOfShoppingCart(el: ElementRef, product: ProductModel) {
    this.shoppingCartState.removeItem(product);
    this.dom.removeClass(el, 'product-active');
  }

  private addItemOfShoppingCart(el: ElementRef, product: ProductModel) {
    this.shoppingCartState.addToCart(product);
    this.dom.addClass(el, 'product-active');
  }

  private removeAllItensOfShoppingCart() {
    this.products.forEach(product => {
      const el = this.dom.selectRootElement(`#product-${product.productId}`, true);
      this.removeItemOfShoppingCart(el, product);
    })
  }

  private mapSubstraction(products: ProductModel[]) {
    const map = products.map(el => ({ productId: el.productId, quantity: el.quantity }));
    return map;
  }

  private mapAfterSubstraction(products: ProductModel[], updates: any) {
    const map = products.map(el => {
      let obj = el;
      for (const update of updates) {
        if (el?.productId === update?.productId) {
          obj = { ...el, quantity: el.quantity - update.quantity };
        }
      }
      return obj;
    })
    return map
  }

}

