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

  ngOnInit(): void {

   this.adminService.getAllUsers().subscribe({

    next:(res:any)=>{

      this.users = res.users
      console.log(this.users[0].id);
      
    },
    error:(err)=>{

      console.log(err);
    }
   })
  }

  deleteUser(userId:any){ 

    console.log(userId);
    
    this.adminService.deleteUser(userId).subscribe({

      next:(res:any)=>{

        alert(res.msg)

      },
      error:(err)=>{

        alert(err)
      }

    })
  }



    users!:any[]

  }




