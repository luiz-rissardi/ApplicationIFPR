import { Component, ElementRef, Inject, OnInit, Renderer2 } from '@angular/core';
import { CommerceFacade } from 'src/app/abstractionLayer/CommerceFacade';
import { ProductModel } from 'src/app/core/models/productModel';
import { Handler } from 'src/app/core/services/interfaces/warningHandler/handler';
import { WarningHandlerService } from 'src/app/core/services/warningHandler/warning-handler.service';
import { ProductsListState } from 'src/app/core/states/ProductsListState';
import { ShoppingCartState } from 'src/app/core/states/ShoppingCartState';

@Component({
  selector: 'app-select-products',
  templateUrl: './select-products.component.html',
  styleUrls: ['./select-products.component.scss']
})
export class SelectProductsComponent implements OnInit {

  public products: ProductModel[] = [];

  constructor(@Inject(WarningHandlerService) private listenHander: Handler, private commerce:CommerceFacade, private dom: Renderer2, private el: ElementRef, private productsListState: ProductsListState, private shoppingCartState: ShoppingCartState) {
    this.productsListState.onProductListChange().subscribe(data => {
      data.forEach((product: ProductModel) => {
        this.products.push(product)
      })
    })
  }

  ngOnInit(): void {

  }

  selectProduct(product: ProductModel) {
    const el = this.el.nativeElement.querySelector(`#product-${product.productId}`, true);
    const isSelected = el.classList.contains('product-active');
    if (isSelected) {
      this.removeItemOfShoppingCart(el, product);
    } else {
      this.addItemOfShoppingCart(el, product);
    }
  }

  cancel() {
    try {
      this.products.forEach(product => {
        const el = this.dom.selectRootElement(`#product-${product.productId}`, true);
        this.removeItemOfShoppingCart(el,product);
      })
      this.listenHander.reportSuccess("produtos removidos com sucesso", "valid")
    } catch (error) {
      this.listenHander.reportError("não foi possivel remover os produtos")
    }
  }

  confirmSale(){
    try {
      let products = this.shoppingCartState.getAllProducts();
      products = products.map(el => ({...el,active:el.active?true:false}));
      this.commerce.insertSale(products);
    } catch (error) {
      this.listenHander.reportError("não foi possive realizar venda");
    }
  }

  private removeItemOfShoppingCart(el: ElementRef, product: ProductModel) {
    this.shoppingCartState.removeItem(product);
    this.dom.removeClass(el, 'product-active');
  }

  private addItemOfShoppingCart(el: ElementRef, product: ProductModel) {
    this.shoppingCartState.addToCart(product);
    this.dom.addClass(el, 'product-active');
  }

}

