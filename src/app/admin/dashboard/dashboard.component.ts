import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent{
  constructor(private _Renderer2:Renderer2,private _Router:Router,private _AdminService:AdminService){}
  isOpen:boolean=true
  isClose:boolean=false
  

  openTab(element1:HTMLDivElement,element2:HTMLDivElement,element3:HTMLDivElement):void
  {
    console.log(element1);
    if(this.isOpen){
      this._Renderer2.addClass(element1,'sideWidthToggle')
      this._Renderer2.addClass(element2,'navbarTopWidthToggle')
      this._Renderer2.addClass(element3,'contentToggle')
      this.isOpen=false

    }else{
      this._Renderer2.removeClass(element1,'sideWidthToggle')
      this._Renderer2.removeClass(element2,'navbarTopWidthToggle')
      this._Renderer2.removeClass(element3,'contentToggle')
      setTimeout(() => {
        this.isOpen=true
      }, 180);

    }
    


  }

  signOut():void
  {
    localStorage.removeItem('eToken')
    this._Router.navigate(['/login'])

  }
  
  }
 

