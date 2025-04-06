import { Component, EventEmitter, Input, Output, output } from '@angular/core';

@Component({
  selector: 'app-comment',
  standalone: false,
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {

@Input()
comment:any

@Output()
delete = new EventEmitter()

  deleteComment(commentId:any){


    this.delete.emit()
      

    }

}
