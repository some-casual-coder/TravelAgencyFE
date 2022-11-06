import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import {HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import { RouterModule } from '@angular/router';
import { HostComponent } from './host/host.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserService } from 'services/user.service';
import { ViewUserComponent } from './view-user/view-user.component';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { HotelsComponent } from './hotels/hotels.component';
import { ViewHotelComponent } from './view-hotel/view-hotel.component';
import { ViewHotelRoomsComponent } from './view-hotel-rooms/view-hotel-rooms.component';
import { TransportTypeComponent } from './transport-type/transport-type.component';
import { MeansOfTransportComponent } from './means-of-transport/means-of-transport.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    HeaderComponent,
    UserComponent,
    LoginComponent,
    ForbiddenComponent,
    RegisterComponent,
    ConfirmRegistrationComponent,
    HostComponent,
    SuperAdminComponent,
    ViewUserComponent,
    AddHotelComponent,
    SidebarComponent,
    NotFoundComponent,
    ViewUsersComponent,
    HotelsComponent,
    ViewHotelComponent,
    ViewHotelRoomsComponent,
    TransportTypeComponent,
    MeansOfTransportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    GoogleMapsModule,
    RouterModule
  ],
  exports: [
    AddHotelComponent,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
