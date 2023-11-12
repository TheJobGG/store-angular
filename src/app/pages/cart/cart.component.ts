import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { Cart, CartItem } from 'src/models/cart.model';

import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: [
  ]
})
export class CartComponent implements OnInit, OnDestroy {
  cart: Cart = { items: [] };

  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = ['product', 'name', 'price', 'quantity', 'total', 'action'];

  cartSubscription: Subscription | undefined;

  isCheckingPayment = false;

  constructor(private cartService: CartService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    })
  }

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items)
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item)
  }

  onCheckout(): void {
    this.isCheckingPayment = true;
    console.log(environment.stripeTestKey)
    this.httpClient.post(`${environment.backendBaseUrl}/checkout`, {
      items: this.cart.items,
    })
    .subscribe(async (res: any) => {
        let stripe = await loadStripe(environment.stripeTestKey);
        stripe?.redirectToCheckout({ sessionId: res.id })
        this.isCheckingPayment = false;
      })
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);

  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
    this.isCheckingPayment = false;
  }
}
