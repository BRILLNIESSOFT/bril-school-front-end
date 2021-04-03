import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {WebcamModule} from 'ngx-webcam';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

//THIRD PARTIES ADDITIONAL MODULES
import { NgSelectModule } from '@ng-select/ng-select';
import {IvyCarouselModule} from 'angular-responsive-carousel';



//IMPORTING CALENDER FULL-CALENDER JS MODULES
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import timeGridPlugin from '@fullcalendar/timegrid';

 



//importing form to handel form reqs
import { ReactiveFormsModule } from '@angular/forms';
//ANGULAR MATERIALS
 import { MatDatepickerModule } from '@angular/material/datepicker';
 import { MatNativeDateModule } from '@angular/material/core';

//IMPORTING THE SERVICES
import { RegistrationService } from './brillyschoolservices/students/registration.service';
//IMPORTING ALL THE COMPONENT INCLUDING ROOT
import { AppComponent } from './app.component';
import { NavbarComponent } from './brillyschoolcomponents/global/navbar/navbar.component';
import { SidebarComponent } from './brillyschoolcomponents/global/sidebar/sidebar.component';
import { HeaderComponent } from './brillyschoolcomponents/global/header/header.component';
import { ContainerfluidComponent } from './brillyschoolcomponents/global/containerfluid/containerfluid.component';
import { FooterComponent } from './brillyschoolcomponents/global/footer/footer.component';
import { RegistrationComponent } from './brillyschoolcomponents/students/registration/registration.component';
import { from } from 'rxjs';
import { StaffsComponent } from './brillyschoolcomponents/staff/staffs/staffs.component';
import { ClassessComponent } from './brillyschoolcomponents/class/classess/classess.component';
import { StudentPaymentComponent } from './brillyschoolcomponents/payments/student-payment/student-payment.component';
import { CheckComponent } from './brillyschoolcomponents/timetables/check/check.component';
import { SubjectComponent } from './brillyschoolcomponents/subjects/subject/subject.component';
import { AttandanceComponent } from './brillyschoolcomponents/students/attandance/attandance.component';
import { DesignationsComponent } from './brillyschoolcomponents/designations/designations.component';
import { ClassroomsComponent } from './brillyschoolcomponents/classrooms/classrooms.component';
import { PaymentTypeComponent } from './brillyschoolcomponents/payments/payment-type/payment-type.component';
import { CategoriesComponent } from './brillyschoolcomponents/payments/categories/categories.component';
import { MasterComponent } from './brillyschoolcomponents/payments/master/master.component';
  

//REGISTER PLUGINS OF FULLCALENDER JS
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin , 
  ]);

//NG MODELS 
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    HeaderComponent,
    ContainerfluidComponent,
    FooterComponent,
    RegistrationComponent,
    StaffsComponent,
    ClassessComponent,
    StudentPaymentComponent,
    CheckComponent,
    SubjectComponent,
    AttandanceComponent,
    DesignationsComponent,
    ClassroomsComponent,
    PaymentTypeComponent,
    CategoriesComponent,
    MasterComponent
     ],
  imports: [
    NgSelectModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    WebcamModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    BrowserModule, 
    FullCalendarModule, // register FullCalendar plugins
    IvyCarouselModule
   ],
  providers: [RegistrationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
