import { Component, inject, ViewChild } from '@angular/core';
import { DeleteConfirmComponent } from "../../../../Shared/Components/Delete-Confirmation/delete-confirm/delete-confirm.component";
import { Fav } from '../../Interfaces/fav.interface';
import { ToastrService } from 'ngx-toastr';
import { FavServiceService } from '../../../../Core/Services/Favourite Service/fav-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fav-delete-modal',
  imports: [DeleteConfirmComponent],
  templateUrl: './fav-delete-modal.component.html',
  styleUrl: './fav-delete-modal.component.css',
})
export class FavDeleteModalComponent {
  @ViewChild(FavDeleteModalComponent) myDeleteModal!:FavDeleteModalComponent
private readonly favService = inject(FavServiceService)
private readonly toastService = inject(ToastrService)
private readonly router = inject(Router)

open:boolean = false
deleteLoading:boolean = false
favId!:number
favRecipeName!:string

showModal(fav:Fav):void{
  this.open = true
  this.favId = fav.id
  this.favRecipeName = fav.recipe.name
}

closeModal():void{
  this.open = false
}

deleteFav():void{
this.deleteLoading = true
this.favService.deleteFromFavourite(this.favId).subscribe({
  next:()=>{
    this.toastService.success('this recipe has been deleted from Your favs successfully')
    this.deleteLoading = false
    this.closeModal()
    this.router.navigate(['/recipes-list'])
  },
  error:()=>{
    this.deleteLoading = false
    this.closeModal()
  }
})
}

}
