import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/Auth Service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent implements OnInit{
  forgetPasswordForm!:FormGroup
  loading:boolean = false
  private readonly fb = inject(FormBuilder)
  private readonly router = inject(Router)
  private readonly authService = inject(AuthService)
  private readonly toastr = inject(ToastrService)



initForm():void{
    this.forgetPasswordForm= this.fb.group({
      email:[null,[Validators.required,Validators.email]]
 })
}


   submitForgetPassword():void{
    if (this.forgetPasswordForm.valid) {
      this.loading = true
      this.authService.userForgetPassword(this.forgetPasswordForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.router.navigate(['/reset-password'])
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
      this.forgetPasswordForm.markAllAsTouched()
    }
  }

ngOnInit(): void {
this.initForm()
}

}
