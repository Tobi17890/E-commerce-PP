import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService implements CanActivate{

  constructor(public auth: AuthService, public router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const expectedRole = route.data['expectedRole'] as string ;
    const currentRole = await this.auth.getRole(); // Use the getRole method

    if (!this.auth.isAuthenticated() || currentRole !== expectedRole) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
