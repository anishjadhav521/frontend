import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FollowersComponent } from './components/followers/followers.component';
import { FollowingComponent } from './components/following/following.component';
import { CommentsComponent } from './components/comments/comments.component';


@NgModule({
  declarations: [
    FollowersComponent,
    FollowingComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports:[
    FollowersComponent,
    FollowingComponent
  ]
})
export class SharedModule { }
