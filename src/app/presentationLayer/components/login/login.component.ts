import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthFacade } from 'src/app/abstractionLayer/AuthFacade';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public form: FormGroup;
  public load: boolean = false;

  constructor(formBuilder: FormBuilder, private AuthFacade: AuthFacade) {
    this.form = formBuilder.group({
      name: [],
      password: []
    })
  }

  login() {
    const [name, password] = ["name", "password"].map(el => this.form.get(el).value)
    this.AuthFacade.login(name, password);
    this.load = true;
    setTimeout(() => {
      this.load = false;
    }, 500);
  }

}
