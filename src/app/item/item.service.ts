import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from './item';
@Injectable({
  providedIn: 'root'
})
export class ItemService {
  url = 'http://localhost:8080/items';
  items: Item[] = [];
  constructor(private httpClient: HttpClient) {
    this.loadItemList();
  }

  loadItemList(): Observable<Item[]> {
   let headers:HttpHeaders=new HttpHeaders().set('Accept','application/hal+json');
    return this.httpClient.get<Item[]>(this.url,{headers:headers})
  }

  getItems(): Item[] {
    return this.items;
  }

  getItemDetail(url: string): Observable<Item> {
    return this.httpClient.get<Item>(url);
  }
  setItems(items: Item[]): void {
    this.items = items;
  }
}
