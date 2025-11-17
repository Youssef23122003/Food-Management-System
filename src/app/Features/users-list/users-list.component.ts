import { Component,inject, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../Shared/Components/header/header.component";
import { UsersService } from './Services/users.service';
import { User } from './Interfaces/user.interface';
import { environment } from '../../../environments/environment.development';
import { LoaderComponent } from "../../Shared/Components/loader/loader/loader.component";
import { DeleteUserModalComponent } from "./Delete-User-Modal/delete-user-modal/delete-user-modal.component";

import { NodataComponent } from "../../Shared/Components/Nodata/nodata/nodata.component";
import { UserDetailsModalComponent } from "./User-Details-Modal/user-details-modal/user-details-modal.component";

@Component({
  selector: 'app-users-list',
  imports: [HeaderComponent, LoaderComponent, DeleteUserModalComponent, NodataComponent, UserDetailsModalComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})

export class UsersListComponent implements OnInit{
loading:boolean = false
private readonly usersService = inject(UsersService)
@ViewChild(DeleteUserModalComponent) meDeleteModal!:DeleteUserModalComponent
@ViewChild(UserDetailsModalComponent) myDetailsModal!:UserDetailsModalComponent
usersList:User[]=[]
userName:string=''
email:string=''
country:string=''
pageSize:number = 5
p:number = 1
groups: number[] = []
totalResults!:number
totalPages:number[]=[]
pathUrl:string = environment.imagPath

getAllusers(pageSize:number=5,pageNumber:number=1,userName:string='',email:string='',country:string='',groups: number[] = []):void{
  this.loading = true
  this.usersService.getAllLoggedUsers(pageSize,pageNumber,userName,email,country,groups).subscribe({
    next:(res)=>{
      console.log(res);
      this.usersList = res.data
      this.pageSize = res.pageSize
      this.p = res.pageNumber
      this.totalResults = res.totalNumberOfRecords
     this.totalPages = Array.from(
  { length: res?.totalNumberOfPages || 0 },
  (_, i) => i + 1
);

      this.loading = false
    },
    error:(err)=>{
      this.loading = false
    }
  })
}





changePage(pageNumber: number): void {
  if (pageNumber < 1 || pageNumber > this.totalPages.length) return;
  this.p = pageNumber;
  this.getAllusers(this.pageSize, this.p,this.userName,this.email,this.country,this.groups);
}

changeUserNameValue(event:Event){
this.userName = (event.target as HTMLInputElement).value.trim();
console.log(this.userName);
if(this.userName){
 this.getAllusers(this.pageSize,1,this.userName,this.email,this.country,this.groups)
}
else{
this.getAllusers(5,1,this.userName,this.email,this.country,this.groups)
}
}

changeUserCountryValue(event:Event){
this.country = (event.target as HTMLInputElement).value.trim();
console.log(this.country);
if(this.country){
 this.getAllusers(this.pageSize,1,this.userName,this.email,this.country,this.groups)
}
else{
this.getAllusers(5,1,this.userName,this.email,this.country,this.groups)
}
}




changeUserEmailValue(event:Event){
this.email = (event.target as HTMLInputElement).value.trim();
console.log(this.email);
if(this.email){
 this.getAllusers(this.pageSize,1,this.userName,this.email,this.country,this.groups)
}
else{
this.getAllusers(5,1,this.userName,this.email,this.country,this.groups)
}
}

onFilterByRole(event: Event): void {
  const selectedValue = (event.target as HTMLSelectElement).value;
   this.groups = selectedValue ? [Number(selectedValue)] : [];

if(this.groups){
 this.getAllusers(this.pageSize,1,this.userName,this.email,this.country,this.groups)
}
else{
this.getAllusers(5,1,this.userName,this.email,this.country,this.groups)
}


}

visiblePages(): number[] {
  const maxVisible = 5;
  const total = this.totalPages.length;

  if (total <= maxVisible) return this.totalPages;

  let start = Math.max(1, this.p - Math.floor(maxVisible / 2));
  let end = Math.min(total, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);

  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);

  return pages;
}


ngOnInit(): void {
  this.getAllusers(this.pageSize,this.p,this.userName,this.email,this.country,this.groups)

}
}


