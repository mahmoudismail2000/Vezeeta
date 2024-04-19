import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from 'src/app/components/navbarAuth/navbar.component';
import { NavbarBlankComponent } from 'src/app/components/navbar-blank/navbar-blank.component';

@Component({
  selector: 'app-layout-auth',
  standalone: true,
  imports: [CommonModule,RouterOutlet,NavbarComponent,NavbarBlankComponent],
  templateUrl: './layout-auth.component.html',
  styleUrls: ['./layout-auth.component.scss']
})
export class LayoutAuthComponent {

}
