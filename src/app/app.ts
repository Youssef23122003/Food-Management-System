import { NgIf } from '@angular/common';
import { Component, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogoutComponent } from "./Shared/Components/logout/logout.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Food-Application');

}
