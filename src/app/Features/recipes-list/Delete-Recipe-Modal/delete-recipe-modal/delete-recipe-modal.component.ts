import { Component, inject, Input } from '@angular/core';
import { DeleteConfirmComponent } from "../../../../Shared/Components/Delete-Confirmation/delete-confirm/delete-confirm.component";
import { Recipe } from '../../../../Core/Interfaces/recipe.interface';
import { ToastrService } from 'ngx-toastr';
import { RecipesService } from '../../../../Core/Services/Recipes Service/recipes.service';

@Component({
  selector: 'app-delete-recipe-modal',
  imports: [DeleteConfirmComponent],
  templateUrl: './delete-recipe-modal.component.html',
  styleUrl: './delete-recipe-modal.component.css',
})
export class DeleteRecipeModalComponent {

private readonly toastService = inject(ToastrService)
private readonly recipeService = inject(RecipesService)


open:boolean = false
loading:boolean = false
recipeId!:number
@Input() pageSize:number = 5
recipeName!:string
@Input() getRecipes!:(pageSize:number,pageNumber:number,recipeName:string,tagId:number,catId:number)=>void
@Input() p!:number
@Input() searchValue!:string
@Input() catId!:number
@Input() tagId!:number



showModal(recipe:Recipe):void{
  this.open = true
  this.recipeId = recipe.id
  this.recipeName = recipe.name
}

closeModal():void{
  this.open = false
}


deleteRecipe():void{
  this.loading = true
  this.recipeService.deleteRecipe(this.recipeId).subscribe({
    next:()=>{
      this.toastService.success('Recipe has been deleted successfully')
      this.loading = false
      this.closeModal()
      this.getRecipes(this.pageSize,this.p,this.searchValue,this.tagId,this.catId)
    },
    error:()=>{
      this.loading = false
      this.closeModal()
    }
  })
}
}
