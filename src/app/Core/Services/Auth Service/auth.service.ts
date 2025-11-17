import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Token } from '../../Interfaces/token.interface';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly httpClient = inject(HttpClient)
  private readonly cookeisService = inject(CookieService)
  private readonly router = inject(Router)
  token:Token = {} as Token



  userLogin(data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl+'Users/Login',data)
  }
  userRegister(data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl+'Users/Register',data)
  }
  userVerifiyAccount(data:object):Observable<any>{
    return this.httpClient.put(environment.baseUrl+'Users/verify',data)
  }
  userForgetPassword(data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl+'Users/Reset/Request',data)
  }
  userResetPassword(data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl+'Users/Reset',data)
  }
  userChangePassword(data:object):Observable<any>{
    return this.httpClient.put(environment.baseUrl+'Users/ChangePassword',data)
  }

    logout():void{
    this.cookeisService.delete('Token')
    this.router.navigate(['/login'])
  }

  decodeToken(){

      this.token = jwtDecode(this.cookeisService.get('Token'))


    return this.token
  }
}
