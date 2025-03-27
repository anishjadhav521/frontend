import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileModule } from './profile/profile.module';

const routes: Routes =[
  
  {path:'',component:LoginComponent},
  {path:'registration',component:RegisterComponent},
  {path:'home',loadChildren:()=>import('./home/home.module').then(m=>m.HomeModule)},
  {path:'home/profile',loadChildren:()=>import('./profile/profile.module').then(m=>m.ProfileModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
