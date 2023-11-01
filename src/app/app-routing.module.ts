import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './presentationLayer/components/main/main.component';
import { DashBoardComponent } from './presentationLayer/components/dash-boards/dash-board.component';
import { ProductFormComponent } from './presentationLayer/forms/product-form/product-form.component';
import { SelectProductsComponent } from './presentationLayer/components/select-products/select-products.component';
import { ListProductsComponent } from './presentationLayer/components/list-products/list-products.component';
import { MasterComponent } from './presentationLayer/components/master/master.component';
import { LoginComponent } from './presentationLayer/forms/login/login.component';
import { CreateAccountComponent } from './presentationLayer/forms/create-account/create-account.component';
import { AuthComponent } from './presentationLayer/components/auth/auth.component';
import { TicketManagerComponent } from './presentationLayer/components/ticket-manager/ticket-manager.component';

const routes: Routes = [,
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "", component: LoginComponent },
      { path: "createAccount", component: CreateAccountComponent }
    ]
  },
  {
    path: "home",
    component: MasterComponent,
    children: [
      //caixa gerenciador
      { path: "", component: MainComponent },
      { path: "dashBoard", component: DashBoardComponent },
      { path: "Product", component: ProductFormComponent },
      { path: "Product/:id", component: ProductFormComponent },
      { path: "selectProducts", component: SelectProductsComponent },
      { path: "listOfProducts", component: ListProductsComponent },

      //vendedor gerenciador
      { path: "manager", component: TicketManagerComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
