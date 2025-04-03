import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatSectionComponent } from './chat-section/chat-section.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  {path:'',component:ChatSectionComponent},
  {path:'chat/:receiverId',component:ChatComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
