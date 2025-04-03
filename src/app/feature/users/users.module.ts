import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserComponent } from './user/user.component';
import { DisplayComponent } from './display/display.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    UserComponent,
    DisplayComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
