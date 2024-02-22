import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserFacade } from 'src/app/facades/UserFacade';
import { ProductModel } from 'src/app/core/models/productModel';
import { ProductsListState } from 'src/app/core/states/ProductsListState';
import { ValidateForm } from '../validateFormService/validateFomr-Service';
import { StockFacade } from 'src/app/facades/StockFacade';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent extends ValidateForm implements OnInit {

  public load: boolean = false;
  public products: ProductModel[] = [];

  constructor(
    private userFacade: UserFacade,
    private stockFacade: StockFacade,
    private productListState: ProductsListState,
    formBuilder: FormBuilder,
    dom: Renderer2,
    el: ElementRef,
  ) {

    const form = formBuilder.group({
      name: [],
      password: [],
      chonsenProduct: null,
    });
    super(el, dom, form);
  }

  ngOnInit(): void {

    this.productListState.onProductListChange()
      .subscribe((data: ProductModel[]) => {
        this.products.length = 0;
        data.forEach((product: ProductModel) => {
          if(product.productChosen == false){
            this.products.push(product)
          }
        })
      })
  }

  createAccount():void {
    this.resetFormLogin();
    const [userName, password, productAnexed] = ["name", "password", "chonsenProduct"].map(el => this.form.get(el).value);
    if (this.isNotEmpty(userName) && this.isNotEmpty(password) && this.isNotEmpty(productAnexed.productId)) {
      this.userFacade.createAccount({ userName, password, typeAccount: 2, productIdAnexed:productAnexed.productId });
      productAnexed.productChosen = true;
      this.stockFacade.updateProduct(productAnexed)
      this.load = true;
      setTimeout(() => {
        this.load = false;
      }, 500);
    } else {
      this.activeIvalidFeedback("name", "password", "chonsenProduct");
    }
  }
}
