import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-posts',
  standalone: false,
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {

  constructor(private userService:UserService,private http :HttpClient,private notification:NotificationService){}

  @Input() post:any

  userName:any
  profileId:any
  posts:any
  likeCount:any
  liked!:boolean
  isVisible!:boolean

  ngOnInit(): void {
    
    this.likeCount = this.post.likesCount

    this.post.like.forEach(
      (obj: any) => {

        console.log(this.userService.user.userId);
        
        if (obj.user.userId == this.userService.user.userId) {

          this.liked= true;

        }
      })

  }
 
  

  like(post: any) {

    this.liked = !this.liked
    post.like.isLiked = !post.like.isLiked;
    this.likeCount = this.liked ? this.likeCount + 1 : this.likeCount - 1;

    if (this.likeCount  < 0) {
      this.likeCount  = 0
    }

    
    const post1 = {
      postId : post.PostId
    }
    
    this.http.post(`http://localhost:200/addLike`,post1,{withCredentials:true}).subscribe()

    // this.updateLikes(post.PostId, post.like.isLiked, post.like.count)

    const notification ={

      profileId : this.profileId,
      notification : `${this.userName} liked your post`

    }

    this.notification.addNotification(notification).subscribe()


}

disLike(post:any){


  this.liked = !this.liked
  this.likeCount = this.liked ? this.likeCount + 1 : this.likeCount - 1;
  if (this.likeCount  < 0) {
    this.likeCount  = 0
  }
  this.http.delete(`http://localhost:200/deleteLike/${post.PostId}`,{withCredentials:true}).subscribe(
    {
      next:(res)=>{

        console.log(res);
        
      },
      error:(er)=>{

        console.log(er.error);
        
      }
    }
  )
}


PId:any
openComments(postId:any){

  // this.#component = this.vcr?.createComponent(CommentsComponent)

  console.log(postId);
  console.log(this.profileId);
  
  

  this.isVisible = !this.isVisible
  this.PId= postId

}

closeComments(event:any){

  // this.#component?.destroy()
  this.isVisible = event
  

}
}