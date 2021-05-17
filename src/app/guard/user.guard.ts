import { Injectable } from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {UserService} from "../service/user.service";

@Injectable()
export class UserGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    if (!this.userService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
