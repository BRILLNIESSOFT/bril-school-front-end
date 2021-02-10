import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//IMPORTING ALL OF THE COMPONENTS HERE 
import { RegistrationComponent } from  './brillyschoolcomponents/students/registration/registration.component';
import { StaffsComponent } from  './brillyschoolcomponents/staff/staffs/staffs.component';

const routes: Routes = [
  {path : 'students/register', component: RegistrationComponent} ,
  {path : 'staff/staffs', component: StaffsComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
