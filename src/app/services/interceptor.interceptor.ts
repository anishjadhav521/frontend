// import { HttpInterceptorFn } from '@angular/common/http';

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { RouterTestingHarness } from "@angular/router/testing";
import { catchError, every, map, Observable, throwError } from "rxjs";

// export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {


//   return next(req);
// };


@Injectable()
export class interceptor implements HttpInterceptor{


constructor(private router:Router){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(


      catchError((error:HttpErrorResponse)=>{

        console.log(error);
        
       

        if(error.status===401){

          localStorage.setItem('isLogin','false')
          this.router.navigate(['/']) 

        }
        return throwError(error); 

      })  
      
    )
     
          
          // if(event.status === 401){

          //   console.log('inter hello');
            
          //   this.router.navigate(['/'])
          //   localStorage.setItem('isLogin','false');

          
        } 


      }