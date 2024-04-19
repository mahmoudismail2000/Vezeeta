import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarBlankComponent } from 'src/app/components/navbar-blank/navbar-blank.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';

@Component({
  selector: 'app-layout-blank',
  standalone: true,
  imports: [CommonModule,RouterOutlet,NavbarBlankComponent,FooterComponent],
  templateUrl: './layout-blank.component.html',
  styleUrls: ['./layout-blank.component.scss']
})
export class LayoutBlankComponent {

}
