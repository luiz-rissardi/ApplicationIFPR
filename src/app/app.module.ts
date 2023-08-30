import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MainComponent } from './presentationLayer/components/main/main.component';
import { HeaderComponent } from './presentationLayer/shared/header/header.component';
import { FooterComponent } from './presentationLayer/shared/footer/footer.component';
import { DashBoardComponent } from './presentationLayer/components/dash-board/dash-board.component';
import { NavBarComponent } from './presentationLayer/shared/nav-bar/nav-bar.component';
import { NewProductFormComponent } from './presentationLayer/forms/new-product-form/new-product-form.component';
import { SelectProductsComponent } from './presentationLayer/components/select-products/select-products.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DashBoardComponent,
    HeaderComponent,
    FooterComponent,
    NavBarComponent,
    NewProductFormComponent,
    SelectProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
