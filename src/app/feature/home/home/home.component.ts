import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  posts: any = []
  file: any;
  caption: string = ''
  isPostFormVisible: boolean = false;
  userName?: string

  constructor(private http: HttpClient, private userService: UserService, private router: Router) { }

  ngOnInit(): void {

    if(!this.userService.user){

      this.http.get('http://localhost:200/getUser', { withCredentials: true }).subscribe({

        next: (res: any) => {
  
          this.userName = res.user[0].profile.userName
  
          this.userService.user = res.user[0]
        
          this.posts = res.user[0].post

          console.log(this.posts[0].imgUrl);
          
  
          this.posts.forEach((post: any) => {
  
            post.like.LikedBy.forEach(
              (obj: any) => {
  
                console.log(this.userService.user.userId);
                
                if (obj.userId == this.userService.user.userId) {
  
                  post.like.isLiked = true;
  
                }
              })
          });
          
        },
  
        error: (res) => {
  
          this.router.navigate(['/login'])
  
        }
      })

    }

    this.userName = this.userService.user.profile.userName
    this.posts = this.userService.user.post

    this.posts.forEach((post: any) => {
  
      post.like.LikedBy.forEach(
        (obj: any) => {

          console.log(this.userService.user.userId);
          
          if (obj.userId == this.userService.user.userId) {

            post.like.isLiked = true;

          }
        })
    });
  }

  toggleLike(post: any) {

    post.like.isLiked = !post.like.isLiked;
    post.like.count = post.like.isLiked ? post.like.count + 1 : post.like.count - 1;
    if (post.like.count < 0) {
      post.like.count = 0
    }

    this.updateLikes(post.PostId, post.like.isLiked, post.like.count)
  }

  togglePostForm() {

    this.isPostFormVisible = !this.isPostFormVisible
    console.log(this.isPostFormVisible);

  }


  onChange(event: any) {

    if (event.target.files.length > 0) {

      this.file = event.target.files[0];

    }
  }

  addPost() {

    this.isPostFormVisible = !this.isPostFormVisible
    const formdata = new FormData()
    formdata.append('file', this.file)
    formdata.append('caption', this.caption)

    if(this.file || this.caption){

      this.http.post('http://localhost:200/addPost', formdata, { withCredentials: true }).subscribe({

        next: (res: any) => {
  
          alert(res.msg)
  
          this.http.get('http://localhost:200/getPost', { withCredentials: true }).subscribe({
  
            next: (res: any) => {
              console.log(res.posts);
  
              this.posts = res.posts
              console.log(res.posts[0].caption);
              this.userName = res.posts[0].userName
  
              this.posts.forEach((post: any) => {
  
                post.like.LikedBy.forEach(
                  (obj: any) => {
  
                    if (obj.userId == this.userService.user[0].userId) {
  
                      post.like.isLiked = true;
  
                    }
                  })
              });
            }
          })
        }
      })
    }
    else{

      alert("empty")
    }

    
  }
  likes?: number

  updateLikes(id: number, liked: boolean, likes: number) {

    const updates: any = {

      postId: id,
      updatedLiked: liked,
      updatedLikes: likes
    }

    this.http.patch('http://localhost:200/updateLike', updates, { withCredentials: true }).subscribe(

      {
        next: (res: any) => {
          this.likes = res.like
        }
      }

    )

  }
}

