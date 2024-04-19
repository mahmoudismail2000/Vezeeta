import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authDoctorGuard: CanActivateFn = (route, state) => {
  const _AuthService=inject(AuthService)
  _AuthService.getUserData()
  if(localStorage.getItem('eToken')!=null&&_AuthService.userData.Role=='Doctor'){
    return true;
  }else{
    return false
  }
  
};
