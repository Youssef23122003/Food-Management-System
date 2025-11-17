import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../Services/Auth Service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent implements OnInit {

  private readonly fb = inject(FormBuilder)
  private readonly authService = inject(AuthService)
  private readonly toastrService = inject(ToastrService)
  private readonly router = inject(Router)

  changePasswordForm!:FormGroup

  initForm():void{
    this.changePasswordForm = this.fb.group({
      oldPassword : [null,[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'"\\|,.<>\/?`~]).{8,}$/)]],
      newPassword: [null,[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'"\\|,.<>\/?`~]).{8,}$/)]],
      confirmNewPassword:[null,[Validators.required]]
    },{validators:this.confirmNewPasswordValidation})

  }

loading:boolean = false
showPassword:boolean =false
showNewPassword:boolean =false
showConfirmNewPassword:boolean =false


submitChangePassword():void{
if (this.changePasswordForm.valid) {
this.loading = true
this.authService.userChangePassword(this.changePasswordForm.value).subscribe({
  next:(res)=>{
    console.log(res);
    this.loading = false
    this.router.navigate(['/dashboard'])
    this.toastrService.success('password changed successfully')
  },
  error:(err)=>{
    this.loading = false
  }
})
}
else{
  this.changePasswordForm.markAllAsTouched()
  this.loading = false
}
}


togglePassword():void{
  this.showPassword =  !this.showPassword
}

toggleNewPassword():void{
  this.showNewPassword =  !this.showNewPassword
}

toggleConfirmNewPassword():void{
  this.showConfirmNewPassword =  !this.showConfirmNewPassword
}

confirmNewPasswordValidation(group:AbstractControl){
if (group.get('newPassword')?.value==group.get('confirmNewPassword')?.value) {
  return null
}else{
  group.get('confirmNewPassword')?.setErrors({mismatch:true})
  return {mismatch:true}
}
}

ngOnInit(): void {
  this.initForm()
}
}
