import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  posts: any = []


  file: any;
  caption: string = ''
  iisPostFormVisible:boolean  = false;

  constructor(private backend: HttpClient) {

    // this.iisPostFormVisible = false   


    // backend.get('http://localhost:200/getPost', { withCredentials: true }).subscribe({

    //   next: (res: any) => {
    //     this.posts = res.posts
    //     console.log(res.posts[0].caption);
    //   }
    // })

    this.posts = [
      {
        username: 'John Doe',
        imgUrl: 'https://source.unsplash.com/random/600x400?portrait',
        caption: 'Had a great day today!'
      },
      {
        username: 'Jane Smith',
        imgUrl: 'https://source.unsplash.com/random/600x400?nature',
        caption: 'Loving the weather!'
      }
    ];
  }
  
  togglePostForm(){

    this.iisPostFormVisible = !this.iisPostFormVisible
    console.log(this.iisPostFormVisible);
    
  }


  onChange(event: any) {

    if (event.target.files.length > 0) {

      this.file = event.target.files[0];

    }
  }

  addPost() {

    const formdata = new FormData()
    formdata.append('file', this.file)
    formdata.append('caption', this.caption)

    console.log(formdata);

    this.backend.post('http://localhost:200/addPost', formdata, { withCredentials: true }).subscribe({

      next: (res: any) => {
        console.log(res.msg);

      }
    })

  }
}

