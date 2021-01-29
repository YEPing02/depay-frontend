import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { __param } from 'tslib';
import { AppSetting } from '../shared/AppSetting';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = AppSetting.ENDPOINT + '/user';

  constructor(private httpClient: HttpClient) {

  }

  createUser(user: any): Observable<User> {
    return this.httpClient.post<User>(this.url, user);
  }

  checkUniquePseudo(pseudo: string): Observable<boolean> {
    var param = new HttpParams().set('pseudo', pseudo);

    return this.httpClient.get<boolean>(this.url + "/unique", { 'params': param });
  }

  isSame(text1: String, text2: String): boolean {
    return text1 == text2;
  }

}
