import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/models/cart.model';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="relative min-h-full">
      <app-header [cart]="cart"></app-header>
        <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  title = 'store';

  cart: Cart = { items: [] };

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    })
  }
}
