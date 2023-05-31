import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserService } from './user.service';
export class TokenInterceptor implements HttpInterceptor {
  user!: string;
  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
             console.log(req.url.includes('addPoint'));
             if(req.url.includes('AddPoint') || req.url.includes('UpdatePoint')|| req.url.includes('AddComment') || req.url.includes('delComment') || req.url.includes('AddPhoto')){
              console.log(localStorage.getItem('token'))
              req = req.clone({
                setHeaders: {
                  'Api' : `Bearer ${localStorage.getItem('token')}`,
                  enctype : 'multipart/form-data'
                }
              });
             return next.handle(req).pipe(
              tap((httpEvent: HttpEvent<any>) =>{
                // Skip request
                if(httpEvent.type === 0){
                    return;
                }
                console.log("response: ", httpEvent);

                let minTargetApiVersion : string;
                if (httpEvent instanceof HttpResponse) {
                    if(httpEvent.headers.has('Authorization')) {
                        minTargetApiVersion = httpEvent.headers.get('Authorization');
                        localStorage.setItem('token',minTargetApiVersion)
                    }
                }
            })

             )
             }
             return next.handle(req);
         }
}
