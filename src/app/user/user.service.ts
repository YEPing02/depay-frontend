import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { __param } from 'tslib';
import { AppSetting } from '../shared/AppSetting';
import { User } from '../shared/data-model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = AppSetting.ENDPOINT + '/users';
  user: User = new User();
  init: boolean = false;

  constructor(private httpClient: HttpClient) {
  }

  loadUserDetail(userId:string): Observable<User> {
    return this.httpClient.get<User>(this.url+"/"+userId);
  }

  loadSelfUserDetail(): Observable<User> {
    return this.httpClient.get<User>(this.url+"/self").pipe(
      tap(res => {
        this.user = res;
        this.init = true;
      })
    );
  }

  setUser(user: User): void {
    this.user = user;
  }

  getUser(): Observable<User> {
    if (this.init) {
      return of(this.user);
    }
    else {
      return this.loadSelfUserDetail();
    }
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
