import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../service/auth.service";
import { UserModel } from "../model/user";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Validates the current session and redirects if it is not valid.
   */
  canActivate(): boolean {
    if (! this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    // There is an user, setting up
    let user: UserModel = Object.assign(new UserModel(), this.authService.getCurrentUserFromStorage());
    this.authService.setCurrentUser(user);
    return true;
  }

}
