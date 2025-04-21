import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";



@Injectable({
  providedIn:"root"
})
export class routeGuard implements CanActivate{

  constructor(private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isLogin = localStorage.getItem('isLogin');

    if (isLogin === 'true') {
        return true;
    } else {
       
      this.router.navigate(['/'])
      alert('login first')
      return false
    }
}



}