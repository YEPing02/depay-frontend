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

  createUser(user: any) {
    this.httpClient.post(this.url, user).subscribe(
      function (res) {
        console.log(res);
      },
      function (err) {
        console.log(err)
      }
    )
    console.log(1)
  }

  checkUniquePseudo(pseudo: string): Observable<boolean> {
    var param = new HttpParams().set('pseudo', pseudo);

    return this.httpClient.get<boolean>(this.url + "/unique", { 'params': param });
  }

  isSame(text1: String, text2: String): boolean {
    return text1 == text2;
  }

}
