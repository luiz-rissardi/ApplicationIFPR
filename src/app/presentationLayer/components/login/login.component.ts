import { Component } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public form:FormGroup;

  constructor(private formBuilder:FormBuilder){
    this.form = formBuilder.group({
      name:[],
      password:[]
    })
  }

  login(){
    const [name,password] = ["name","password"].map(el => this.form.get(el).value)
    console.log(name,password);
  }

}
