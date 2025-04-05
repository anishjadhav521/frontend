import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient , private router:Router ,private userService:UserService,private ms:MessageService) {  }

  logIn(user:any){

    this.http.post('http://localhost:200/login',user,{withCredentials:true}).subscribe({
      next : (res:any)=>{
        
        this.ms.add({severity: 'success', summary: 'Success', detail: 'logged in' })
        // alert("logged in")
        
        
        this.http.get('http://localhost:200/getUser', { withCredentials: true }).subscribe({

          next: (res: any) => {
    
            this.userService.user = res.user
            
          },
    
          error: (res) => {
    
            this.router.navigate(['/login'])
    
          }
        })

        this.router.navigate(['/home'])

      },
      error : (err)=>{
        
        alert ("Sorry, your password was incorrect. Please double-check your password.")
         
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

    this.http.post('http://localhost:200/signup',credential).subscribe(

      (res:any)=>alert(res.msg)
    )


  }

  
}
