import { Component, ElementRef, Inject, Renderer2 } from '@angular/core';
import { ProductModel } from 'src/app/core/models/productModel';
import { Handler } from 'src/app/core/services/interfaces/warningHandler/handler';
import { WarningHandlerService } from 'src/app/core/services/warningHandler/warning-handler.service';

@Component({
  selector: 'app-select-products',
  templateUrl: './select-products.component.html',
  styleUrls: ['./select-products.component.scss']
})
export class SelectProductsComponent {

  public products: ProductModel[] = [
    {
      productId: Math.floor(Math.random() * 900 + 1),
      productPrice: 23,
      productQtde: 43,
      productName: 'Cachorro-quente'
    },
    {
      productId: Math.floor(Math.random() * 900 + 1),
      productPrice: 23,
      productQtde: 43,
      productName: 'Cachorro-quente'
    },
    {
      productId: Math.floor(Math.random() * 900 + 1),
      productPrice: 23,
      productQtde: 43,
      productName: 'Cachorro-quente'
    },
    {
      productId: Math.floor(Math.random() * 900 + 1),
      productPrice: 23,
      productQtde: 43,
      productName: 'Cachorro-quente'
    },
    {
      productId: Math.floor(Math.random() * 900 + 1),
      productPrice: 23,
      productQtde: 43,
      productName: 'Cachorro-quente'
    },
    {
      productId: Math.floor(Math.random() * 900 + 1),
      productPrice: 23,
      productQtde: 43,
      productName: 'Cachorro-quente'
    },
    {
      productId: Math.floor(Math.random() * 900 + 1),
      productPrice: 23,
      productQtde: 43,
      productName: 'Cachorro-quente'
    },
    {
      productId: Math.floor(Math.random() * 900 + 1),
      productPrice: 23,
      productQtde: 43,
      productName: 'Cachorro-quente'
    },
    {
      productId: Math.floor(Math.random() * 900 + 1),
      productPrice: 23,
      productQtde: 43,
      productName: 'Cachorro-quente'
    },
    {
      productId: Math.floor(Math.random() * 900 + 1),
      productPrice: 23,
      productQtde: 43,
      productName: 'Cachorro-quente'
    },
    {
      productId: Math.floor(Math.random() * 900 + 1),
      productPrice: 23,
      productQtde: 43,
      productName: 'Cachorro-quente'
    },
    {
      productId: Math.floor(Math.random() * 900 + 1),
      productPrice: 23,
      productQtde: 43,
      productName: 'Cachorro-quente'
    },
    {
      productId: Math.floor(Math.random() * 900 + 1),
      productPrice: 23,
      productQtde: 43,
      productName: 'Cachorro-quente'
    },
  ]

  private productsChosen: Map<number, ProductModel> = new Map<number, ProductModel>();

  constructor(@Inject(WarningHandlerService) private listenHander: Handler, private dom: Renderer2, private el: ElementRef) {
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
      this.listenHander.reportSuccess("produtos removidos com sucesso")
    } catch (error) {
      this.listenHander.reportError("não foi possivel remover os produtos")
    }
  }
}
