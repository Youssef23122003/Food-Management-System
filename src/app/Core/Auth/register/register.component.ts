import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../Services/Auth Service/auth.service';

@Component({
  selector: 'app-register',
  imports: [NgClass,  ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit{
  showPassword = false;
  showConfirmPassword = false;
  loading:boolean = false
  private readonly fb = inject(FormBuilder)
  private readonly router = inject(Router)
  private readonly authService = inject(AuthService)
  private readonly toastr = inject(ToastrService)


  registerForm!:FormGroup

  initForm():void{
    this.registerForm = this.fb.group({
      userName:[null,[Validators.required]],
      email:[null,[Validators.required,Validators.email]],
      country:[null,[Validators.required]],
      phoneNumber:[null,[Validators.required,Validators.pattern(/^(?:\+20|0020|0)?1[0-2|5]\d{8}$/)]],
      password:[null,[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'"\\|,.<>\/?`~]).{8,}$/)]],
      confirmPassword:[null,[Validators.required]]
    },{validators:this.confirmPasssword})
  }

  submitRegister():void{
    if (this.registerForm.valid) {
      this.loading = true
      this.authService.userRegister(this.registerForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.router.navigate(['/verify-account'])
          this.toastr.success(res.message)
          this.loading = false
        },
        error:(err)=>{
          this.loading = false
        }
      })
    }
    else{
      // this.registerForm.setErrors({mismatch:true})
      this.registerForm.markAllAsTouched()
    }
  }


  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  confirmPasssword(group:AbstractControl){
    if(group.get('password')?.value===group.get('confirmPassword')?.value){
      return null
    }
    else{
      group.get('confirmPassword')?.setErrors({mismatch:true})
      return {mismatch:true}
    }
  }

  ngOnInit(): void {
    this.initForm()
  }
}
