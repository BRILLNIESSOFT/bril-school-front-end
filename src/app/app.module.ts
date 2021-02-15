import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {WebcamModule} from 'ngx-webcam';
import { HttpClientModule } from '@angular/common/http';

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
    CheckComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    WebcamModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
   ],
  providers: [RegistrationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
