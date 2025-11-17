import { Component } from '@angular/core';
import { User } from '../../Interfaces/user.interface';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-user-details-modal',
  imports: [],
  templateUrl: './user-details-modal.component.html',
  styleUrl: './user-details-modal.component.css',
})
export class UserDetailsModalComponent {
  user:User={} as User
  open:boolean = false
 imgPath:string = environment.imagPath
 
showModal(User:User):void{
  this.open = true
  this.user = User

}

closeModal():void{
  this.open = false
}
}
