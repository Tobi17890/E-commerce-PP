import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService implements CanActivate{

  constructor(public auth: AuthService, public router: Router) {    
  }
  // async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {

  //   const expectedRole = route.data['expectedRole']; 
  //   const currentUser = this.auth.getCurrentUser();
  //   if (currentUser && this.auth.isAuthenticated()) {
  //     return true; 
  //   }
  
  //   const currentRole = await this.auth.getRole();
  //   if (!this.auth.isAuthenticated() || currentRole !== expectedRole) {
  //      this.router.navigate(['login']);
  //      return false; 
  //   }
  //   return true;
  // }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'] as string;
    const currentRole = localStorage.getItem('role');
  
    if (currentRole === expectedRole) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
  
  
  
}
