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
import { DesignationsComponent } from './brillyschoolcomponents/designations/designations.component'
import { ClassroomsComponent } from './brillyschoolcomponents/classrooms/classrooms.component';
import { PaymentTypeComponent } from './brillyschoolcomponents/payments/payment-type/payment-type.component';
import { CategoriesComponent } from './brillyschoolcomponents/payments/categories/categories.component';
import { MasterComponent } from './brillyschoolcomponents/payments/master/master.component';
import { VehicleComponent } from './brillyschoolcomponents/transportation/vehicle/vehicle.component';
import { RouteComponent } from './brillyschoolcomponents/transportation/route/route.component';
import { AttendanceComponent } from './brillyschoolcomponents/transportation/attendance/attendance.component';
import { TypeComponent } from './brillyschoolcomponents/examination/type/type.component';
import { ExamComponent } from './brillyschoolcomponents/examination/exam/exam.component';



const routes: Routes = [
  {path : 'students/register', component: RegistrationComponent} ,
  {path : 'staff/staffs', component: StaffsComponent} ,
  {path : 'class/classess', component: ClassessComponent} ,
  {path : 'student/make-payment', component: StudentPaymentComponent} ,
  {path : 'timetable/check-time-table', component: CheckComponent} , 
  {path : 'subjects/subject', component: SubjectComponent} , 
  {path : 'students/attendance', component: AttandanceComponent} , 
  {path : 'school/designations', component: DesignationsComponent} , 
  {path : 'school/classrooms', component: ClassroomsComponent} , 
  {path : 'payment/payment-type', component: PaymentTypeComponent} , 
  {path : 'payment/categories', component: CategoriesComponent} , 
  {path : 'payment/master' , component: MasterComponent},
  {path : 'transportation/vehicle' , component: VehicleComponent},
  {path : 'transportation/routes' , component: RouteComponent},
  {path : 'transportation/attendance' , component: AttendanceComponent} , 
  {path : 'examination/type' , component: TypeComponent},
  {path : 'examination/exam' , component: ExamComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
