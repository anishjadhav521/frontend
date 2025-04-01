import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatModule } from './feature/chat/chat.module';
const routes: Routes =[
    
  {path:'',loadChildren:()=>import('./feature/auth/auth.module').then(m=>m.AuthModule)},
  {path:'home',loadChildren:()=>import('./feature/home/home.module').then(m=>m.HomeModule)},
  {path:'home/profile',loadChildren:()=>import('./feature/profile/profile.module').then(m=>m.ProfileModule)},
  {path:'search',loadChildren:()=>import('./feature/search/search.module').then(m=>m.SearchModule)},
  {path:'users',loadChildren:()=>import('./feature/users/users.module').then(m=>m.UsersModule)},
  {path:'message',loadChildren:()=>import('./feature/chat/chat.module').then(m=>m.ChatModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
