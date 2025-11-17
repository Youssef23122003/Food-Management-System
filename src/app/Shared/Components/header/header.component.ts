import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
@Input({required:true}) title!:string
@Input({required:true}) image!:string
@Input({required:true}) describtion!:string
}
