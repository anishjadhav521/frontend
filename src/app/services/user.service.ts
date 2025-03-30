import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {


  userSubject = new Subject()
  user:any

  constructor() { 

    

  }

  ngOnInit() {

    // cons

    
  }

  
  
  
}
