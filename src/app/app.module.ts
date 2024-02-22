import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';

//component
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { WarningHandlerComponent } from './components/warning-handler/warning-handler.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { LoginComponent } from './components/forms/login/login.component';
import { CreateAccountComponent } from './components/forms/create-account/create-account.component';
import { RecoverPasswordComponent } from './components/forms/recover-password/recover-password.component';
import { SpinnerLoaderComponent } from './components/spinner-loader/spinner-loader.component';

//pages
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { SelectProductsComponent } from './pages/select-products/select-products.component';
import { DashBoardComponent } from './pages/dash-boards/dash-board.component';
import { MasterComponent } from './pages/master/master.component';
import { AuthComponent } from './pages/auth/auth.component';
import { TicketManagerComponent } from './pages/ticket-manager/ticket-manager.component';
import { MainComponent } from './pages/main/main.component';
import { CreateProductFormComponent } from './components/forms/create-product-form/create-product-form.component';
import { UpdateProductFormComponent } from './components/forms/update-product-form/update-product-form.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DashBoardComponent,
    HeaderComponent,
    NavBarComponent,
    SelectProductsComponent,
    ListProductsComponent,
    WarningHandlerComponent,
    ShoppingCartComponent,
    LoginComponent,
    MasterComponent,
    SpinnerLoaderComponent,
    CreateAccountComponent,
    AuthComponent,
    TicketManagerComponent,
    RecoverPasswordComponent,
    CreateProductFormComponent,
    UpdateProductFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: !isDevMode(),
    //   // Register the ServiceWorker as soon as the application is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000'
    // })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
