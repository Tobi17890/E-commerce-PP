import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Injectable()
@Injectable()
export class AdminRedirectGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const [isAuthenticated, currentRole] = await Promise.all([
      this.auth.isAuthenticated(),
      this.auth.getRole()
    ]);


    console.log('isAuthenticated', isAuthenticated);
    console.log('currentRole', currentRole);
    

    if (isAuthenticated && currentRole === 'admin') {
      this.router.navigate(['/admin']);
      return false;
    }
    return true;
  }
}

