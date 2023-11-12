import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from 'src/models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // Behavior Subject (BS) where manage the items of the cart.
  cart = new BehaviorSubject<Cart>({ items: [] });

  constructor(private _snackBar: MatSnackBar, private _router: Router) { }

  addToCart(item: CartItem): void {
    // Destructuring of the current items in the BS 
    // to verify if the item to add is already in the cart or BS.
    const items = [...this.cart.value.items];

    // Verify if the current item in the function param is in the array.
    const itemInCart = items.find((_item) => _item.id === item.id);

    if (itemInCart) {
      // The product is already in the saved items or in the BS.
      itemInCart.quantity += 1;
    } else {
      // The items was not found and now are added to the array items.
      items.push(item);
    }

    // We emit the value into the BS, 
    // so we can update the UI of all elements are subscribed to this BS.
    this.cart.next({ items })

    // Notify to the user the item was added to the cart.
    this._snackBar.open('1 item added to cart.', 'View cart', { duration: 3000 })
      .onAction().subscribe(() => {
        this._router.navigate(['/cart']);
      })
  }

  /**
   * Removes a specific quantity from the given cart item. If the item's quantity becomes zero,
   * it is removed from the cart entirely.
   * @param item The CartItem from which a quantity will be removed.
   */
  removeQuantity(item: CartItem): void {
    // Declare a variable to store the item to be removed, if its quantity becomes zero.
    let itemForRemoval: CartItem | undefined;

    // Create a new array by mapping through the cart's items.
    // If the item's ID matches the provided item's ID, decrease its quantity.
    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;

        // If the item's quantity becomes zero, set it for removal.
        if (_item.quantity === 0) {
          itemForRemoval = item;
        }
      }
      return _item;
    });

    // If an item needs to be removed, call the removeFromCart method with the identified item.
    if (itemForRemoval) {
      this.removeFromCart(itemForRemoval);
    }
  }


  // Get the total price of the cart
  getTotal(items: CartItem[]): number {
    return items
      .map(item => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  // Clear the cart
  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open('Cart is cleared.', 'Ok', { duration: 3000 })
  }

  // Remove a single item from cart
  removeFromCart(item: CartItem): void {
    const items = [...this.cart.value.items];

    const filteredItems = items.filter(_item => item.id !== _item.id)

    this.cart.next({ items: filteredItems });
    this._snackBar.open('1 item removed from cart.', 'Ok', { duration: 3000 });
  }
}
