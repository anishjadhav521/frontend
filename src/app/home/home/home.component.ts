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

  constructor(private backend: HttpClient) {

    backend.get('http://localhost:200/getPost', { withCredentials: true }).subscribe({

      next: (res: any) => {
        this.posts = res.posts
        console.log(res.posts[0].imgUrl);
      }
    })
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

