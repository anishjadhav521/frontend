import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-section',
  standalone: false,
  templateUrl: './chat-section.component.html',
  styleUrl: './chat-section.component.css'
})
export class ChatSectionComponent {

  users = [
    { name: 'Alice', avatar: 'assets/avatar1.jpg' },
    { name: 'Bob', avatar: 'assets/avatar2.jpg' },
    { name: 'Charlie', avatar: 'assets/avatar3.jpg' }
  ];

  sendMessage(username:string){


  }

}
