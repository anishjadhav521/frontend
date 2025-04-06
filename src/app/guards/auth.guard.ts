import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../services/user.service";
import { Role } from "../types/enum";


@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate{

  constructor( private userService:UserService  , private router:Router ){

    console.log(this.userService.user);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any{

  
    if(!this.userService.user){

      this.router.navigate(['/login'])
    }
    else if(this.userService.user.role == Role.Admin ){
     
      return true

    }
    else{

      this.router.navigate(['/home'])
    }
    
    
  }



}

function elseif() {
  throw new Error("Function not implemented.");
}
