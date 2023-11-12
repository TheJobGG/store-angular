import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styles: [
  ]
})
export class ProductBoxComponent implements OnInit {
  @Input() product: Product | undefined;
  routerLinkProduct: string | undefined; 

  @Output() addToCart = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.routerLinkProduct = '/product/' + this.product?.id;
  }

  onAddToCart(event: Event): void {
    event.stopPropagation();
    this.addToCart.emit(this.product);
  }

}
