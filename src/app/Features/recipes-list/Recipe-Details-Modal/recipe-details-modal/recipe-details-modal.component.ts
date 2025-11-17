import { Component } from '@angular/core';
import { Recipe } from '../../../../Core/Interfaces/recipe.interface';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-recipe-details-modal',
  imports: [],
  templateUrl: './recipe-details-modal.component.html',
  styleUrl: './recipe-details-modal.component.css',
})
export class RecipeDetailsModalComponent {
 recipe:Recipe={} as Recipe
  open:boolean = false
 imgPath:string = environment.imagPath

showModal(Recipe:Recipe):void{
  this.open = true
  this.recipe = Recipe

}

closeModal():void{
  this.open = false
}
}
