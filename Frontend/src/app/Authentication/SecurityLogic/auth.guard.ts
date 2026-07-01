import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const roles = route.data['role'] as string[];

    if (!localStorage.getItem('token')) {
      this.router.navigate(['/Home']);
      localStorage.removeItem('username');
      return false;
    }

    if(!roles.includes(localStorage.getItem('role')!))
      return false;

    
    return true;
  }
}
