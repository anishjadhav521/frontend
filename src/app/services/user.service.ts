import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  user:any

  constructor() { 

    

  }

  ngOnInit() {

    // cons
    console.log(this.user);
    
    
  }

  
  
  
}
