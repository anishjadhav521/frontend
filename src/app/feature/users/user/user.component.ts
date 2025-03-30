import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  user = {
    username: 'john_doe',
    profilePic: 'assets/profile.jpg',
    bio: 'Photographer | Traveler | Coder',
    followers: 500,
    following: 120,
    posts: [
      { image: 'assets/post1.jpg', caption: 'Sunset view!', likes: 120, liked: false, comments: [] },
      { image: 'assets/post2.jpg', caption: 'Mountains calling.', likes: 200, liked: false, comments: [] }
    ]
  };

  isFollowing = false;

  toggleFollow() {
    this.isFollowing = !this.isFollowing;
    this.user.followers += this.isFollowing ? 1 : -1;
  }

  likePost(post: any) {
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
  }

  suggestedUsers = [
    { username: 'jane_smith' },
    { username: 'alex_99' },
    { username: 'traveler_joe' }
  ];

  followUser(user: any) {
    console.log(`Followed ${user.username}`);
  }

}
