import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatSectionComponent } from './chat-section/chat-section.component';

const routes: Routes = [
  {path:'',component:ChatSectionComponent},
  // {path:}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
