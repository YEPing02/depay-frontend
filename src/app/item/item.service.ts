import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Item } from './item';
import { Image } from './image';
import { AppSetting } from '../shared/AppSetting';
import { catchError, tap, map } from 'rxjs/operators';
import { Text } from '@angular/compiler/src/i18n/i18n_ast';
@Injectable({
  providedIn: 'root'
})
export class ItemService {
  url: string = AppSetting.ENDPOINT + "/items";
  defaultImage : string = AppSetting.DEFAULTIMAGE;
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
    return this.httpClient.get<Item>(this.url + "/" + itemId);
  }
  setItems(items: Item[]): void {
    this.items = items;
  }

  addItem(item: Item): Observable<Item> {
    return this.httpClient.post<Item>(this.url, item);
  }

  addPhoto(item: Item, imageCode: string): Observable<Image> {
    const image: Image = {
      itemId: item.id,
      imageBase64: imageCode
    }
    return this.httpClient.post<Image>(this.url + "/" + item.id + "/images", image);

  }

  getCoverImage(item: Item): Observable<string> {
    return this.httpClient.get(this.url + "/" + item.id + "/images/first", { responseType: 'text' }).pipe(
      catchError(err => {
        return of("../../../assets/0_wZAcNrIWFFjuJA78.jpg");
      }
      ))
  }


  getAllImage(id: string): Observable<any> {
    return this.httpClient.get(this.url + "/" + id + "/images");
  }

}
