import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConstantsRouter } from './../utils/constants-router';
import { ConstantsStorage } from '../utils/constants-storage';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        req = req.clone({
            setHeaders: {
                Authorization: `${localStorage.getItem(ConstantsStorage.AUTHORIZATION)}`
            }
        });

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.router.navigate([ConstantsRouter.LOGIN]);
                }
                return throwError(error);
            })
        );
    }

}
