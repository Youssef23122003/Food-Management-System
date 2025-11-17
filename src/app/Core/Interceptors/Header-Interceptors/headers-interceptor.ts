import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
   const cookiesService = inject(CookieService)

   if (cookiesService.check('Token')){
    req = req.clone({
      setHeaders:{Authorization:cookiesService.get('Token')}
    })
   }
  return next(req);
};
