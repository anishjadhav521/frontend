import  { HttpClient } from '@angular/common/http';
import { Component, type OnInit } from '@angular/core';
import  { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-section',
  standalone: false,
  templateUrl: './chat-section.component.html',
  styleUrl: './chat-section.component.css'
})
export class ChatSectionComponent implements OnInit{

  constructor(private http :HttpClient , private userService:UserService ,private router:Router){}

  // users = [
  //   { name: 'Alice', avatar: 'assets/avatar1.jpg' },
  //   { name: 'Bob', avatar: 'assets/avatar2.jpg' },
  //   { name: 'Charlie', avatar: 'assets/avatar3.jpg' }
  // ];

  users:any

  profileId!:number
  ngOnInit() {

    this.profileId = this.userService.user.profile.id

    this.getFollowers(this.profileId)
      
  }

  sendMessage(receiverId:any){

    this.router.navigate(['/message/chat',receiverId])



  }

  getFollowers(profileId: any) {
    this.http
      .get(`http://localhost:200/getFollowers/${profileId}`, {
        withCredentials: true,
      })
      .subscribe({
        next: (res: any) => {

          this.users=res.followers

          console.log(res.followers);

          // this.followers = res.followers;
          // this.followersCount = this.followers.length;

        },
        error: (err) => {
          alert(err.error.msg);
        },
      });
  }

}
