import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/models/product.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments'; 

const STORE_BASE_URL = environment.storeBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class StoreService {


  constructor(private httpClient: HttpClient) { }

  getAllProducts(limit = '12', sort = 'desc', category?: string): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(`${STORE_BASE_URL}/products${category ? "/category/" + category : ""}?sort=${sort}&limit=${limit}`)
  }

  getAllCategories(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(`${STORE_BASE_URL}/products/categories`)
  }

  getProduct(id: number) {
    return this.httpClient.get<Product>(`${STORE_BASE_URL}/products/${id}`)
  }
}
