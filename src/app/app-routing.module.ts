import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './feature/auth/register/register.component';
import { LoginComponent } from './feature/auth/login/login.component';
import { AuthModule } from './feature/auth/auth.module';
AuthModule

const routes: Routes =[
  
  
  {path:'',loadChildren:()=>import('./feature/auth/auth.module').then(m=>m.AuthModule)},
  {path:'home',loadChildren:()=>import('./feature/home/home.module').then(m=>m.HomeModule)},
  {path:'home/profile',loadChildren:()=>import('./feature/profile/profile.module').then(m=>m.ProfileModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
