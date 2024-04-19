import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authPatientGuard: CanActivateFn = (route, state) => {
  const _AuthService=inject(AuthService)
  _AuthService.getUserData()
  if(localStorage.getItem('eToken')!=null&&_AuthService.userData.Role=='Patient'){
    return true;
  }else{
    return false
  }
  
  
};
