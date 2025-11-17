import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {provideAnimations} from "@angular/platform-browser/animations"
import {CookieService} from 'ngx-cookie-service';
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor } from './Core/Interceptors/Errors-Interceptors/error-interceptor';
import { headersInterceptor } from './Core/Interceptors/Header-Interceptors/headers-interceptor';
import { NgApexchartsModule } from 'ng-apexcharts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(),withInterceptors([errorInterceptor,headersInterceptor])),
    provideAnimations(),
   importProvidersFrom(CookieService,NgApexchartsModule),
    provideToastr(),
  ]
};
