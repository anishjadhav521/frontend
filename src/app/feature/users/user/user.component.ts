import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { FollowersFollowingService } from '../../../services/followers-following.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  constructor(
    private routes: ActivatedRoute,
    private http: HttpClient,
    private userService: UserService,
    private followersFollowing:FollowersFollowingService,
    private notification:NotificationService
  ) {}

  user: any;
  followingId: any;
  followerId: any;
  isVisible: boolean = true
  profileId: any;

  followers!: any[];
  followersCount: any;

  followings!: any[];
  followingCount: any;

  mainUser:any

  posts:any

  ngOnInit() {
    if (!this.userService.user) {

      this.http.get('http://localhost:200/getUser', { withCredentials: true }).subscribe(
        {
          next: (res: any) => {

            this.isFollowed();

            this.userService.user = res.user;

            console.log(this.userService.user.profile.id);
            this.mainUser = this.userService.user.profile.userName
            this.followerId = this.userService.user.profile.id;
            

            console.log(this.followerId,this.followingId);

          
            

            if (this.followingId === this.followerId) {
              this.isVisible = false;
            } else {
              this.isVisible = true;
            }
          },
        });
    }

    let username

    this.routes.paramMap.subscribe(
      (param) => (username = param.get('username'))
    );


    this.http.get(`http://localhost:200/getUser/${username}`, {withCredentials: true})
      .subscribe({
        next: (res: any) => {
          console.log(res.user.user.post);

          this.posts = res.user.user.post

          this.profileId = res.user.id;

          this.user = res.user;

          this.followingId = res.user.id;
          this.followerId = this.userService.user.profile.id;

          console.log(this.followerId,this.followingId);

          console.log(this.userService.user.userId);

          


          if (this.followingId === this.followerId) {
            this.isVisible = false;
          } else {
            this.isVisible = true;
          }

          console.log(this.followerId,this.followingId);

          this.mainUser = this.userService.user.profile.userName
          console.log(this.mainUser);
          
          this.isFollowed();
          this.getFollowers(this.profileId);
          this.getFollowing(this.profileId);

    
        },
      });
  }

  


  isFollowing: any;

  isFollowed() {this.http.get(`http://localhost:200/isFollow/${this.followingId}/${this.followerId}`,{ withCredentials: true }).subscribe({

        next: (res: any) => {
          this.isFollowing = res.isFollowing;

          // console.log(this.isFollowing); 
        },
      });
  }

  followUser() {
    this.isFollowing = !this.isFollowing;
    this.user.followers += this.isFollowing ? 1 : -1;
  
    // console.log(this.followingId);

    this.http.post('http://localhost:200/follow',{ followingId: this.followingId, followerId: this.followerId },{ withCredentials: true })
      .subscribe({
        next: (res: any) => {
          // console.log(res);

          // this.followersFollowing.getFollowers(this.profileId);

          this.getFollowers(this.profileId)
          this.getFollowing(this.profileId);
        },
        error: (err) => {
          console.log(err.error.msg);

          alert(err.error.msg);
        },
      });
      
      const notification ={

        profileId : this.profileId,
        notification : `${this.mainUser} started following you`
  
      }
  
      this.notification.addNotification(notification).subscribe()
  }

  unFollowUser() {
    this.isFollowing = !this.isFollowing;
    this.user.followers += this.isFollowing ? 1 : -1;
    this.http
      .post(
        'http://localhost:200/unFollow',
        { followingId: this.followingId, followerId: this.followerId },
        { withCredentials: true }
      )
      .subscribe({
        next: (res: any) => {
          // console.log(res);
          // this.followersFollowing.getFollowers(this.profileId);

          this.getFollowers(this.profileId)

          // this.followersFollowing.getFollowers(this.profileId).subscribe({
          //   next:(array)=>{
          //     this.followers = array
      
          //     console.log(this.followers);
          //   }
          //  })
          this.getFollowing(this.profileId);
        },
        error: (err) => {
          console.log(err);

          alert(err.error.msg);
        },
      });
  }
  

  getFollowers(profileId: any) {

     this.followersFollowing.getFollowers(profileId).subscribe({

      next:(res)=>{
        this.followers = res
        this.followersCount = this.followers.length

        // console.log(res);
        
      }
     });

    // console.log(this.followers);
    
  }

  getFollowing(profileId: any) {

    this.followersFollowing.getFollowing(profileId).subscribe({
      
      next:(res:any)=>{

        this.followings = res;
        
        this.followingCount = this.followings.length;

      }
    })



  
  }
}




// this.user.user.post.forEach((post: any) => {
          //   post.like.forEach((obj: any) => {
          //     console.log(this.userService.user.userId);

          //     if (obj.userId == this.userService.user.userId) {
          //       post.like.isLiked = true;
          //     }
          //   });
          // });

          // this.post.like.forEach(
          //   (obj: any) => {
      
          //     console.log(this.userService.user.userId);
              
          //     if (obj.user.userId == this.userService.user.userId) {
      
          //       this.liked= true;
      
          //     }
          //   })



// updateLikes(id: number, liked: boolean, likes: number) {
//   const updates: any = {
//     postId: id,
//     updatedLiked: liked,
//     updatedLikes: likes,
//   };

//   this.http
//     .patch('http://localhost:200/updateLike', updates, {
//       withCredentials: true,
//     })
//     .subscribe();
// }


// likePost(post: any) {
//   post.like.isLiked = !post.like.isLiked;
//   post.like.count = post.like.isLiked
//     ? post.like.count + 1
//     : post.like.count - 1;
//   if (post.like.count < 0) {
//     post.like.count = 0;
//   }
//   this.updateLikes(post.PostId, post.like.isLiked, post.like.count);

//   const notification ={

//     profileId : this.profileId,
//     notification : `${this.mainUser} liked your post`

//   }

//   this.notification.addNotification(notification).subscribe()


// }


  // this.http
    //   .get(`http://localhost:200/getFollowing/${profileId}`, {
    //     withCredentials: true,
    //   })
    //   .subscribe({
    //     next: (res: any) => {
    
    //       this.followings = res.followings;
    //       this.followingCount = this.followings.length;

    //     },
    //     error: (err) => {
        
    //       alert(err.error);
    //     },
    //   });