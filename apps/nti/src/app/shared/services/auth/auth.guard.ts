import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SharedService } from '../shared';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private route: Router, private userService: SharedService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      
    if (localStorage.getItem('userToken') != null) {
      let roles = next.data['roles'] as Array<string>;
      if (roles) {
        var match = this.userService.roleMatch(roles);
        if (match)
          return true;
        else {
          this.route.navigate(['/forbidden']);
          return false;
        }
      }
      else
        return true;
    }
    this.route.navigate(['/home'])
    return false;
  }
}
