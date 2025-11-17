import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private readonly httpClient = inject(HttpClient)


  getAllCategories(pageSize:number=5,pageNumber:number=1,name:string=''):Observable<any>{
    return this.httpClient.get(environment.baseUrl+'Category/',{params:{pageSize,pageNumber,name}})
  }

  getSpecificCategory(catId:string):Observable<any>{
    return this.httpClient.get(environment.baseUrl+`Category/${catId}`)
  }

  addCategory(data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl+`Category/`,data)
  }

  updateCategory(catId:string,data:object):Observable<any>{
    return this.httpClient.put(environment.baseUrl+`Category/${catId}`,data)
  }

  deletSpecificCategory(catId:string):Observable<any>{
    return this.httpClient.delete(environment.baseUrl+`Category/${catId}`)
  }
}
