import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        req = req.clone({
            setHeaders: {
                Authorization: `${localStorage.getItem('Authorization')}`
            }
        });

        /*if (localStorage.getItem('Authorization')) {
            headersAdd.set('Authorization', localStorage.getItem('Authorization'));
        }*/
//        const duplicate = req.clone({ headers: headersAdd });

        return next.handle(req);
        //return next.handle(req);
    }

}
