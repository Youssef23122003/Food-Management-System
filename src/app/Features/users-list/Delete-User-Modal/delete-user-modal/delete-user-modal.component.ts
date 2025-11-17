import { Component, inject, Input, ViewChild } from '@angular/core';
import { User } from '../../Interfaces/user.interface';
import { DeleteConfirmComponent } from "../../../../Shared/Components/Delete-Confirmation/delete-confirm/delete-confirm.component";
import { UsersService } from '../../Services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-user-modal',
  imports: [DeleteConfirmComponent],
  templateUrl: './delete-user-modal.component.html',
  styleUrl: './delete-user-modal.component.css',
})
export class DeleteUserModalComponent {
@Input() getUsers!:(pageSize:number,pageNumber:number,userName:string,email:string,country:string,groups: number[])=>void
userId!:number
open:boolean = false
loading:boolean = false
@Input() userName!:string
@Input() email!:string
@Input() country!:string
@Input() pageSize:number = 5
@Input() p!:number
@Input() groups: number[] = []
@Input() totalResults!:number
@Input() totalPages:number[]=[]

private readonly usersService = inject(UsersService)
private readonly toastService = inject(ToastrService)

showModal(user:User):void{
  this.open = true
  this.userId = user.id
}

closeModal():void{
  this.open = false
}

deleteSpecificUser():void{
  this.loading = true
  this.usersService.deleteUser(this.userId).subscribe({
    next:(res)=>{
      console.log(res);
      this.toastService.success('User has been deleted successfully')
      this.loading = false
      this.closeModal()
      this.getUsers(this.pageSize,this.p,this.userName,this.email,this.country,this.groups)
    },
    error:(err)=>{
      this.loading = false
      this.closeModal()
    }
  })

}

}
