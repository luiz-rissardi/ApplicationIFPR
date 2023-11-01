import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthFacade } from 'src/app/abstractionLayer/AuthFacade';
import { ProductModel } from 'src/app/core/models/productModel';
import { ProductsListState } from 'src/app/core/states/ProductsListState';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {

  public form: FormGroup;
  public load: boolean = false;
  public invalidfeedbacks: boolean[] = [false, false,false];
  public products: ProductModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private AuthFacade: AuthFacade,
    private productListState: ProductsListState,
    private dom: Renderer2,
    private el: ElementRef,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [],
      password: [],
      chonsenProduct: null,
    });

    this.productListState.onProductListChange()
      .subscribe((data: ProductModel[]) => {
        this.products.length = 0;
        data.forEach((product: ProductModel) => {
          this.products.push(product)
        })
      })
  }

  createAccount() {
    this.resetFormLogin();
    const [userName, password, productIdAnexed] = ["name", "password", "chonsenProduct"].map(el => this.form.get(el).value);
    if (this.isNotEmpty(userName) && this.isNotEmpty(password) && this.isNotEmpty(productIdAnexed)) {
      this.AuthFacade.createAccount({ userName, password, typeAccount: 2, productIdAnexed });
      this.load = true;
      setTimeout(() => {
        this.load = false;
      }, 500);
    } else {
      this.activeIvalidFeedback();
    }
  }

  private activeIvalidFeedback() {
    ["name", "password","chonsenProduct"].forEach((el, i) => {
      const element = this.el.nativeElement.querySelector(`#${el}`);
      if (!this.isNotEmpty(this.form.get(el).value)) {
        this.dom.addClass(element, "invalid-feedback-login");
        this.invalidfeedbacks[i] = true;
      }
      else {
        this.dom.removeClass(element, "invalid-feedback-login");
        this.invalidfeedbacks[i] = false;
      }
    })
  }

  private isNotEmpty(value: null | string) {
    return String(value).trim() !== "" && value !== null;
  }

  private resetFormLogin() {
    ["name", "password"].forEach((el, i) => {
      const element = this.el.nativeElement.querySelector(`#${el}`);
      this.dom.removeClass(element, "invalid-feedback-login");
      this.invalidfeedbacks[i] = false;
    })
  }
}
