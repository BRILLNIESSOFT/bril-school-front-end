import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {WebcamModule} from 'ngx-webcam';

//IMPORTING ALL THE COMPONENT INCLUDING ROOT
import { AppComponent } from './app.component';
import { NavbarComponent } from './brillyschoolcomponents/global/navbar/navbar.component';
import { SidebarComponent } from './brillyschoolcomponents/global/sidebar/sidebar.component';
import { HeaderComponent } from './brillyschoolcomponents/global/header/header.component';
import { ContainerfluidComponent } from './brillyschoolcomponents/global/containerfluid/containerfluid.component';
import { FooterComponent } from './brillyschoolcomponents/global/footer/footer.component';
import { RegistrationComponent } from './brillyschoolcomponents/students/registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    HeaderComponent,
    ContainerfluidComponent,
    FooterComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    WebcamModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
