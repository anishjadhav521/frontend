import { Component, DoCheck, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { CommentService } from '../../../services/comment.service';
import { LoginComponent } from '../../../feature/auth/login/login.component';

@Component({
  selector: 'app-comments',
  standalone: false,
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit {

  constructor(private commentService:CommentService){ }

  comments!:any[]

  @Input()
  postComment=true

  ngOnInit(): void {

    
     
    // this.getComments();

    console.log("comm");
    

    this.commentService.getComments(this.PostId).subscribe({

      next:(res:any)=>{

        this.comments = res.comments
      }
    })

    // this.commentService.commentSubject$.subscribe({
    //   next:(res)=>{

    //     this.comments = res
    //   }
    // })

  }

  @Output()
  emmitter = new EventEmitter<any>()

  @Input()
  PostId:any

  @Input()
  profileId:any

  comment:string=''

  addComment(){

    console.log("started");
    
    const com = {

      comment:this.comment,
      profileId:this.profileId,
      postId:this.PostId

    }
    console.log(com);
    
    if(!this.comments){

      this.comments = []
    }
    this.comments.push(com)

    this.commentService.addComment(this.comment,this.profileId,this.PostId);

    
  }

  deleteComment(commentId:any){

    console.log(commentId);

    this.comments = this.comments.filter((comment)=>{

      return comment.commentId != commentId
      

    })

    console.log(this.comment);
    

    this.commentService.deletComments(commentId).subscribe()

    
   
  }

  // getComments(){

  //   this.commentService.getComments(this.PostId).subscribe({

  //     next:(res:any)=>{ 

  //       // console.log(this.profileId);
        
  //       this.comments = res.comments

  //     }

  //   })

  closeComment(){

    if(!this.comments){
      this.comments = []
    }
    console.log(this.comments.length);
    

    const event ={

      value:false,
      length: this.comments.length 
    }

    // console.log(event);
  
    console.log(event);
    

    this.emmitter.emit(event)

  }



  }

  

  