import { NgClass, NgStyle } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Services/Auth Service/auth.service';
import {Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [NgClass,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
showPassword = false;
loading:boolean=false

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  private readonly fb = inject(FormBuilder)
  private readonly router = inject(Router)
  private readonly authService = inject(AuthService)
  private readonly toastr = inject(ToastrService)
  private readonly cookiesService = inject(CookieService)

  loginForm!:FormGroup

  initForm():void{
    this.loginForm = this.fb.group({
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'"\\|,.<>\/?`~]).{8,}$/)]]
    })
  }

  submitLogin():void{
    if (this.loginForm.valid) {
      this.loading=true
      this.authService.userLogin(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.loading = false
         this.cookiesService.set('Token',res.token);

          this.toastr.success('login success')
          this.router.navigate(['/dashboard'])
        },
        error:(err)=>{

          this.loading=false

        }
      })
    }
    else{
      this.loginForm.markAllAsTouched()
    }
  }

  ngOnInit(): void {
    this.initForm()
  }
}
