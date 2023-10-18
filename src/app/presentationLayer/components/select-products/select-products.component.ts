import { Component, ElementRef, Inject, OnInit, Renderer2 } from '@angular/core';
import { StockFacade } from 'src/app/abstractionLayer/StockFacade';
import { ProductModel } from 'src/app/core/models/productModel';
import { Handler } from 'src/app/core/services/interfaces/warningHandler/handler';
import { WarningHandlerService } from 'src/app/core/services/warningHandler/warning-handler.service';
import { ProductsListState } from 'src/app/core/states/ProductsListState';

@Component({
  selector: 'app-select-products',
  templateUrl: './select-products.component.html',
  styleUrls: ['./select-products.component.scss']
})
export class SelectProductsComponent implements OnInit{

  public products: ProductModel[] = [];

  private productsChosen: Map<number, ProductModel> = new Map<number, ProductModel>();

  constructor(@Inject(WarningHandlerService) private listenHander: Handler, private dom: Renderer2, private el: ElementRef,private productsListState:ProductsListState) {
    this.productsListState.onProductListChange().subscribe( data =>{
      data.forEach((product:ProductModel) =>{
        this.products.push(product)
      })
    })
  }
  
  ngOnInit(): void {
    
  }

  selectProduct(product: ProductModel) {
    const el = this.el.nativeElement.querySelector(`#product-${product.productId}`, true)
    if (el.classList.contains('product-active')) {
      this.dom.removeClass(el, 'product-active');
      this.productsChosen.delete(product.productId)
    } else {
      this.dom.addClass(el, 'product-active');
      this.productsChosen.set(product.productId, product)
    }
  }

  deleteAllPorductsChosen() {
    try {
      this.productsChosen.forEach(product => {
        const el = this.dom.selectRootElement(`#product-${product.productId}`, true);
        this.dom.removeClass(el, "product-active")
      })
      this.productsChosen.clear();
      this.listenHander.reportSuccess("produtos removidos com sucesso","valid")
    } catch (error) {
      this.listenHander.reportError("não foi possivel remover os produtos")
    }
  }
}
