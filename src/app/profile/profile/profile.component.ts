import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  constructor(private http: HttpClient, private userService:UserService) { }

  userProfile:any

  ngOnInit(): void {


  this.userProfile = this.userService.user.profile
    console.log(this.userProfile);
    
  }

}


