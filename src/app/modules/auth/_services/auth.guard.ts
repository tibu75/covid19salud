import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}

  canActivate() {
    const currentUser = sessionStorage.getItem("token");
    if (currentUser === null) {
      // logged in so return true
      this.router.navigate(["/auth/login"], {
        queryParams: {},
      });
      return false;
    }

    ////console.log("Bloq for the guard");
    // not logged in so redirect to login page with the return url
    ////console.log("currentUser", currentUser);
    return true;
  }
}
