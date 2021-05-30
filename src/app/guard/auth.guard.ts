import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
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
  canActivate(route: ActivatedRouteSnapshot): boolean {

    let roles = route.data.roles as Array<string>;

    if (! this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }

    // There is an user, setting up
    let user: UserModel = Object.assign(new UserModel(), this.authService.getCurrentUserFromStorage());
    this.authService.setCurrentUser(user);

    // Validates the permissions
    if(user.hasValidRole(roles)) {
      return true
    } else {
      this.router.navigate(['']);
      return false;
    }
  }

}
