import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  standalone: false,
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit {

  constructor(private http : HttpClient){}

  updatePassForm!:FormGroup

  @Input()
  isFormVisible?:boolean 

  @Output()
  visibility = new EventEmitter<boolean>();

    ngOnInit() {

      this.updatePassForm = new FormGroup({

        currentPass : new FormControl('',[Validators.required]),
        updatedPass : new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)]),
        confirmPass : new FormControl('',[Validators.required])
        
        
      },{
        validators:this.passwordMatchValidator
      })
      
    }

    passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
      const password = group.get('updatedPass')?.value;
      const confirmPassword = group.get('confirmPass')?.value;
      return password === confirmPassword ? null : { passwordMismatch: true };
    }

    cancle(){

      this.isFormVisible = !this.isFormVisible
      this.visibility.emit(this.isFormVisible)

    }
    
    submit(){

      console.log(this.updatePassForm.value);
      
      this.http.patch('http://localhost:200/updatePassword',this.updatePassForm.value, { withCredentials: true }).subscribe({

        next:(res:any)=>{
          console.log(this.updatePassForm);
          alert(res.updatedProfile)
          
        }



    })

}
}