import { Component, Input } from '@angular/core';
import { FollowersFollowingService } from '../../../services/followers-following.service';

@Component({
  selector: 'app-following',
  standalone: false,
  templateUrl: './following.component.html',
  styleUrl: './following.component.css'
})
export class FollowingComponent {

  constructor(private followersFollowing:FollowersFollowingService){}

  @Input()
  profileId:any

  followings:any


  ngOnInit(): void {
    
    console.log(this.profileId);
    
     this.followersFollowing.getFollowing(this.profileId).subscribe({

      next:(array)=>{

        console.log(array);
        
        this.followings = array

        console.log(this.followings[0]);
      }

     })

    
    console.log(this.profileId);

    
    
  }

}
