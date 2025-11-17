import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/Auth Service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verifiy-email',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './verifiy-email.component.html',
  styleUrl: './verifiy-email.component.css',
})
export class VerifiyEmailComponent implements OnInit{
   loading:boolean = false
  private readonly fb = inject(FormBuilder)
  private readonly router = inject(Router)
  private readonly authService = inject(AuthService)
  private readonly toastr = inject(ToastrService)

verifyForm!:FormGroup

 initForm():void{
    this.verifyForm = this.fb.group({

      email:[null,[Validators.required,Validators.email]],
      code:[null,[Validators.required,Validators.maxLength(4)]],

 })
  }


   submitVerifyAcc():void{
    if (this.verifyForm.valid) {
      this.loading = true
      this.authService.userVerifiyAccount(this.verifyForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.router.navigate(['/login'])
          this.toastr.success(res.message)
          this.loading = false
        },
        error:(err)=>{
          this.loading = false
        }
      })
    }
    else{

      this.verifyForm.markAllAsTouched()
    }
  }

  ngOnInit(): void {
    this.initForm()
  }

}
