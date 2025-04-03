import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FollowersFollowingService } from '../../../services/followers-following.service';

@Component({
  selector: 'app-followers-following',
  standalone: false,
  templateUrl: './followers-following.component.html',
  styleUrl: './followers-following.component.css'
})
export class FollowersFollowingComponent implements OnChanges {

  constructor(private http : HttpClient, private followingFollowers:FollowersFollowingService){}


  ngOnChanges() {

    this.followingFollowers.getFollowers(this.profileId).subscribe()
    this.followingFollowers.getFollowing(this.profileId).subscribe()

    this.followingFollowers.followerCs$.subscribe(
      {
        next:(count)=>{
          
         this.followersCount = count
          
        }
      }
    )
    
    
    this.followingFollowers.followingCs$.subscribe({
      next:(count)=>{

        this.followingCount = count
      } 
    })
    
    
  }

  @Input()
  profileId:any

  @Input()
  postLength:any

  
  followersCount:any
  followingCount:any

}