import { DashboardPageComponent } from './admin/dashboard-page/dashboard-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authAdminGuard } from './core/guards/auth-admin.guard';
import { authDoctorGuard } from './core/guards/auth-doctor.guard';
import { authPatientGuard } from './core/guards/auth-patient.guard';

const routes: Routes = [

  {path:'',loadComponent:()=>import('./layouts/user-layout/user-layout.component').then((m)=>m.UserLayoutComponent),title:'User',children:[
    {path:'',loadComponent:()=>import('./layouts/admin-layout/admin-layout.component').then((m)=>m.AdminLayoutComponent),title:'Admin',children:[
      {path:'',canActivate:[authAdminGuard],loadComponent:()=>import('./admin/dashboard/dashboard.component').then((m)=>m.DashboardComponent),children:[
        {path:'',redirectTo:'dashboard',pathMatch:'full'},
        {path:'dashboard',loadComponent:()=>import('./admin/dashboard-page/dashboard-page.component').then((m)=>m.DashboardPageComponent),title:'Dashboard'},
        {path:'allDoctors',loadComponent:()=>import('./admin/all-doctors/all-doctors.component').then((m)=>m.AllDoctorsComponent),title:'All Doctors'},
        {path:'allPatients',loadComponent:()=>import('./admin/all-patients/all-patients.component').then((m)=>m.AllPatientsComponent),title:'All Patients'},
        {path:'addDoctors',loadComponent:()=>import('./admin/add-doctors/add-doctors.component').then((m)=>m.AddDoctorsComponent),title:'Add Doctor'},
        {path:'editDoctor/:id',loadComponent:()=>import('./admin/edit-doctor/edit-doctor.component').then((m)=>m.EditDoctorComponent),title:'Edit Doctor'},
        {path:'coupons',loadComponent:()=>import('./admin/coupons/coupons.component').then((m)=>m.CouponsComponent),title:'Coupons'},
        {path:'details/:id',loadComponent:()=>import('./admin/doctor-details/doctor-details.component').then((m)=>m.DoctorDetailsComponent),title:'Details'}
  
      ]},
      
    ]},
   
   
   {path:'',loadComponent:()=>import('./layouts/layoutsUserChilds/layout-blank/layout-blank.component').then((m)=>m.LayoutBlankComponent),children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',loadComponent:()=>import('./pages/home/home.component').then((m)=>m.HomeComponent),title:'Home'},
    {path:'specialties',loadComponent:()=>import('./pages/specialties/specialties.component').then((m)=>m.SpecialtiesComponent),title:'Specialties'},
    {path:'doctors',loadComponent:()=>import('./pages/doctors/doctors.component').then((m)=>m.DoctorsComponent),title:'Doctors'},
    {path:'doctorSpecialize/:id',loadComponent:()=>import('./pages/all-doctors-in-specialize/all-doctors-in-specialize.component').then((m)=>m.AllDoctorsInSpecializeComponent),title:'Doctors Specialize'},
    {path:'doctorProfile/:id',canActivate:[authDoctorGuard],loadComponent:()=>import('./pages/doctor-profile/doctor-profile.component').then((m)=>m.DoctorProfileComponent),title:'Profile'},
    {path:'patientProfile/:id',canActivate:[authPatientGuard],loadComponent:()=>import('./pages/patient-profile/patient-profile.component').then((m)=>m.PatientProfileComponent),title:'Profile'},
    {path:'booking',loadComponent:()=>import('./pages/patient-book/patient-book.component').then((m)=>m.PatientBookComponent),title:'Book'}
   ]},
   {path:'',loadComponent:()=>import('./layouts/layoutsUserChilds/layout-auth/layout-auth.component').then((m)=>m.LayoutAuthComponent),children:[
    {path:'login',loadComponent:()=>import('./pages/login/login.component').then((m)=>m.LoginComponent),title:'Login'},
    {path:'register',loadComponent:()=>import('./pages/register/register.component').then((m)=>m.RegisterComponent),title:'Register'},
   ]},
  ]},
  {path:'**',loadComponent:()=>import('./pages/not-found/not-found.component').then((m)=>m.NotFoundComponent),title:'Not Found'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
