import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Router, NavigationStart } from '@angular/router';

const CATEGORIES = {
  electronics: "electronics",
  jewelery: "jewelery",
  menClothing: "men's clothing",
  womenClothing: "women's clothing",
}

@Component({
  selector: 'app-product-options',
  templateUrl: './product-options.component.html',
  styles: [
  ]
})
export class ProductOptionsComponent implements OnInit {
  @Input() productCategory = "";
  @Output() disableAddToCartButton = new EventEmitter<boolean>();

  categories = CATEGORIES;

  // Electronic option(s)
  guaranty!: boolean;

  // Jewelery option(s)
  engravings!: boolean;
  engravingText = "";
  giftWrapping!: boolean;
  authenticityCertificate!: boolean;

  // Men's clothing
  size = "";

  included!: boolean;

  constructor(private router: Router) {

    // Ensure the options are set as false if the route change.
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.guaranty = false;
        this.engravings = false;
        this.giftWrapping = false;
        this.authenticityCertificate = false;
      }
    })
  }

  ngOnInit(): void {
    const entries = Object.values(this.categories)
    this.included = entries.includes(this.productCategory);
    if (this.productCategory === this.categories.menClothing || this.productCategory === this.categories.womenClothing) {
      this.disableAddToCartButton.emit(true);
    } else {
      this.disableAddToCartButton.emit(false);
    }
  }

  verifyLength($event: Event) {
    if(this.engravingText.length >= 10) {
      const input = $event.target as HTMLInputElement;
      input.value = this.engravingText.slice(0, 10);
    }

    if(this.engravingText.length > 1){

    }
  }

  /********************
    // Verificar cuando se activa el checkbox y ver si el campo de texto tiene... texto
  **********************/

  // Emit change when select a size
  emitChangeSize($event: MatButtonToggleChange) {
    this.disableAddToCartButton.emit(false);
  }


}
