import { NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../Core/Services/Auth Service/auth.service';
import { Token } from '../../../Core/Interfaces/token.interface';
import { LogoutComponent } from "../logout/logout.component";



@Component({
  selector: 'app-sidebar',
  imports: [NgClass, NgIf, RouterLink, RouterLinkActive, LogoutComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit{
isCollapsed = false;
  private readonly authService = inject(AuthService)
  token!:Token

@ViewChild(LogoutComponent) mylogoutModal!:LogoutComponent


open:boolean = false







  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  ngOnInit(): void {
    this.token = this.authService.decodeToken()
  }
}
