import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../Shared/Components/header/header.component";
import { LoaderComponent } from "../../Shared/Components/loader/loader/loader.component";
import { TagsService } from '../../Core/Services/Tags Service/tags.service';
import { RecipesService } from '../../Core/Services/Recipes Service/recipes.service';
import { CategoriesService } from '../../Core/Services/Categories Service/categories.service';
import { Recipe } from '../../Core/Interfaces/recipe.interface';
import { Categories } from '../../Core/Interfaces/categories.interface';
import { Tag } from '../../Core/Interfaces/tag.interface';
import { environment } from '../../../environments/environment.development';
import { NodataComponent } from "../../Shared/Components/Nodata/nodata/nodata.component";
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DeleteRecipeModalComponent } from "./Delete-Recipe-Modal/delete-recipe-modal/delete-recipe-modal.component";
import { RecipeDataComponent } from '../recipe-data/recipe-data.component';
import { Token } from '../../Core/Interfaces/token.interface';
import { AuthService } from '../../Core/Services/Auth Service/auth.service';
import { FavServiceService } from '../../Core/Services/Favourite Service/fav-service.service';
import { ToastrService } from 'ngx-toastr';
import { RecipeDetailsModalComponent } from "./Recipe-Details-Modal/recipe-details-modal/recipe-details-modal.component";

@Component({
  selector: 'app-recipes-list',
  imports: [HeaderComponent, LoaderComponent, NodataComponent, RouterLink, DeleteRecipeModalComponent, RecipeDetailsModalComponent],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.css',
})
export class RecipesListComponent implements OnInit{

@ViewChild (RecipeDataComponent) myDeleteModal!:RecipeDataComponent
@ViewChild (RecipeDetailsModalComponent) myRecipeDetailsModal!:RecipeDetailsModalComponent

  private readonly tagService = inject(TagsService)
  private readonly authService = inject(AuthService)
  private readonly recipesService = inject(RecipesService)
  private readonly catgoriesService = inject(CategoriesService)
  private readonly cookiesService = inject(CookieService)
  private readonly favService = inject(FavServiceService)
  private readonly toastService = inject(ToastrService)
  private readonly router = inject(Router)
  token!:Token

  recipesList:Recipe[] = []
  catgoriesList:Categories[] = []
  tagsList:Tag[] = []
  loading:boolean = false
  pathUrl:string = environment.imagPath
  pageSize:number = 5
  p:number = 1
  totalPages:number[]=[]
  nameValue:string =  ""
  catId:number = 0
  tagId:number = 0
  favLoading:boolean = false

getAllRecipesData(pageSize:number=5,pageNumber:number=1,name:string='',tagId:number=0,categoryId:number=0):void{
  this.loading = true
  this.recipesService.getAllRecipes(pageSize,pageNumber,name,tagId,categoryId).subscribe({
    next:(res)=>{
      console.log(res.data);
      this.recipesList = res.data
      this.pageSize = res.pageSize
      this.p = res.pageNumber
      this.totalPages = Array.from(
     { length: res?.totalNumberOfPages || 0 },
     (_, i) => i + 1
     );
      this.loading = false
    },
    error:()=>{
      this.loading = false
    }
  })
}

navigateToEdit(recipe: Recipe): void {
this.cookiesService.set('recipe',JSON.stringify(recipe))

  }

  removeRecipeCookie(){
    this.cookiesService.delete('recipe')
  }

getAllCategoriesData():void{
  this.catgoriesService.getAllCategories().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.catgoriesList = res.data
    },
  })
}

addToFav(recipe:Recipe):void{
this.favLoading = true
this.favService.addToFavourite(recipe.id).subscribe({
  next:(res)=>{
    console.log(res);
    this.toastService.success('these recipe has been added to favlist')
    this.favLoading = false
    this.router.navigate(['/fav-list'])
  },
  error:()=>{
    this.favLoading = false
  }
})
}

getAllTagsData():void{
  this.tagService.getAllTags().subscribe({
    next:(res)=>{
      console.log(res);
      this.tagsList = res
    },
  })
}


changePage(pageNumber: number): void {
  if (pageNumber < 1 || pageNumber > this.totalPages.length) return;
  this.p = pageNumber;
  this.getAllRecipesData(this.pageSize, this.p,this.nameValue,this.tagId,this.catId);
}

visiblePages(): number[] {
  const maxVisible = 5;
  const total = this.totalPages.length;

  if (total <= maxVisible) return this.totalPages;

  let start = Math.max(1, this.p - Math.floor(maxVisible / 2));
  let end = Math.min(total, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);

  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);

  return pages;
}



changeNameValue(event:Event):void{
  this.nameValue = (event.target as HTMLInputElement).value.trim()
  if(this.nameValue){
     this.getAllRecipesData(this.pageSize,1,this.nameValue,this.tagId,this.catId)
  }
  else{
     this.getAllRecipesData(this.pageSize,1,this.nameValue,this.tagId,this.catId)
  }
}

changeTagValue(event:Event):void{
  const selectedValue = (event.target as HTMLSelectElement).value

  this.tagId = selectedValue?Number(selectedValue) : 0

  if(this.tagId){
     this.getAllRecipesData(this.pageSize,1,this.nameValue,this.tagId,this.catId)
  }
  else{
     this.getAllRecipesData(this.pageSize,1,this.nameValue,this.tagId,this.catId)
  }
}

changeCatValue(event:Event):void{
  const selectedValue = (event.target as HTMLSelectElement).value

  this.catId = selectedValue?Number(selectedValue) : 0

  if(this.catId){
     this.getAllRecipesData(this.pageSize,1,this.nameValue,this.tagId,this.catId)
  }
  else{
     this.getAllRecipesData(this.pageSize,1,this.nameValue,this.tagId,this.catId)
  }
}

  ngOnInit(): void {
    this.token = this.authService.decodeToken()
    this.getAllRecipesData(this.pageSize,this.p,this.nameValue,this.tagId,this.catId)
    this.getAllCategoriesData()
    this.getAllTagsData()
  }

}
