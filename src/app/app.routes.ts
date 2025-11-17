import { Routes } from '@angular/router';
import { RegisterComponent } from './Core/Auth/register/register.component';
import { LoginComponent } from './Core/Auth/login/login.component';
import { ForgotPasswordComponent } from './Core/Auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './Core/Auth/reset-password/reset-password.component';
import { ChangePasswordComponent } from './Core/Auth/change-password/change-password.component';
import { VerifiyEmailComponent } from './Core/Auth/verifiy-email/verifiy-email.component';
import { AuthLayoutComponent } from './Core/Layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './Core/Layouts/blank-layout/blank-layout.component';
import { DashboardComponent } from './Features/dashboard/dashboard.component';
import { RecipesListComponent } from './Features/recipes-list/recipes-list.component';
import { RecipeDataComponent } from './Features/recipe-data/recipe-data.component';
import { CatagoriesListComponent } from './Features/catagories-list/catagories-list.component';
import { UsersListComponent } from './Features/users-list/users-list.component';
import { FavListComponent } from './Features/fav-list/fav-list.component';
import { ProfileComponent } from './Features/profile/profile.component';
import { NotfoundComponent } from './Shared/notfound/notfound.component';
import { authGuard } from './Core/Guards/auth-guard';
import { isloogedGuard } from './Core/Guards/islooged-guard';




export const routes: Routes = [
  {path:'',redirectTo:'dashboard',pathMatch:'full'},
  {path:'',component:AuthLayoutComponent,children:[
    {path:'register',canActivate:[isloogedGuard],component:RegisterComponent,title:'Register'},
    {path:'login',canActivate:[isloogedGuard],component:LoginComponent,title:'Login'},
    {path:'forget-password',canActivate:[isloogedGuard],component:ForgotPasswordComponent,title:'Forget-Password'},
    {path:'reset-password',canActivate:[isloogedGuard],component:ResetPasswordComponent,title:'Reset-Password'},
    {path:'change-password',component:ChangePasswordComponent,title:'Change-Password'},
    {path:'verify-account',canActivate:[isloogedGuard],component:VerifiyEmailComponent,title:'Verify-Account'},

  ]},
  {path:'',component:BlankLayoutComponent,canActivate:[authGuard],children:[
    {path:'dashboard',component:DashboardComponent,title:'Dashboard Page'},
    {path:'recipes-list',component:RecipesListComponent,title:'Recipes Page'},
    {path:'recipes-data',component:RecipeDataComponent,title:'Recipe-Data Page'},
    {path:'categories-list',component:CatagoriesListComponent,title:'Categories Page'},
    {path:'users-list',component:UsersListComponent,title:'Users Page'},
    {path:'fav-list',component:FavListComponent,title:'Favourites Page'},
    {path:'profile',component:ProfileComponent,title:'Profile Page'},
  ]},
  {path:'**',component:NotfoundComponent}
];
