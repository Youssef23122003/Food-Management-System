import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../../../Shared/Components/sidebar/sidebar.component";
import { NavbarComponent } from "../../../Shared/Components/navbar/navbar.component";




@Component({
  selector: 'app-blank-layout',
  imports: [RouterOutlet, SidebarComponent, NavbarComponent],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.css'
})
export class BlankLayoutComponent {

}
