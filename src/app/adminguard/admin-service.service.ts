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
  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {

    const expectedRole = route.data['expectedRole']; 
    const currentUser = this.auth.getCurrentUser();
    console.log(currentUser, this.auth.isAuthenticated(), 'hi');
    
  
    if (await currentUser && this.auth.isAuthenticated()) {
      return true; 
    }
  
    const currentRole = await this.auth.getRole();
    if (!this.auth.isAuthenticated() || currentRole !== expectedRole) {
       this.router.navigate(['login']);
       return false; 
    }
  
    return true;
  }
}
