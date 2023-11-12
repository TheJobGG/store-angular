import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart, CartItem } from 'src/models/cart.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  private _cart: Cart = { items: []};
  itemsQuantity = 0;

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;

    // Calculate the total quantity of items in the cart.
    // First, extract the quantities of individual items using "map", then sum up the quantities using "reduce".
    this.itemsQuantity = cart.items
    .map(item => item.quantity)
    .reduce((prev, current) => prev + current, 0 );
  }

  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
    
  }

  getTotal(items: CartItem[]): number {
    return this._cartService.getTotal(items)
  }

  onClearCart() {
    this._cartService.clearCart();
  }

}
