import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly httpClient = inject(HttpClient)

  getAllLoggedUsers(pageSize:number=5,pageNumber:number=1,userName:string='',email:string='',country:string='',groups: number[] = []):Observable<any>{
    return this.httpClient.get(environment.baseUrl+'Users/',{params:{pageSize,pageNumber,userName,email,country,groups}})
  }

  deleteUser(id:number):Observable<any>{
    return this.httpClient.delete(environment.baseUrl+`Users/${id}`)
  }
}
