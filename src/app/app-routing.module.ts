import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatModule } from './feature/chat/chat.module';
import { AdminModule } from './feature/admin/admin.module';
import { AuthGuard } from './guards/auth.guard';
import { PageModule } from './feature/page/page.module';

const routes: Routes =[
    
  {path:'',loadChildren:()=>import('./feature/auth/auth.module').then(m=>m.AuthModule)},
  {path:'home',loadChildren:()=>import('./feature/home/home.module').then(m=>m.HomeModule)},
  {path:'home/profile',loadChildren:()=>import('./feature/profile/profile.module').then(m=>m.ProfileModule)},
  {path:'search',loadChildren:()=>import('./feature/search/search.module').then(m=>m.SearchModule)},
  {path:'users',loadChildren:()=>import('./feature/users/users.module').then(m=>m.UsersModule)},
  {path:'message',loadChildren:()=>import('./feature/chat/chat.module').then(m=>m.ChatModule)},
  {path:'admin',loadChildren:()=>import('./feature/admin/admin.module').then(m=>m.AdminModule),canActivate:[AuthGuard]},
  {path:'**',loadChildren:()=>import('./feature/page/page.module').then(m=>m.PageModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
