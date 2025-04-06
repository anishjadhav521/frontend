import { Component } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {


  constructor(private notification:NotificationService,private http:HttpClient,private userService : UserService){

  }

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


notifications : any


  togglePostForm() {

    this.isPostFormVisible = !this.isPostFormVisible
    console.log(this.isPostFormVisible);

  }
  onChange(event: any) {

    if (event.target.files.length > 0) {

      this.file = event.target.files[0];

    }
  }

   openNotification(){

    console.log("noti");

    console.log(this.profileId);
    

     this.notification.getNotification(this.profileId).subscribe({

      next:(res)=>{

        console.log(this.profileId);
        
          
        console.log(res);
        
        this.notifications = res

      }
    })

    this.visible2 = !this.visible2
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

}
