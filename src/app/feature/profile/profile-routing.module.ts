import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { InsightsComponent } from './insights/insights.component';

const routes: Routes = [
  {path:'',component:ProfileComponent},
  {path:'insights',component:InsightsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
