import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ɵInternalFormsSharedModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from '../../../../Core/Services/Categories Service/categories.service';
import { Categories } from '../../../../Core/Interfaces/categories.interface';

@Component({
  selector: 'app-category-update-modal',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './category-update-modal.component.html',
  styleUrl: './category-update-modal.component.css',
})
export class CategoryUpdateModalComponent {

  @Input() getCategories!:()=>void
 categoryId!:string
 categoryNameValue!:string

  openModalCat: boolean = false;


   private readonly fb = inject(FormBuilder)
  private readonly toast = inject(ToastrService)
  private readonly categoriesService = inject(CategoriesService)

  updateCategoryForm!:FormGroup
  loading:boolean=false


   initForm():void{
    this.updateCategoryForm = this.fb.group({
      name:['',[Validators.required]]
    })
  }


   updateCategoryItem(categoryId:string):void{
    if (this.updateCategoryForm.valid) {
      this.loading=true
      this.categoriesService.updateCategory(categoryId,this.updateCategoryForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.toast.success('Category has been updated successfully')
          this.loading = false
          this.closeModal()
          this.getCategories()
        },
        error:()=>{
          this.loading=false
          this.closeModal()
        }
      })
    }
    else{
      this.updateCategoryForm.markAllAsTouched()
    }

  }

  ngOnInit(): void {
    this.initForm()
  }



  showModal(cat:Categories): void {
    this.categoryNameValue = cat.name
    this.categoryId = cat.id
    this.updateCategoryForm.patchValue({ name: this.categoryNameValue });
    this.openModalCat = true;
  }

    closeModal(): void {
    this.openModalCat = false;
    this.categoryNameValue = ""
    this.updateCategoryForm.reset();

  }

}
