import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/forms/login/login.component';
import { CreateAccountComponent } from './components/forms/create-account/create-account.component';
import { TicketManagerComponent } from './pages/ticket-manager/ticket-manager.component';
import { RecoverPasswordComponent } from './components/forms/recover-password/recover-password.component';

import { MainComponent } from './pages/main/main.component';
import { DashBoardComponent } from './pages/dash-boards/dash-board.component';
import { ListProductssComponent } from './pages/list-products/list-products.component';
import { SelectProductssComponent } from './pages/select-products/select-products.component';
import { MasterComponent } from './pages/master/master.component';
import { AuthComponent } from './pages/auth/auth.component';

import { SellerGuard } from './core/guards/seller/guard-seller.guard';
import { ManagerGuard } from './core/guards/manager/guard-manager.guard';

import { CreateProductsFormComponent } from './components/forms/create-product-form/create-product-form.component';
import { UpdateProductsFormComponent } from './components/forms/update-product-form/update-product-form.component';
import { ResetCommandComponent } from './components/reset-command/reset-command.component';

const routes: Routes = [,
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "", component: LoginComponent },
      { path: "create-account", component: CreateAccountComponent },
      { path: "update-password", component: RecoverPasswordComponent }
    ]
  },
  {
    path: "home",
    component: MasterComponent,
    canActivateChild: [ManagerGuard],
    children: [
      //caixa gerenciador
      { path: "", component: MainComponent },
      { path: "dash-board", component: DashBoardComponent },
      { path: "create-products", component: CreateProductsFormComponent },
      { path: "update-products", component: UpdateProductsFormComponent },
      { path: "commerce", component: SelectProductssComponent },
      { path: "list-of-productss", component: ListProductssComponent },
      { path: "reset-command", component:ResetCommandComponent}
    ]
  },
  {
    path: "home",
    component: MasterComponent,
    canActivateChild: [SellerGuard],
    children: [
      //vendedor gerenciador
      { path: "manager", component: TicketManagerComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
