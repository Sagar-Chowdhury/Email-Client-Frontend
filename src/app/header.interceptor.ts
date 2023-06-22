import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  
  

  constructor(private toastr: ToastrService){}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(


      tap((httpEvent: HttpEvent<any>) =>{
       
        if(httpEvent.type === 0){
            return;
        }           
        console.log("response: ", httpEvent);

     
        if (httpEvent instanceof HttpResponse) {

            if(httpEvent.headers.has('Authorization')) {

                console.log( "Authorization ->" + httpEvent.headers.get('Authorization'));

                if(request.url === 'https://smtpbackend.iitmandi.co.in/users/sign_in')
                localStorage.setItem('token', httpEvent.headers.get('Authorization')!);
                 
            }
        }
    })
      ,

      catchError((error) =>{
        
        console.log(error);
        this.toastr.error("Invalid Credentials Email/Password")
        return of(error);

      })


    );
  }


}