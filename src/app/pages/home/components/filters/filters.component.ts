import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styles: [
  ]
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();
  @Output() closeFiltersDrawer = new EventEmitter<boolean>();
  categoriesSubscriptions: Subscription | undefined;
  categories: string[] = [];

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.categoriesSubscriptions = this.storeService.getAllCategories()
      .subscribe((_categories) => {
        this.categories = _categories;
      })
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category)
    this.onCloseFiltersDrawer();
  }

  onCloseFiltersDrawer(): void{
    this.closeFiltersDrawer.emit(false);
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscriptions) {
      this.categoriesSubscriptions.unsubscribe();
    }
  }
}
