import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';
import { Product } from 'src/models/product.model';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };
const ROWS_HEIGHT_MOBILE = 500;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  category: string | undefined;
  rowHeight = ROWS_HEIGHT[this.cols];

  products: Product[] | undefined;
  sort = 'desc';
  count = '12';
  productsSubscription: Subscription | undefined;
  loadingProducts!: boolean;
  openFilters = false;

  constructor(private cartService: CartService, private storeService: StoreService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.loadingProducts = true;
    this.productsSubscription = this.storeService.getAllProducts(this.count, this.sort, this.category)
      .subscribe((_products) => {
        this.products = _products;
        this.loadingProducts = false;
      });
  }

  /* <app-filters ...  functions >*/

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts();
  }

  /* </app-filters> .... */



  /* <products-header ... functions > */

  onItemsShowCountChange(count: number): void {
    this.count = count.toString();
    this.getProducts();
  }

  onSortChange(sort: string): void {
    this.sort = sort;
    this.getProducts();
  }

  // Apertura o cierre del drawer de filtros
  onOpenFilters(open: boolean): void {
    this.openFilters = open;
  }

  /* </app-products-header> .... */

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      product: product.image,
      quantity: 1
    })
  }

  onDrawerStateChange(opened: boolean): void {
    this.openFilters = opened;
    if (!opened) {
      this.openFilters = false;
    }
  }


  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

}
