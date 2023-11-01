import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthFacade } from 'src/app/abstractionLayer/AuthFacade';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public load: boolean = false;
  public invalidfeedbacks : boolean[] = [false,false]

  constructor(
    private formBuilder: FormBuilder,
    private AuthFacade: AuthFacade,
    private dom: Renderer2,
    private el: ElementRef,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [],
      password: []
    })
  }

  login() {
    this.resetFormLogin();
    const [name, password] = ["name", "password"].map(el => this.form.get(el).value);
    if (this.isNotEmpty(name) && this.isNotEmpty(password)) {
      this.AuthFacade.login(name, password);
      this.load = true;
      setTimeout(() => {
        this.load = false;
      }, 500);
    } else {
      this.activeIvalidFeedback();
    }
  }

  private activeIvalidFeedback() {
    ["name", "password"].forEach((el,i) => {
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
    ["name", "password"].forEach((el,i) => {
      const element = this.el.nativeElement.querySelector(`#${el}`);
      this.dom.removeClass(element, "invalid-feedback-login");
      this.invalidfeedbacks[i] = false;
    })
  }

}
