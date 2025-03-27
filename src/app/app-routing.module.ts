import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './feature/auth/register/register.component';
import { LoginComponent } from './feature/auth/login/login.component';

const routes: Routes =[
  
  {path:'',component:LoginComponent},
  {path:'registration',component:RegisterComponent},
  {path:'home',loadChildren:()=>import('./feature/home/home.module').then(m=>m.HomeModule)},
  {path:'home/profile',loadChildren:()=>import('./feature/profile/profile.module').then(m=>m.ProfileModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
