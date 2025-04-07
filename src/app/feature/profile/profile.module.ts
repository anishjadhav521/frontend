import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password/change-password.component';
// import { SharedModule } from 'primeng/api';
// import { SharedModule_1 as SharedModule } from "../../shared/shared.module";/
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ProfileComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // SharedModule,
    SharedModule
]
})
export class ProfileModule { }
