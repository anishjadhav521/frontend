import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
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

  constructor(private http: HttpClient, private userService: UserService, private router:Router) { }

  ngOnInit(): void {

    this.http.get('http://localhost:200/getUser', { withCredentials: true }).subscribe({

      next: (res: any) => {

        console.log(res);
        
        this.userService.user = res.user

        this.posts = res.user.post

        this.userName = res.user.userName
      },

      error:(res)=>{

        this.router.navigate(['/login'])
        
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

  addPost() {

    this.isPostFormVisible = !this.isPostFormVisible
    const formdata = new FormData()
    formdata.append('file', this.file)
    formdata.append('caption', this.caption)

    this.http.post('http://localhost:200/addPost', formdata, { withCredentials: true }).subscribe({

      next: (res: any) => {

        alert(res.msg)

        this.http.get('http://localhost:200/getPost', { withCredentials: true }).subscribe({

          next: (res: any) => {
            this.posts = res.posts
            console.log(res.posts[0].caption);
            this.userName = res.posts[0].userName
          }
        })
      }
    })
  }
  likes?:number

  addLike(id:number){

    this.http.post('http://localhost:200/addLike',id).subscribe(

      {
        next:(res:any)=>{
            this.likes=res.like
        }
      }

    )

  }
}

