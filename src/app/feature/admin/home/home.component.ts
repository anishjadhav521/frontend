import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { animationFrameProvider } from 'rxjs/internal/scheduler/animationFrameProvider';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(private http : HttpClient, private adminService:AdminService){}

  users!:any[]

  ngOnInit(): void {

   this.adminService.getAllUsers().subscribe({

    next:(res:any)=>{

      this.users = res.users
      console.log(res );
      
    },
    error:(err)=>{

      console.log(err);
    }
   })
  }

  deleteUser(userId:any){ 

    this.users = this.users.filter((user)=>user.userId != userId)




    // console.log(userId);
    
    // this.adminService.deleteUser(userId).subscribe({

    //   next:(res:any)=>{

    //     alert(res.msg)

    //   },
    //   error:(err)=>{

    //     alert(err)
    //   }

    // })
  }



 

  }




