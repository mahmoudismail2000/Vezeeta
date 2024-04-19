import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vezeeta';
  
  isShow:boolean=false
  @HostListener('window:scroll')
  numberOfPixelsScroll():void
  {
    if(window.pageYOffset>100){
      this.isShow=true
      

    }else{
      this.isShow=false
    }
  }
  scrollTop():void{
        window.scrollTo({top:0,behavior:'smooth'})
  }
}
