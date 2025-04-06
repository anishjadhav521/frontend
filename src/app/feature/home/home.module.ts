import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FollowersFollowingComponent } from './followers-following/followers-following.component';
import { DisplayComponent } from './display/display.component';
import { SharedModule } from '../../shared/shared.module';
import { DrawerModule } from 'primeng/drawer';
import { Message } from 'primeng/message';
// import { PostsComponent } from './posts/posts.component';


@NgModule({
  declarations: [
    HomeComponent,
    FollowersFollowingComponent,
    DisplayComponent,
    // PostsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    SharedModule,
    DrawerModule,
    Message

  ]
})
export class HomeModule { }
