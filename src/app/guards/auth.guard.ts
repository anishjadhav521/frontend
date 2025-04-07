import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../services/user.service";
import { Role } from "../types/enum";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router, private http: HttpClient) {
    console.log(this.userService.user);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    if (!this.userService.user) {

      return this.http.get('http://localhost:200/getUser', { withCredentials: true }).pipe(
        
        map((res: any) => {
          this.userService.user = res.user;
          if (this.userService.user.role === Role.Admin) {
            return true;
          } else {
            this.router.navigate(['/home']);
            return false;
          }
        }),
        catchError(() => {
          this.router.navigate(['/home']);
          return of(false);
        })
      );
    } else if (this.userService.user.role === Role.Admin) {
      return of(true);
    } else {
      this.router.navigate(['/home']);
      return of(false);
    }
  }
}