import { Injectable } from '@angular/core';
import { Observable, of, } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Item } from '../shared/data-model/item';
import { Image } from '../shared/data-model/image';
import { AppSetting } from '../shared/AppSetting';
import { catchError, tap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  url: string = AppSetting.ENDPOINT + "/items";
  defaultImage: string = AppSetting.DEFAULT_IMAGE;
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

  saveImages(item: Item): Observable<any> {
    let uploadImageObservables: Observable<Image>[] = [];

    if (item.imageBase64 != undefined) {
      for (let anImage of item.imageBase64) {
        const img: Image = {
          itemId: item.id,
          imageBase64: anImage
        }
        uploadImageObservables.push(this.httpClient.post<Image>(this.url + "/" + item.id + "/images", img));
      }

    }

    return forkJoin(uploadImageObservables);
  }


  getCoverImage(item: Item): Observable<string> {
    return this.httpClient.get(this.url + "/" + item.id + "/images/first", { responseType: 'text' }).pipe(
      catchError(err => {
        return of("../../../assets/0_wZAcNrIWFFjuJA78.jpg");
      }
      ))
  }

  getAllImagesOfItem(itemId: string): Observable<string[]> {
    return this.httpClient.get<string[]>(this.url + "/" + itemId + "/images");
  }

}
