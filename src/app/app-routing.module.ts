import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './presentationLayer/components/main/main.component';
import { DashBoardComponent } from './presentationLayer/components/dash-board/dash-board.component';
import { NewProductFormComponent } from './presentationLayer/forms/new-product-form/new-product-form.component';
import { SelectProductsComponent } from './presentationLayer/components/select-products/select-products.component';
import { ListProductsComponent } from './presentationLayer/components/list-products/list-products.component';

const routes: Routes = [
  {path:"",component:MainComponent},
  {path:"dashBoard",component:DashBoardComponent},
  {path:"newProduct",component:NewProductFormComponent},
  {path:"selectProducts",component:SelectProductsComponent},
  {path:"listOfProducts",component:ListProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
