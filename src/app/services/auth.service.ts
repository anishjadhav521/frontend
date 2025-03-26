import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private backend:HttpClient , private router:Router) { 


  }

  logIn(user:any){

    this.backend.post('http://localhost:200/login',user,{withCredentials:true}).subscribe({
      next : (res:any)=>{
        
        alert("logged in")
        this.router.navigate(['/home'])

      },
      error : (err)=>{
        
        console.log(user);
        
        console.log(err);
        alert (err.error.msg)
         
      }
    }
    );
  
  }

  // private handleError(error:HttpErrorResponse){

  //   let errorMessage = 'unknown error'

  //   if(error.status === 400){

  //     errorMessage = "invalid input"

  //   }
  //   else if(error.status === 401){

  //    errorMessage = "unathorized login"

  //   }

  //   return throwError(()=>alert(errorMessage))

  // }
  
  signUp(credential:any){

    this.backend.post('http://localhost:200/signup',credential).subscribe(

      (res:any)=>alert(res.msg)
    )


  }

  
}
