import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { AuthService } from "../_services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  constructor(private usuarioService: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // console.log("guard", this.usuarioService.role);
    if (this.usuarioService.role === "ADMIN_ROLE") {
      return true;
    } else if (this.usuarioService.role === "SYSTEM_ROLE") {
      return true;
    } else {
      this.router.navigateByUrl("/dashboard");
      return false;
    }
  }
}
