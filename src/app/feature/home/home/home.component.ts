import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, viewChild, ViewContainerRef, type ComponentRef } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';
import { CommentsComponent } from '../../../shared/components/comments/comments.component';


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
  profileId : any
  postLength:any
  visible2: boolean = false;
  profileIdOfCommenter:any
  userId:any



  constructor(private http: HttpClient, private userService: UserService, private router: Router,private notification:NotificationService) { }

  ngOnInit(): void {

    if(!this.userService.user){

      this.http.get('http://localhost:200/getUser', { withCredentials: true }).subscribe({

        next: (res: any) => {
  
          this.userName = res.user.profile.userName

          this.profileId = res.user.profile.id
          console.log(this.profileId);
          
  
          this.userService.user = res.user
        
          this.posts = res.user.post


          this.postLength = this.posts.length
          

          // console.log(this.posts[0].like[0].user);
          

          // console.log(this.posts[0].imgUrl);
          
  
          this.posts.forEach((post: any) => {

            console.log(post.like.length);
            this.likeCount = post.like.length

          
            post.like.forEach(
              (obj: any) => {

                console.log(obj.user);
                
  
                console.log(this.userService.user.userId);
                
                if (obj.user.userId == this.userService.user.userId) {
  
                  this.liked= true;
                  console.log(true);
                  
  
                }
                else{
                  this.liked=false
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

    console.log(this.posts);
    

    this.postLength = this.posts.length

    this.posts.forEach((post: any) => {

      console.log(post);
      this.likeCount = post.like.length
      
    
      post.like.forEach(
        (obj: any) => {

          console.log(this.userService.user.userId);
          
          if (obj.user.userId == this.userService.user.userId) {

            this.liked= true;

          }
        })
    });
  }

  liked!:boolean 
  likeCount:any

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

  

  IsVisible:boolean =false

  
  PId:any
  

  notifications : any

  async openNotification(){

    console.log("noti");
    

    await this.notification.getNotification(this.profileId).subscribe({

      next:(res)=>{

        console.log(this.profileId);
        
          
        console.log(res);
        
        this.notifications = res

      }
    })

    this.visible2 = !this.visible2
  }
}



// @ViewChild('container',{read:ViewContainerRef})
  // vcr ?: ViewContainerRef;

  // #component?:ComponentRef<any>



// updateLikes(id: number, liked: boolean, likes: number) {

//   const updates: any = {

//     postId: id,
//     updatedLiked: liked,
//     updatedLikes: likes
//   }

//   this.http.patch('http://localhost:200/updateLike', updates, { withCredentials: true }).subscribe(

//     {
//       next: (res: any) => {
//         this.likes = res.like
//       }
//     }

//   )

// }