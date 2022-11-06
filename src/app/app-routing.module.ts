import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { HostComponent } from './host/host.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { UserComponent } from './user/user.component';
import { ViewUsersComponent } from './view-users/view-users.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'admin', component:AdminComponent, canActivate:[AuthGuard], data:{roles:['ROLE_ADMIN','ROLE_SUPER_ADMIN']} },
  {path:'superadmin', component:SuperAdminComponent, canActivate:[AuthGuard], data:{roles:['ROLE_SUPER_ADMIN']}},
  {path:'host', component:HostComponent, canActivate:[AuthGuard], data:{roles:['ROLE_HOST']}},
  {path:'user', component:UserComponent, canActivate:[AuthGuard], data:{roles:['ROLE_USER']}},
  {path:'login', component:LoginComponent},
  {path:'hotel/add', component:AddHotelComponent, canActivate:[AuthGuard], data:{roles:['ROLE_HOST', 'ROLE_ADMIN', 'ROLE_SUPER_ADMIN']}},
  {path:'register', component:RegisterComponent},
  {path:'user/verifyUser', component:ConfirmRegistrationComponent},
  {path:'admin/users', component:ViewUsersComponent, canActivate:[AuthGuard], data:{roles:['ROLE_ADMIN','ROLE_SUPER_ADMIN']}},
  {path:'forbidden', component:ForbiddenComponent},
  {path: '', redirectTo:'/home', pathMatch:'full'},
  {path: '**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
