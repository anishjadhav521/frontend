import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { animationFrameProvider } from 'rxjs/internal/scheduler/animationFrameProvider';
import { UserService } from '../../../services/user.service';
import { ButtonDesignTokens } from '@primeng/themes/types/button';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  

  constructor(private http : HttpClient, private adminService:AdminService , private userService:UserService){}
  report: any;
  users!:any[]
  usersCount : any
  visible2:boolean = false
  reports:any
  username = new FormControl();

  ngOnInit(): void {



  if(!this.userService.user){

    this.http.get('http://localhost:200/getUser', { withCredentials: true }).subscribe({

      next: (res: any) => {

        this.userService.user = res.user

        console.log(res.user);
        console.log('hii');
        
      }
    })


  }

   this.adminService.getAllUsers().subscribe({

    next:(res:any)=>{

      this.users = res.users
      console.log(this.users.length );
      this.usersCount  = this.users.length
    },
    error:(err)=>{

      console.log(err);
    }
   })

  // this.usersCount = this.users.length

  this.username.valueChanges.pipe(debounceTime(500)).subscribe(
    {
      next:(username)=>{

        // console.log("hii");  
        

      this.users =  this.users.filter((user)=>{

        console.log(user.userName);
        

        return  user.userName.includes(username)

        })

        
      }
    })



  }

  deleteUser(userId:any){ 

    this.users = this.users.filter((user)=>user.userId != userId)

    this.usersCount = this.users.length

  }
  OpenReport(){

    this.http.get('http://localhost:200/getReports',{withCredentials:true}).subscribe({

      next:(res:any)=>{

        console.log(res.report);
        
        this.reports = res.report

        console.log(this.reports);
        
      }
    })

    this.visible2 = !this.visible2


  }


 

  }




