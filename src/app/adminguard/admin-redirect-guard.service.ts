import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Injectable()
export class AdminRedirectGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const currentRole = await this.auth.getRole();
    if (this.auth.isAuthenticated() && currentRole === 'admin') {
      this.router.navigate(['/admin']);
      return false;
    }
    return true;
  }
}
