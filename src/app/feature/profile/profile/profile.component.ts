import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  constructor(private http: HttpClient, private userService:UserService) {


   }

  userProfile:any
  
  changeUsername = false
  changeBio = false;
  changePhoneNumber = false;
  changeEmail = false;
  changePassword:boolean=false



  newUsername  : string =''
  newEmail : string = ''
  newBio :string =''
  newPhoneNumber:string =''

  usernameSubject = new Subject();

  ngOnInit(): void {

    this.getProfile()

  }

  editUsername(){

    this.changeUsername =! this.changeUsername;
  }

  editEmail(){

    this.changeEmail =! this.changeEmail
  }

  editPhoneNumber(){

    this.changePhoneNumber =! this.changePhoneNumber
  }

  editBio(){

    this.changeBio =! this.changeBio
  }

  editPassword(){

    this.changePassword = !this.changePassword


  }

 
   updateUsername(){
    
    if(this.newUsername)
    {

    const updateUsername ={

      "newUsername": this.newUsername,
      "profileId" : this.userProfile.id,

    }
      this.http.patch('http://localhost:200/updateUsername',updateUsername, { withCredentials: true }).subscribe({

         next: (res:any)=>{
  
          this.getProfile();
          alert("username updated succesfully")

        },
        error:(res)=>{
  
          console.log(res);
          
        }
    })
    }
    else{
      alert("field empty")
    }
  }
  
  updateEmail(){

    if(this.newEmail)
      {
  
      const updateEmail ={
  
        "newEmail": this.newEmail,
        "profileId" : this.userProfile.id,
  
      }
        this.http.patch('http://localhost:200/updateEmail',updateEmail, { withCredentials: true }).subscribe({
  
           next: (res:any)=>{
    
            this.getProfile();
            alert("Email updated succesfully")
  
          },
          error:(res)=>{
    
            console.log(res);
            
          }
      })
      }
      else{
        alert("field empty")
      }
    }

    updatePhoneNumber(){

      if(this.newPhoneNumber)
        {
    
        const updatePhoneNumber ={
    
          "newPhoneNumber": this.newPhoneNumber,
          "profileId" : this.userProfile.id,
    
        }
          this.http.patch('http://localhost:200/updatePhoneNumber',updatePhoneNumber, { withCredentials: true }).subscribe({
    
             next: (res:any)=>{
      
              this.getProfile();
              alert("updatePhoneNumber updated succesfully")
    
            },
            error:(res)=>{
      
              console.log(res);
              
            }
        })
        }
        else{
          alert("field empty")
        }
      }

      updateBio(){
    
        if(this.newBio)
        {
    
        const updateBio ={
    
          "newBio": this.newBio,
          "profileId" : this.userProfile.id,
    
        }
          this.http.patch('http://localhost:200/updateBio',updateBio, { withCredentials: true }).subscribe({
    
             next: (res:any)=>{
      
              this.getProfile();
              alert("bio updated succesfully")
    
            },
            error:(res)=>{
      
              console.log(res);
              
            }
        })
        }
        else{
          alert("field empty")
        }
      }


  getProfile(){

    this.http.get('http://localhost:200/getUserProfile', { withCredentials: true }).subscribe({

      next:(res:any)=>{

        this.userProfile = res.profile[0]
        console.log(res.profile[0]);
        
      },
      error:(res)=>{

        console.log(res);
        
      }
  })
  }
  
}








