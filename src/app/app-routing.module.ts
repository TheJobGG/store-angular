import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductPage } from './pages/product/product.component';
import { ThanksComponent } from './pages/thanks/thanks.component';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "",
    redirectTo: "home", pathMatch: "full"
  },
  {
    path: "cart",
    component: CartComponent
  },
  {
    path: 'product/:id',
    component: ProductPage,
  },
  {
    path: 'thanks',
    component: ThanksComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: "top"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
