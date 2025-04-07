import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../../services/notification.service';
import e from 'express';
import { Role } from '../../../types/enum';

@Component({
  selector: 'app-posts',
  standalone: false,
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {
  file: any;
  caption!: string ;

  constructor(private userService:UserService,private http :HttpClient,private notification:NotificationService){}

  @Input() post:any
  @Input() added:any
  @Input() role = Role.User

  userName:any
  profileId:any
  posts:any
  likeCount:any
  liked!:boolean
  isVisible!:boolean
  isPostFormVisible!:boolean
  likvis:boolean =true

  @Output()
  delete = new EventEmitter()


  deleteVisible !: boolean;
  commentLength!:any

  ngOnInit(): void {

    if(this.role == Role.Admin){

      this.likvis = false
    }
    else{

      this.likvis = true
    }

    console.log(this.post.imgUrl);
    

    this.commentLength = this.post.comments.length

    this.profileId = this.userService.user.profile.id
    
    this.likeCount = this.post.likesCount

    if(this.userService.user.profile.userName==this.post.userName || this.userService.user.role === Role.Admin){

      console.log("t");
      
      this.deleteVisible = true
    }
    else{
      this.deleteVisible = false
      console.log("f");
    }

    console.log(this.post.userName);
    

    this.post.like.forEach(
      (obj: any) => { 



        // console.log(this.userService.user.userId);
        // console.log(obj);  
        
        // console.log(obj.user.userId == this.userService.user.userId);
        
        if (obj.user.userId == this.userService.user.userId) {

          this.liked= true;

        }
      })

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
      notification : `${this.userService.user.profile.userName} liked your post`

    }
    console.log(this.profileId);
    

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
  console.log(event);
  
  this.isVisible = event.value
  this.commentLength = event.length

}

deletePost(postId:any){

  // this.posts = this.posts.filter((post:any)=>post.PostId!=postId)

  this.http.delete(`http://localhost:200/deletePost/${postId}`,{withCredentials:true}).subscribe()

  this.delete.emit()

  
}



  }
       
 
