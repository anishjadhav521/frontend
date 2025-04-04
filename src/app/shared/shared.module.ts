import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FollowersComponent } from './components/followers/followers.component';
import { FollowingComponent } from './components/following/following.component';
import { CommentsComponent } from './components/comments/comments.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    FollowersComponent,
    FollowingComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ButtonModule
  ],
  exports:[
    FollowersComponent,
    FollowingComponent,
    CommentsComponent
  ]
})
export class SharedModule { }
