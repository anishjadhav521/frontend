import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
// import { Router } from 'express';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  constructor(private adminService : AdminService,private router : Router,private userService:UserService,private http:HttpClient){

  }

  ngOnInit(): void {
    if(!this.userService.user){

      this.http.get('http://localhost:200/getUser', { withCredentials: true }).subscribe({
  
        next: (res: any) => {
  
          this.userService.user = res.user
  
      
  
          console.log(res.user);
          
  
        }
      })
  }
  }

  @Input()
  user:any

  @Output()
  event = new EventEmitter()

  deleteUser(userId:any){ 

    console.log(userId);

    this.event.emit()
    
    this.adminService.deleteUser(userId).subscribe({

      next:(res:any)=>{

        alert(res.msg)

      },
      error:(err)=>{

        alert(err)
      }

    })

    
  }

  openProfile(username:string){

    this.router.navigate(['/admin/userProfile',username])


  }


}
