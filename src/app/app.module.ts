import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatBadgeModule } from '@angular/material/badge'
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table'
import { MatToolbarModule } from '@angular/material/toolbar'
import {MatInputModule} from '@angular/material/input';

import { CartService } from './services/cart.service';
import { StoreService } from './services/store.service';

import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsHeaderComponent } from './pages/home/components/products-header/products-header.component';
import { FiltersComponent } from './pages/home/components/filters/filters.component';
import { ProductBoxComponent } from './pages/home/components/product-box/product-box.component';
import { CartComponent } from './pages/cart/cart.component'
import { ProductPage } from './pages/product/product.component';
import { FooterComponent } from './components/footer/footer.component';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { ProductOptionsComponent } from './pages/product/components/product-options/product-options.component';
import { ThanksComponent } from './pages/thanks/thanks.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductsHeaderComponent,
    FiltersComponent,
    ProductBoxComponent,
    CartComponent,
    ProductPage,
    FooterComponent,
    ProductOptionsComponent,
    ThanksComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
    MatToolbarModule,
    NgOptimizedImage,
  ],
  providers: [CartService, StoreService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    // Add facebook icon white and black
    this.matIconRegistry.addSvgIcon(
      'ico_facebook',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/ico-facebook.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'ico_facebook_black',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/ico-facebook-black.svg')
    );
    // Add instagram icon white and black
    this.matIconRegistry.addSvgIcon(
      'ico_instagram',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/ico-instagram.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'ico_instagram_black',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/ico-instagram-black.svg')
    );
    // Add twitter_x icon white and black
    this.matIconRegistry.addSvgIcon(
      'ico_twitter_x',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/ico-twitter-x.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'ico_twitter_x_black',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/ico-twitter-x-black.svg')
    );
  }
}
