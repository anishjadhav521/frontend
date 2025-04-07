import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user-list/user-list.component';
import { DrawerModule } from 'primeng/drawer';
import { Message } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SharedModule } from '../../shared/shared.module';
import { DisplayComponent } from './display/display.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    UserListComponent,
    UserProfileComponent,
    DisplayComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MessageModule,
    DrawerModule,
    ToastModule,
    Message,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
