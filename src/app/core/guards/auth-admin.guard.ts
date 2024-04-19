import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authAdminGuard: CanActivateFn = (route, state) => {
  const _AuthService=inject(AuthService)
  const _Router=inject(Router)
  _AuthService.getUserData()
  if(localStorage.getItem('eToken')!=null&&_AuthService.userData.Role=='Admin'){
    return true;
  }
  else{
    _Router.navigate(['/login'])
    return false
  }
};
