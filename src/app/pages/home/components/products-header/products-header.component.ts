import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styles: [
  ]
})
export class ProductsHeaderComponent {
  // This is the way to send data out of you component to parent component (using Output)
  @Output() itemsShowCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  @Output() openFilters = new EventEmitter<boolean>();
  
  sort = 'desc';
  itemsShowCount = 12;

  onSortUpdated(newSort: string): void {
    this.sort = newSort;
    this.sortChange.emit(newSort);
  }
  
  onItemsUpdated(count: number): void {
    this.itemsShowCount = count;
    this.itemsShowCountChange.emit(count);
  }

  onOpenFilters(): void {
    this.openFilters.emit(true);
  }
}
