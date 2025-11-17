import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FavServiceService {
  private readonly httpClient = inject(HttpClient)


  addToFavourite(recipeId:number):Observable<any>{
    return this.httpClient.post(environment.baseUrl+`userRecipe/`,{recipeId})
  }

  deleteFromFavourite(recipeId:number):Observable<any>{
    return this.httpClient.delete(environment.baseUrl+`userRecipe/${recipeId}`)
  }

  getFavourites():Observable<any>{
    return this.httpClient.get(environment.baseUrl+`userRecipe/`)
  }
}
