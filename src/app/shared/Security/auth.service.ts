import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { getSourceFileOrError } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, ObservableLike } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/user/user';
import { AppSetting } from '../AppSetting';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  access_token: string = "";
  refresh_token: string = "";
  user: User = new User();

  url: string = AppSetting.ENDPOINT + '/user';

  constructor(private httpClient: HttpClient, private cookies: CookieService) {
    const cookieToken = cookies.get('token');
    const cookieRefresh = cookies.get('refresh');
    if (cookieToken) {
      this.access_token = cookieToken;
    }
    if (cookieRefresh) {
      this.refresh_token = cookieRefresh;
    }
  }

  signIn(username: string, password: string): Observable<HttpResponse<User>> {
    var requestBody = { username: username, password: password };
    return this.httpClient.post<User>(this.url + "/login", requestBody, { observe: 'response' }).pipe(
      tap(res => {
        this.handleTokens(res);
      }));
  }

  refresh(): Observable<HttpResponse<User>> {
    const headers: HttpHeaders = new HttpHeaders().set('Refresh', this.refresh_token).set('Token', this.access_token);
    return this.httpClient.post<User>(this.url + "/refresh", "", { observe: 'response', headers: headers }).pipe(
      tap(res => {
        this.handleTokens(res);
      }));
  }

  handleTokens(res: any): void {
    const token = res.headers.get('Token');
    const refresh = res.headers.get('Refresh');
    if (token) {
      this.setAccessToken(token);
    }
    if (refresh) {
      this.setRefreshToken(refresh);
    }
    if (res.body) {
      this.setUser(res.body);
    }
  }

  signOut(): Observable<HttpResponse<void>> {
    return this.httpClient.post<void>(this.url + "/logout", "", { observe: 'response' }).pipe(
      tap(() => {
        this.access_token = "";
        this.refresh_token = "";
        this.cookies.delete('token');
        this.cookies.delete('refresh');
        this.user = new User();
      })
    );
  }

  getUserDetail(): Observable<User> {
    return this.httpClient.get<User>(this.url + "/detail").pipe(
      tap(res => {
        this.user = res;
      })
    );
  }

  setAccessToken(token: string): void {
    this.access_token = token;
    this.cookies.set('token', token);
  }

  setRefreshToken(refresh: string): void {
    this.refresh_token = refresh;
    this.cookies.set('refresh', refresh);
  }
  setUser(user: User): void {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }

  getAccessToken(): string {
    return this.access_token;
  }
  getRefreshToken(): string {
    return this.refresh_token;
  }

}
