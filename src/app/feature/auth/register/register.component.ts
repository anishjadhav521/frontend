import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, Validators, type AbstractControl, type ValidationErrors, type ValidatorFn } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  RegistrationForm!:FormGroup
  
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  constructor(private backend:HttpClient,private authService:AuthService){}


  ngOnInit() {

    this.RegistrationForm = new FormGroup({

      userName: new FormControl<string>('',[Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
      ]),
      confirmPassword: new FormControl('', [Validators.required]),

      phoneNumber : new FormControl('',[
        Validators.required,Validators.pattern(/^[6-9]\d{9}$/)
      ]),

      fullName : new FormControl('',[Validators.required,Validators.maxLength(20)])
    }, { validators: this.passwordMatchValidator });

    
  }

  signUp() {

    console.log(this.RegistrationForm);
    
    if (this.RegistrationForm.valid) {

    const data ={

      userName: this.RegistrationForm.value.userName.trim(),
      fullName:this.RegistrationForm.value.fullName.trim(),
      password:this.RegistrationForm.value.password.trim(),
      confirmPassword:this.RegistrationForm.value.confirmPassword.trim(),
      email:this.RegistrationForm.value.email.trim(),
      phoneNumber:this.RegistrationForm.value.phoneNumber.trim()
      
    }

    //  this.RegistrationForm.value.userName.trim()
      this.authService.signUp(data)
      this.RegistrationForm.reset(); 
    }
  }

}
