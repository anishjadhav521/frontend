import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-display',
  standalone: false,
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent {

  constructor(private router:ActivatedRoute){}

  profileId:any
  Isfollowers! : boolean

  ngOnInit(): void {
    this.router.paramMap.subscribe({
      next:(param)=>{

      this.Isfollowers  = param.get('boolean') === 'true'
      this.profileId = param.get('id')
       
      console.log( this.Isfollowers);
      
      }
    })
  }

}
