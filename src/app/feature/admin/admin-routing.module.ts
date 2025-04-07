import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../../guards/auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DisplayComponent } from './display/display.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'userProfile/:username',component:UserProfileComponent},
  {path:'display/:boolean/:id',component:DisplayComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
