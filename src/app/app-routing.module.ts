import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/forms/login/login.component';
import { CreateAccountComponent } from './components/forms/create-account/create-account.component';
import { TicketManagerComponent } from './pages/ticket-manager/ticket-manager.component';
import { RecoverPasswordComponent } from './components/forms/recover-password/recover-password.component';

import { MainComponent } from './pages/main/main.component';
import { DashBoardComponent } from './pages/dash-boards/dash-board.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { SelectProductsComponent } from './pages/select-products/select-products.component';
import { MasterComponent } from './pages/master/master.component';
import { AuthComponent } from './pages/auth/auth.component';

import { SellerGuard } from './core/guards/seller/guard-seller.guard';
import { ManagerGuard } from './core/guards/manager/guard-manager.guard';

import { CreateProductFormComponent } from './components/forms/create-product-form/create-product-form.component';
import { UpdateProductFormComponent } from './components/forms/update-product-form/update-product-form.component';


const routes: Routes = [,
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "createAccount", component: CreateAccountComponent },
      { path: "updatePassword",component: RecoverPasswordComponent }
    ]
  },
  {
    path: "home",
    component: MasterComponent,
    canActivateChild: [ManagerGuard],
    children: [
      //caixa gerenciador
      { path: "", component: MainComponent },
      { path: "dashBoard", component: DashBoardComponent },
      { path: "createProduct", component: CreateProductFormComponent },
      { path: "updateProduct", component: UpdateProductFormComponent },
      { path: "commerce", component: SelectProductsComponent },
      { path: "listOfProducts", component: ListProductsComponent },
    ]
  },
  {
    path: "home",
    component: MasterComponent,
    canActivateChild: [SellerGuard],
    children: [
      //vendedor gerenciador
      { path: "manager", component: TicketManagerComponent }
    ]
  },
  {
    path: "**",
    redirectTo: "home"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
