import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/Auth Service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit{
  showPassword = false;
  showConfirmPassword = false;
  loading:boolean = false
  private readonly fb = inject(FormBuilder)
  private readonly router = inject(Router)
  private readonly authService = inject(AuthService)
  private readonly toastr = inject(ToastrService)
  resetPasswordForm!:FormGroup

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

initForm():void{
  this.resetPasswordForm = this.fb.group({
    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'"\\|,.<>\/?`~]).{8,}$/)]],
    confirmPassword:[null,[Validators.required]],
    seed:[null,[Validators.required,Validators.maxLength(4)]]
  },{validators:this.confirmPasssword})
}

submitResetPassword():void{
  if (this.resetPasswordForm.valid) {
    this.loading = true
    this.authService.userResetPassword(this.resetPasswordForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.toastr.success(res.message)
        this.router.navigate(['/login'])
        this.loading = false
      },
      error:(err)=>{
        this.loading = false
      }
    })
  }
  else{
    // this.resetPasswordForm.setErrors({mismatch:true})
    this.resetPasswordForm.markAllAsTouched()
  }
}




confirmPasssword(group:AbstractControl){
if (group.get('password')?.value===group.get('confirmPassword')?.value) {
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
