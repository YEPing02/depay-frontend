import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Item } from './item';
import {Image} from './image';
import { AppSetting } from '../shared/AppSetting';
import { catchError, tap } from 'rxjs/operators';
import { ItemListComponent } from './item-list/item-list.component';
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

  getItemDetail(itemId: string): Observable<Item> {
    return this.httpClient.get<Item>(this.url+"/"+itemId);
  }
  setItems(items: Item[]): void {
    this.items = items;
  }

  addItem(item:Item):Observable<Item>{
    return this.httpClient.post<Item>(this.url, item);
  }

  addPhoto(item:Item, imageCode: string) : Observable<Image>{
    const image :Image = {
      itemId : item.id,
      imageBase64 : imageCode
    }
    return this.httpClient.post<Image>(this.url+"/"+item.id+"/images",image);

  }

  getCoverImage(item : Item) :Observable<string>{
    return this.httpClient.get<string>(this.url+"/"+item.id+"/images/first").pipe(tap(
      res=>{
        item.imageBase64=res;
      }
    ));
  }

}
