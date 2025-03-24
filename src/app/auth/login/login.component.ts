import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  userForm!:FormGroup

  constructor(){

    this.userForm = new FormGroup({

      username : new FormControl<string>('',[Validators.required]),
      password : new FormControl<string>('',[Validators.email,Validators.required]),
  
    })
  }

  onSubmit(){

    if(this.userForm.valid){


    }
    else{

      
    }
  }

}
