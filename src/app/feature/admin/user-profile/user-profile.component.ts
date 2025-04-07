import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FollowersFollowingService } from '../../../services/followers-following.service';
import { Role } from '../../../types/enum';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  

  constructor(private router:ActivatedRoute,private http :HttpClient, private followersFollowing:FollowersFollowingService,private userService:UserService){}
  followersCount: any;
  followers!: any[];
  followings: any;
  followingCount: any;
  role = Role.Admin
  username:any
  user:any
  posts:any=[]
  profileId:any


  ngOnInit(): void {

    if(!this.userService.user){

      this.http.get('http://localhost:200/getUser', { withCredentials: true }).subscribe({
  
        next: (res: any) => {
  
          this.userService.user = res.user
  
      
  
          console.log(res.user);
          
  
        }
      })
  }

    this.router.paramMap.subscribe({
      next:(res)=>{

        this.username = res.get('username')

      }
    })

    this.http.get(`http://localhost:200/getUser/${this.username}`, {withCredentials: true})
    .subscribe({
      next: (res: any) => {

        console.log(res.user.id);
        

        this.user = res.user;

        this.posts = res.user.user.post

        this.profileId = res.user.id;

        this.getFollowers(this.profileId)
        this.getFollowing(this.profileId)

      }
    })

    console.log(this.profileId);
    

    
  }

  getFollowers(profileId: any) {

    this.followersFollowing.getFollowers(profileId).subscribe({

     next:(res)=>{

      console.log(res);
      
       this.followers = res
       this.followersCount = this.followers.length

       // console.log(res);
       
     }
    });
}

getFollowing(profileId: any) {

  this.followersFollowing.getFollowing(profileId).subscribe({
    
    next:(res:any)=>{

      this.followings = res;
      
      this.followingCount = this.followings.length;

    }
  })
}

deleteComponent(postId:any){

  console.log("delet called");
  
  console.log(postId);
  
  this.posts = this.posts.filter(
    (post:any)=>
      {
        console.log(postId);
        console.log(post.PostId);
        
        
       return post.PostId != postId
      }
  )
}
}