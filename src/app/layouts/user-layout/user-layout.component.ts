import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from 'src/app/components/navbarAuth/navbar.component';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [CommonModule,RouterOutlet,NavbarComponent],
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent {

}
