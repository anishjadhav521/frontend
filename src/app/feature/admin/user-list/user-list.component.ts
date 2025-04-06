import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  constructor(private adminService : AdminService){

  }
  @Input()
  user:any

  @Output()
  event = new EventEmitter()

  deleteUser(userId:any){ 

    console.log(userId);

    this.event.emit()
    
    this.adminService.deleteUser(userId).subscribe({

      next:(res:any)=>{

        alert(res.msg)

      },
      error:(err)=>{

        alert(err)
      }

    })

    
  }


}
