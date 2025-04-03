import { Injectable } from "@angular/core";
import { io, Socket } from "socket.io-client";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  private socket: Socket;

  constructor() {
    this.socket = io("http://localhost:200"); // Connect to Express server
  }

  // Register user ID with socket
  registerUser(userId:number) {
    this.socket.emit("register", userId);
  }

  // Send  message
  sendMessage(senderId: number, receiverId: number, content: string) {
    
    console.log(senderId,receiverId,content);
    
    this.socket.emit("private_message", { senderId, receiverId, content });
  }

  // Receive messages
  onMessage(): Observable<{ senderId: string; content: string }> {
    return new Observable((observer) => {
      this.socket.on("private_message", (message) => {
        observer.next(message);
      });
    });
  }

 // Disconnect socket
 disconnect() {
  this.socket.disconnect();
  }
}