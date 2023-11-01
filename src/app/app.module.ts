import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MainComponent } from './presentationLayer/components/main/main.component';
import { HeaderComponent } from './presentationLayer/shared/header/header.component';
import { NavBarComponent } from './presentationLayer/shared/nav-bar/nav-bar.component';
import { ProductFormComponent } from './presentationLayer/forms/product-form/product-form.component';
import { SelectProductsComponent } from './presentationLayer/components/select-products/select-products.component';
import { ListProductsComponent } from './presentationLayer/components/list-products/list-products.component';
import { WarningHandlerComponent } from './presentationLayer/shared/warning-handler/warning-handler.component';
import { NgxApexchartsModule } from "ngx-apexcharts";
import { DonutBoardComponent } from './presentationLayer/shared/donut-board/donut-board.component';
import { DashBoardComponent } from './presentationLayer/components/dash-boards/dash-board.component';
import { LineBoardComponent } from './presentationLayer/shared/line-board/line-board.component';
import { TotalSalesComponent } from './presentationLayer/shared/total-sales/total-sales.component';
import { ShoppingCartComponent } from './presentationLayer/shared/shopping-cart/shopping-cart.component';
import { LoginComponent } from './presentationLayer/forms/login/login.component';
import { MasterComponent } from './presentationLayer/components/master/master.component';
import { SpinnerLoaderComponent } from './presentationLayer/shared/spinner-loader/spinner-loader.component';
import { CreateAccountComponent } from './presentationLayer/forms/create-account/create-account.component';
import { AuthComponent } from './presentationLayer/components/auth/auth.component';
import { TicketManagerComponent } from './presentationLayer/components/ticket-manager/ticket-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DashBoardComponent,
    HeaderComponent,
    NavBarComponent,
    ProductFormComponent,
    SelectProductsComponent,
    ListProductsComponent,
    WarningHandlerComponent,
    DonutBoardComponent,
    LineBoardComponent,
    TotalSalesComponent,
    ShoppingCartComponent,
    LoginComponent,
    MasterComponent,
    SpinnerLoaderComponent,
    CreateAccountComponent,
    AuthComponent,
    TicketManagerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxApexchartsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
