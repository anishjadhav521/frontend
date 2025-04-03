import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { DisplayComponent } from './display/display.component';

const routes: Routes = [
  {path:'user/:username',component:UserComponent},
  {path:'display/:boolean/:id',component:DisplayComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
