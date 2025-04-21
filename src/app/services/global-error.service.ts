import { HttpErrorResponse, httpResource, HttpResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorService implements ErrorHandler {

  constructor(private router :Router) { }

  handleError(error: any): void {

    let message =''

    if(error instanceof HttpErrorResponse){

      message = `HTTP Error :${error.status}-${error.message}`

      // if(error.status === 401){

      //   console.log('inter hello');
        
      //   this.router.navigate(['/'])
      //   localStorage.setItem('isLogin','false');
      //   // alert('')

      // }

      console.log(error);

    }else{

      message = error.message?error.message:error.toString()
      console.log("error haii");
      console.log(error);
      

    } 

    console.log("error haii");
    
    console.error('global error :' ,message);
    alert("something went wrong , check credentials")
  }
}
