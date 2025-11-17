import { Component, inject, Input, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesService } from '../../../../Core/Services/Categories Service/categories.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-modal',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.css'], // ✅ الجمع هنا مهم
})
export class CategoryModalComponent implements OnInit{
  openModalCat: boolean = false;
   @Input() getCategories!: () => void;

  private readonly fb = inject(FormBuilder)
  private readonly toast = inject(ToastrService)
  private readonly categoriesService = inject(CategoriesService)

  addCategoryForm!:FormGroup
  loading:boolean=false

  showModal(): void {
    this.openModalCat = true;
  }

  initForm():void{
    this.addCategoryForm = this.fb.group({
      name:[null,[Validators.required]]
    })
  }

  closeModal(): void {
    this.openModalCat = false;
  }

  addCategoryItem():void{
    if (this.addCategoryForm.valid) {
      this.loading=true
      this.categoriesService.addCategory(this.addCategoryForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.toast.success('Category has been added successfully')
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
      this.addCategoryForm.markAllAsTouched()
    }

  }

  ngOnInit(): void {
    this.initForm()
  }
}
