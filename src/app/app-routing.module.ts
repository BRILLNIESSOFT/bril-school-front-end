import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//IMPORTING ALL OF THE COMPONENTS HERE 
import { RegistrationComponent } from  './brillyschoolcomponents/students/registration/registration.component';
import { StaffsComponent } from  './brillyschoolcomponents/staff/staffs/staffs.component';
import {ClassessComponent } from './brillyschoolcomponents/class/classess/classess.component';
import {StudentPaymentComponent } from './brillyschoolcomponents/payments/student-payment/student-payment.component';
import {CheckComponent } from './brillyschoolcomponents/timetables/check/check.component';
import {SubjectComponent } from './brillyschoolcomponents/subjects/subject/subject.component';
import {AttandanceComponent} from './brillyschoolcomponents/students/attandance/attandance.component';

const routes: Routes = [
  {path : 'students/register', component: RegistrationComponent} ,
  {path : 'staff/staffs', component: StaffsComponent} ,
  {path : 'class/classess', component: ClassessComponent} ,
  {path : 'student/make-payment', component: StudentPaymentComponent} ,
  {path : 'timetable/check-time-table', component: CheckComponent} , 
  {path : 'subjects/subject', component: SubjectComponent} , 
  {path : 'students/attendance', component: AttandanceComponent} , 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
