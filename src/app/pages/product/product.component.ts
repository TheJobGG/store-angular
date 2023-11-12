import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { CartService } from "src/app/services/cart.service";

import { StoreService } from "src/app/services/store.service";
import { Product } from "src/models/product.model";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductPage implements OnInit, OnDestroy {
  productsSubscription: Subscription | undefined;
  relatedProductSubscription: Subscription | undefined;
  product!: Product;
  relatedProducts: Product[] | undefined;
  disableAddToCartButton!: boolean;

  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const productId = params['id'];

      this.getProduct(productId);

    });
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      product: product.image,
      quantity: 1
    })
  }

  getProduct(id: number) {
    this.productsSubscription = this.storeService.getProduct(id)
      .subscribe((_product) => {
        this.product = _product;

        // Request the related products when the current product data 
        // was fully retrieved.
        this.getRelatedProducts(_product.category);
      });
  }

  getRelatedProducts(category: string) {
    this.relatedProductSubscription = this.storeService.getAllProducts('4', 'asc', category)
      .subscribe((_products) => {
        let filteredRelatedProducts = _products.filter(item => item.id !== this.product.id);

        if (filteredRelatedProducts.length === 4) {
          this.relatedProducts = filteredRelatedProducts.slice(0, 3);
        } else {
          this.relatedProducts = filteredRelatedProducts;
        }
      });
  }

  onDisableAddToCartButton(disableAddToCartButton: boolean) {
    this.disableAddToCartButton = disableAddToCartButton;   
  }

  ngOnDestroy(): void {
    this.productsSubscription?.unsubscribe();
    this.relatedProductSubscription?.unsubscribe();
  }

}