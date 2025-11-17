import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private readonly httpClient = inject(HttpClient)

  getAllRecipes(pageSize:number=5,pageNumber:number=1,name:string='',tagId:number=0,categoryId:number=0):Observable<any>{
    return this.httpClient.get(environment.baseUrl+'Recipe/',{params:{pageSize,pageNumber,name,tagId,categoryId}})
  }

  getSpecificRecipe(id:number):Observable<any>{
    return this.httpClient.get(environment.baseUrl+`Recipe/${id}`)
  }

  addRecipe(data:FormData):Observable<any>{
    return this.httpClient.post(environment.baseUrl+'Recipe/',data)
  }

  updateRecipe(data:FormData,id:number):Observable<any>{
    return this.httpClient.put(environment.baseUrl+`Recipe/${id}`,data)
  }

  deleteRecipe(id:number):Observable<any>{
    return this.httpClient.delete(environment.baseUrl+`Recipe/${id}`)
  }
}
