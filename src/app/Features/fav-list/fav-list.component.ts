import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../Shared/Components/header/header.component";
import { Recipe } from '../../Core/Interfaces/recipe.interface';
import { ToastrService } from 'ngx-toastr';
import { FavServiceService } from '../../Core/Services/Favourite Service/fav-service.service';
import { Router } from '@angular/router';
import { Fav } from './Interfaces/fav.interface';
import { environment } from '../../../environments/environment.development';
import { FavDeleteModalComponent } from "./Fav-Delete-Modal/fav-delete-modal/fav-delete-modal.component";
import { LoaderComponent } from "../../Shared/Components/loader/loader/loader.component";

@Component({
  selector: 'app-fav-list',
  imports: [HeaderComponent, FavDeleteModalComponent, LoaderComponent],
  templateUrl: './fav-list.component.html',
  styleUrl: './fav-list.component.css',
})
export class FavListComponent implements OnInit{
loading:boolean = false
favlist:Fav[] =[]
private readonly toastr = inject(ToastrService)
private readonly favService = inject(FavServiceService)
private readonly router = inject(Router)
pathImg:string = environment.imagPath

getAllFavs():void{
  this.loading = true
  this.favService.getFavourites().subscribe({
    next:(res)=>{
      console.log(res);
      this.favlist = res.data
      this.loading = false
    },
    error:()=>{
      this.loading = false
    }
  })
}

ngOnInit(): void {
this.getAllFavs()
}
}
