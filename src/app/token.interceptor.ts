import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const url = req.url;
    if (!(url.includes('/api/auth/login') || url.includes('/api/auth/signup'))) {
      if (token) {
        const cloned = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + token)
            .set('Access-Control-Allow-Origin', '*')
        });
        return next.handle(cloned);
      }
    }
    return next.handle(req);
  }
}
