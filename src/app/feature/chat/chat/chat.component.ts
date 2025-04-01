import { Component, OnInit } from "@angular/core";
import  { ChatService } from "../../../services/chat.service";
import  { UserService } from "../../../services/user.service";
// import { ChatService } from "../services/chat.service";

@Component({
  selector: "app-chat",
  standalone:false,
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
})
export class ChatComponent implements OnInit {


  userId !:number  // Should be dynamically set
  receiverId = "user456"; // Select dynamically
  messages: { senderId: string; content: string }[] = [];
  messageContent = "";

  constructor(private chatService: ChatService , private userService:UserService) {}

  ngOnInit() {

    this.userId=this.userService.user.profile.id


    this.chatService.registerUser(this.userId);
    
    this.chatService.onMessage().subscribe((message) => {
      this.messages.push(message);
    });
  }

  sendMessage() {
    if (this.messageContent.trim()) {
      this.chatService.sendMessage(this.userId, this.receiverId, this.messageContent);
      this.messages.push({ senderId: this.userId, content: this.messageContent });
      this.messageContent = "";
    }
  }
}