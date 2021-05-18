import { Injectable } from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {UserService} from "../service/user.service";

@Injectable()
export class UserGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  /**
   * Validates the current session and redirects if it is not valid.
   */
  canActivate(): boolean {
    if (!this.userService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
