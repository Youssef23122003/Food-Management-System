import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../../Core/Services/Auth Service/auth.service';
import { Token } from '../../../Core/Interfaces/token.interface';
import { LogoutComponent } from "../logout/logout.component";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, LogoutComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  token!:Token
  private readonly authService = inject(AuthService)
  @ViewChild(LogoutComponent) mylogoutModal!:LogoutComponent

ngOnInit(): void {
this.token =  this.authService.decodeToken()
}

}
