import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Item } from './item';
import { AppSetting } from '../shared/AppSetting';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ItemService {
  url: string = AppSetting.ENDPOINT + "/items";
  items: Item[] = [];
  constructor(private httpClient: HttpClient) {
    this.loadItemList();
  }

  loadItemList(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(this.url,).pipe(tap(res => {
      if (res !== null) {
        this.setItems(res);
      }
    }));
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
