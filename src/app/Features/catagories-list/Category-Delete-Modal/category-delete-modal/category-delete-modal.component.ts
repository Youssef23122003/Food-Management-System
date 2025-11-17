import { Component, inject, Input } from '@angular/core';
import { DeleteConfirmComponent } from "../../../../Shared/Components/Delete-Confirmation/delete-confirm/delete-confirm.component";
import { Categories } from '../../../../Core/Interfaces/categories.interface';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from '../../../../Core/Services/Categories Service/categories.service';

@Component({
  selector: 'app-category-delete-modal',
  imports: [DeleteConfirmComponent],
  templateUrl: './category-delete-modal.component.html',
  styleUrl: './category-delete-modal.component.css',
})
export class CategoryDeleteModalComponent {
  @Input() getCategories!:(pageSize:number,pageNumber:number,name:string)=>void

open: boolean = false;
@Input() pageSize!:number
@Input() p!:number
@Input() catName!:string
catId!:string
loading:boolean = false
private readonly toast = inject(ToastrService)
private readonly catService = inject(CategoriesService)

closeModal():void{
  this.open= false
}

showModal(cat:Categories):void{
  this.catId = cat.id
  this.open = true
}

deletCategory():void{
this.loading = true
this.catService.deletSpecificCategory(this.catId).subscribe({
  next:(res)=>{
    console.log(res);
    this.loading = false
    this.toast.success('Category has been Delelted Successfully')
    this.closeModal()
    this.getCategories(this.pageSize,this.p,this.catName)
  },
  error:()=>{
    this.loading = false
  }
})

}
}
