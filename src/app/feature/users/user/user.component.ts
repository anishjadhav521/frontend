import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';

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
    private userService: UserService
  ) {}

  user: any;
  followingId: any;
  followerId: any;
  isVisible!: boolean;
  profileId: any;

  followers!: any[];
  followersCount: any;

  followings!: any[];
  followingCount: any;

  ngOnInit() {
    if (!this.userService.user) {
      this.http
        .get('http://localhost:200/getUser', { withCredentials: true })
        .subscribe({
          next: (res: any) => {
            this.isFollowed();

            this.userService.user = res.user[0];
            // console.log(this.userService.user.profile.id);

            this.followerId = this.userService.user.profile.id;

            if (this.followingId === this.followerId) {
              this.isVisible = false;
            } else {
              this.isVisible = true;
            }
          },
        });
    }

    let username;

    this.routes.paramMap.subscribe(
      (param) => (username = param.get('username'))
    );


    this.http
      .get(`http://localhost:200/getUser/${username}`, {
        withCredentials: true,
      })
      .subscribe({
        next: (res: any) => {
          console.log(res.user);

          this.profileId = res.user.id;

          this.user = res.user;

          this.followingId = res.user.id;
          this.followerId = this.userService.user.profile.id;

          console.log(this.userService.user.userId);
          this.user.user.post.forEach((post: any) => {
            post.like.LikedBy.forEach((obj: any) => {
              console.log(this.userService.user.userId);

              if (obj.userId == this.userService.user.userId) {
                post.like.isLiked = true;
              }
            });
          });
          if (this.followingId === this.followerId) {
            this.isVisible = false;
          } else {
            this.isVisible = true;
          }

          this.isFollowed();
          this.getFollowers(this.profileId);
          this.getFollowing(this.profileId);
        },
      });
  }

  likePost(post: any) {
    post.like.isLiked = !post.like.isLiked;
    post.like.count = post.like.isLiked
      ? post.like.count + 1
      : post.like.count - 1;
    if (post.like.count < 0) {
      post.like.count = 0;
    }
    this.updateLikes(post.PostId, post.like.isLiked, post.like.count);
  }

  updateLikes(id: number, liked: boolean, likes: number) {
    const updates: any = {
      postId: id,
      updatedLiked: liked,
      updatedLikes: likes,
    };

    this.http
      .patch('http://localhost:200/updateLike', updates, {
        withCredentials: true,
      })
      .subscribe();
  }

  isFollowing: any;

  isFollowed() {
    this.http
      .get(
        `http://localhost:200/isFollow/${this.followingId}/${this.followerId}`,
        { withCredentials: true }
      )
      .subscribe({
        next: (res: any) => {
          this.isFollowing = res.isFollowing;
        },
      });
  }

  followUser() {
    this.isFollowing = !this.isFollowing;
    this.user.followers += this.isFollowing ? 1 : -1;
  
    console.log(this.followingId);

    this.http
      .post(
        'http://localhost:200/follow',
        { followingId: this.followingId, followerId: this.followerId },
        { withCredentials: true }
      )
      .subscribe({
        next: (res: any) => {
          console.log(res);

          this.getFollowers(this.profileId);
          this.getFollowing(this.profileId);
        },
        error: (err) => {
          console.log(err.error.msg);

          alert(err.error.msg);
        },
      });
  }

  unFollowUser() {
    this.isFollowing = !this.isFollowing;
    this.http
      .post(
        'http://localhost:200/unFollow',
        { followingId: this.followingId, followerId: this.followerId },
        { withCredentials: true }
      )
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.getFollowers(this.profileId);
          this.getFollowing(this.profileId);
        },
        error: (err) => {
          console.log(err);

          alert(err.error.msg);
        },
      });
  }
  

  getFollowers(profileId: any) {
    this.http
      .get(`http://localhost:200/getFollowers/${profileId}`, {
        withCredentials: true,
      })
      .subscribe({
        next: (res: any) => {

          this.followers = res.followers;
          this.followersCount = this.followers.length;

        },
        error: (err) => {
          alert(err.error.msg);
        },
      });
  }

  getFollowing(profileId: any) {
    this.http
      .get(`http://localhost:200/getFollowing/${profileId}`, {
        withCredentials: true,
      })
      .subscribe({
        next: (res: any) => {
    
          this.followings = res.followings;
          this.followingCount = this.followings.length;

        },
        error: (err) => {
        
          alert(err.error);
        },
      });
  }
}
