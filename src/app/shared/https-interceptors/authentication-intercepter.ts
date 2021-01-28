import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpEventType, HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { AuthService } from '../Security/auth.service';
import { catchError, mergeMap, switchMap, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //ignore login request
    if (req.url.endsWith('login')) {
      return next.handle(req);
    }

    let authReq: HttpRequest<any> = this.copyRequestWithToken(this.authService.getAccessToken(), req);
    return next.handle(authReq).pipe(
      catchError(err => {
        if (err.status === 401) {
          console.log("refresh token");
          return this.authService.refresh().pipe(
            mergeMap(res => {
              let authReq: HttpRequest<any> = this.copyRequestWithToken(this.authService.getAccessToken(), req);
              return next.handle(authReq);
            })
          );
        }
        else if (err.status === 418) {
          console.log("need login");
          this.router.navigateByUrl('/login');
        }
        return throwError(err);
      })
    );
  }


  copyRequestWithToken(token: string, req: HttpRequest<any>): HttpRequest<any> {
    let authReq: any;
    if (token !== '') {
      authReq = req.clone({
        headers: req.headers.set('Token', token)
      });
    } else {
      authReq = req.clone();
    }
    return authReq;
  }

}