import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import  { Router } from '@angular/router';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  constructor(private http:HttpClient , private router:Router){}

  username = new FormControl<string>('')
  users!:any[]

  ngOnInit(): void {

    this.username.valueChanges.pipe(debounceTime(500)).subscribe(
      {
        next:(username)=>{

          this.http.get(`http://localhost:200/getUsers/${username}`,{withCredentials:true}).subscribe({
            next:(res:any)=>{

              
              
              this.users = res.users

              console.log(this.users);

            }
          })
          
        }
      }
    )
  }

  openProfile(username:string){

    this.router.navigate(['/users',username])


  }

}
