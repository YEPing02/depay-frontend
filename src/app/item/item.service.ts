import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ItemService {
  url = 'http://localhost:8080/items';
items :any[]=[];
  constructor(private httpClient: HttpClient) { 
    this.loadItemList();
  }

  loadItemList(): Observable<any[]> {
    return  this.httpClient.get<any>(this.url)
  }

  getItems():any[]{
    return this.items;
  }

  setItems(items:any):void{
this.items=items;
  }
}
