import { Component, inject} from '@angular/core';;
import { DeleteConfirmComponent } from '../Delete-Confirmation/delete-confirm/delete-confirm.component';
import { AuthService } from '../../../Core/Services/Auth Service/auth.service';

@Component({
  selector: 'app-logout',
  imports: [DeleteConfirmComponent],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent {

 private readonly authService = inject(AuthService)

open:boolean = false


  logOut():void{
    this.authService.logout()
  }

showModal():void{
  this.open = true

}

closeModal():void{
  this.open = false
}
}
