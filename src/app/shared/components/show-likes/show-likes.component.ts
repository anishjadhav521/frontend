import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-show-likes',
  standalone: false,
  templateUrl: './show-likes.component.html',
  styleUrl: './show-likes.component.css'
})
export class ShowLikesComponent implements OnInit {


  @Input()
  likes:any

  @Output()
  close = new EventEmitter()

  ngOnInit(): void {

    console.log(this.likes);

    
    

  }

  closeComment(){

    this.close.emit()
  }
  

}
