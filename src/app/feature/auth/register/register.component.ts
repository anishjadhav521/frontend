import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, Validators, type AbstractControl, type ValidationErrors, type ValidatorFn } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  RegistrationForm!:FormGroup
  
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  constructor(private backend:HttpClient,private authService:AuthService){

    // const http:HttpClient =inject(HttpClient)

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
        Validators.required
      ]),
      fullName : new FormControl('',[Validators.required,Validators.minLength(20)])
    }, { validators: this.passwordMatchValidator });

  }

  signUp() {
    
    if (this.RegistrationForm.valid) {

      this.authService.signUp(this.RegistrationForm.value)
       
    }
  }

}
