import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FollowersFollowingService } from '../../../services/followers-following.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-followers',
  standalone: false,
  templateUrl: './followers.component.html',
  styleUrl: './followers.component.css'
})
export class FollowersComponent implements OnInit {

  constructor(private router: Router, private followersFollowing:FollowersFollowingService){}

  @Input()
  profileId:any

  followers:any


  ngOnInit(): void {
    
     this.followersFollowing.getFollowers(this.profileId).subscribe({
      next:(array)=>{

        this.followers = array
        console.log(this.followers);
        
      }
     });

    //  this.followers = this.followersFollowing.followersSubject$.subscribe({
    //   next:(array)=>{
        

    //     console.log(this.followers);
    //   }
    //  })
    
    
    console.log(this.profileId);

    
    
  }

  // openProfile(username:string){

  //   this.router.navigate(['users/user',username])
  // }

}
