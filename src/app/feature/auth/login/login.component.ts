import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  userForm!:FormGroup

  constructor(private backend:HttpClient,private authService:AuthService){

    this.userForm = new FormGroup({

      email : new FormControl<string>('',[Validators.required,Validators.email,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]),
      password : new FormControl<string>('',[Validators.required]),
  
    })
  }

  logIn(){

    if(this.userForm.valid){

      this.authService.logIn(this.userForm.value)
    }
  }

}
