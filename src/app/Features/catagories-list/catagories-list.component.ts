import { Component, inject, OnInit, ViewChild, viewChild} from '@angular/core';
import { HeaderComponent } from "../../Shared/Components/header/header.component";
import { CategoriesService } from '../../Core/Services/Categories Service/categories.service';
import { Categories } from '../../Core/Interfaces/categories.interface';
import { DatePipe } from '@angular/common';
import { LoaderComponent } from "../../Shared/Components/loader/loader/loader.component";
import { CategoryModalComponent } from './Category-Modal/category-modal/category-modal.component';
import { CategoryUpdateModalComponent } from "./Category-Update-Modal/category-update-modal/category-update-modal.component";
import { CategoryDeleteModalComponent } from './Category-Delete-Modal/category-delete-modal/category-delete-modal.component';
import { NodataComponent } from "../../Shared/Components/Nodata/nodata/nodata.component";

@Component({
  selector: 'app-catagories-list',
  imports: [HeaderComponent, DatePipe, LoaderComponent, CategoryModalComponent, CategoryUpdateModalComponent, CategoryDeleteModalComponent, NodataComponent],
  templateUrl: './catagories-list.component.html',
  styleUrl: './catagories-list.component.css',
})
export class CatagoriesListComponent implements OnInit{
private readonly categoriesService = inject(CategoriesService)
categoriesList:Categories[] = []
loading:boolean = false
pageSize:number = 5
p:number = 1
totalPages:number[]=[]
catName:string=''
@ViewChild(CategoryModalComponent) myModal!:CategoryModalComponent
@ViewChild(CategoryUpdateModalComponent) myUpdtateModal!:CategoryUpdateModalComponent
@ViewChild(CategoryDeleteModalComponent) myDeleteModal!:CategoryDeleteModalComponent

getAllCategoriesData(pageSize:number=5,pageNumbr:number=1,name:string=''):void{
  this.loading = true
  this.categoriesService.getAllCategories(pageSize,pageNumbr,name).subscribe({
    next:(res)=>{
      console.log(res);
      this.categoriesList = res.data
       this.pageSize = res.pageSize
      this.p = res.pageNumber
     this.totalPages = Array.from(
  { length: res?.totalNumberOfPages || 0 },
  (_, i) => i + 1
);
      this.loading = false
    },
    error:(err)=>{
       this.loading=false
    }
  })
}

changePage(pageNumber: number): void {
  if (pageNumber < 1 || pageNumber > this.totalPages.length) return;
  this.p = pageNumber;
  this.getAllCategoriesData(this.pageSize, this.p,this.catName);
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

changeCatNameValue(event:Event){
this.catName = (event.target as HTMLInputElement).value.trim();

if(this.catName){
 this.getAllCategoriesData(this.pageSize,1,this.catName)
}
else{
this.getAllCategoriesData(this.pageSize,1,this.catName)
}
}


 openAddModal(): void {
    this.myModal.showModal(); // ✅ اسم الدالة لازم يكون مطابق بالضبط
  }
ngOnInit(): void {
this.getAllCategoriesData(this.pageSize,this.p,this.catName)
}
}
