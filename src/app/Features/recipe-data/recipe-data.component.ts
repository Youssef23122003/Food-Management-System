import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from '../../Core/Services/Categories Service/categories.service';
import { TagsService } from '../../Core/Services/Tags Service/tags.service';
import { Categories } from '../../Core/Interfaces/categories.interface';
import { Tag } from '../../Core/Interfaces/tag.interface';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RecipesService } from '../../Core/Services/Recipes Service/recipes.service';
import { Router } from '@angular/router';
import { Recipe } from '../../Core/Interfaces/recipe.interface';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-recipe-data',
  imports: [ReactiveFormsModule],
  templateUrl: './recipe-data.component.html',
  styleUrl: './recipe-data.component.css',
})
export class RecipeDataComponent implements OnInit{
private readonly toastService = inject(ToastrService)
private readonly catService = inject(CategoriesService)
private readonly recipeService = inject(RecipesService)
private readonly tagsService = inject(TagsService)
private readonly cookiesService = inject(CookieService)
private readonly fb = inject(FormBuilder)
private readonly router = inject(Router)

 catgoriesList:Categories[] = []
 recipe!:Recipe;
 tagsList:Tag[] = []
 reciepForm!:FormGroup
 loading:boolean = false
 imagePreview: string | ArrayBuffer | null = null;



 initForm():void{
  this.reciepForm = this.fb.group({
    name:[null,[Validators.required]],
    description :[null,[Validators.required]],
    price:[null,[Validators.required]],
    tagId:[null,[Validators.required]],
    recipeImage:[null],
    categoriesIds:[null,[Validators.required]]
  })
 }




 getAllCategoriesData():void{
  this.catService.getAllCategories().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.catgoriesList = res.data
    },
  })
}

getAllTagsData():void{
  this.tagsService.getAllTags().subscribe({
    next:(res)=>{
      console.log(res);
      this.tagsList = res
    },
  })
}

// submitAddRecipe():void{
//   if (this.reciepForm.valid) {
//     this.loading = true
//     this.recipeService.addRecipe(this.reciepForm.value).subscribe({
//       next:(res)=>{
//         console.log(res);
//         this.toastService.success('SUCESS')
//         this.loading=false
//         this.router.navigate(['/recipes-list'])
//       },
//       error:(err)=>{
//         this.loading = false
//       }
//     })
//   }
//   else{
//     this.reciepForm.markAllAsTouched()
//   }
// }
submitAddRecipe(): void {
  if (this.reciepForm.valid) {
    this.loading = true;

    const formData = new FormData();

    // نضيف باقي الحقول
    formData.append('name', this.reciepForm.get('name')?.value);
    formData.append('description', this.reciepForm.get('description')?.value);
    formData.append('price', this.reciepForm.get('price')?.value);
    formData.append('tagId', this.reciepForm.get('tagId')?.value);
    formData.append('categoriesIds', this.reciepForm.get('categoriesIds')?.value);

    // الحقل اللي فيه الصورة
    const file = this.reciepForm.get('recipeImage')?.value;
    if (file) {
      formData.append('recipeImage', file);
    }

    this.recipeService.addRecipe(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.toastService.success('Recipe added successfully!');
        this.loading = false;
        this.router.navigate(['/recipes-list']);
      },
      error: (err) => {
        console.error(err);
        this.toastService.error('Something went wrong');
        this.loading = false;
      },
    });
  } else {
    this.reciepForm.markAllAsTouched();
  }
}

submitUpdateRecipe(): void {
  if (this.reciepForm.valid) {
    this.loading = true;
    const formData = new FormData();

    // نضيف باقي الحقول
    formData.append('name', this.reciepForm.get('name')?.value);
    formData.append('description', this.reciepForm.get('description')?.value);
    formData.append('price', this.reciepForm.get('price')?.value);
    formData.append('tagId', this.reciepForm.get('tagId')?.value);
    formData.append('categoriesIds', this.reciepForm.get('categoriesIds')?.value);

    // الحقل اللي فيه الصورة
    const file = this.reciepForm.get('recipeImage')?.value;
    if (file) {
      formData.append('recipeImage', file);
    }

    this.recipeService.updateRecipe(formData,this.recipe.id).subscribe({
      next: (res) => {
        console.log(res);
        this.toastService.success('Recipe updated successfully!');
        this.loading = false;
        this.router.navigate(['/recipes-list']);
      },
      error: (err) => {
        this.loading = false;
      },
    });
  } else {
    this.reciepForm.markAllAsTouched();
  }
}

onFileSelected(event: any): void {
  const file = event.target.files[0];
  if (file) {
    this.reciepForm.patchValue({ recipeImage: file });
    this.reciepForm.get('recipeImage')?.updateValueAndValidity();
  }
}





ngOnInit(): void {
  this.initForm()
  this.getAllCategoriesData()
  this.getAllTagsData()

  if (this.cookiesService.check('recipe')) {
    const rec = this.cookiesService.get('recipe')
    this.recipe = JSON.parse(rec)
    console.log(this.recipe);
    this.reciepForm.patchValue(
      {name:this.recipe.name,
        categoriesIds:this.recipe.category[0]?.id,
        tagId:this.recipe.tag.id,
        price:this.recipe.price,
        description:this.recipe.description}
    )

  }



}

}
