import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar-blank',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './navbar-blank.component.html',
  styleUrls: ['./navbar-blank.component.scss']
})
export class NavbarBlankComponent implements OnInit{
  constructor(private _Router:Router,private _AuthService:AuthService){}
  roleOfUser:string=''
  idOfUser!:number
  ngOnInit(): void {
    this._AuthService.getUserData()
    this.roleOfUser=this._AuthService.userData.Role
    this.idOfUser=this._AuthService.userData.Id
    console.log(this.roleOfUser);
    
  }
  signOut():void
  {
    localStorage.removeItem('eToken')
    this._Router.navigate(['/login'])

  }


}
