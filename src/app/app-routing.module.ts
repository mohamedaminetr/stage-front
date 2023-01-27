import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { DashboardEmployeeComponent } from './employee/dashboard-employee/dashboard-employee.component';
import { LoginComponent } from './login/login.component';
import { GererUserComponent } from './admin/gerer-user/gerer-user.component';
import { GererDemandeComponent } from './admin/gerer-demande/gerer-demande.component';
import { AuthguardGuard } from './admin/auth-guard/authguard.guard';

const routes: Routes = [
{path: '',component:LoginComponent},
{path:'dashboard-admin',component:DashboardAdminComponent,canActivate: [AuthguardGuard]},
{path:'dashboard-employee',component:DashboardEmployeeComponent,canActivate: [AuthguardGuard]},
{path:'gerer-user',component:GererUserComponent,canActivate: [AuthguardGuard]},
{path:'gerer-demande',component:GererDemandeComponent,canActivate: [AuthguardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
