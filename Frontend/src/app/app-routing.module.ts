import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Authentication/SecurityLogic/auth.guard';

import { HomeComponent } from './Authentication/home/home.component';
import { StudentsComponent } from './StudentsComponents/students/students.component';
import { LoginComponent } from './Authentication/login/login.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { AddStudentComponent } from './StudentsComponents/add-student/add-student.component';
import { UpdateStudentComponent } from './StudentsComponents/update-student/update-student.component';
import { FacultiesComponent } from './FacultiesComponents/faculties/faculties.component';
import { AddFacultyComponent } from './FacultiesComponents/add-faculty/add-faculty.component';
import { UpdateFacultyComponent } from './FacultiesComponents/update-faculty/update-faculty.component';
import { CoursesComponent } from './CourseComponents/courses/courses.component';
import { AddCourseComponent } from './CourseComponents/add-course/add-course.component';
import { UpdateCourseComponent } from './CourseComponents/update-course/update-course.component';
import { GradesComponent } from './GradesComponents/grades/grades.component';
import { AddGradesComponent } from './GradesComponents/add-grades/add-grades.component';
import { UpdateGradesComponent } from './GradesComponents/update-grades/update-grades.component';
import { RegisterCourseComponent } from './StudentsComponents/register-course/register-course.component';
import { DoctorsComponent } from './DoctorsComponents/doctors/doctors.component';
import { AddDoctorComponent } from './DoctorsComponents/add-doctor/add-doctor.component';
import { UpdateDoctorComponent } from './DoctorsComponents/update-doctor/update-doctor.component';
import { MyCourseComponent } from './DoctorsComponents/my-course/my-course.component';
import { MyGradesComponent } from './StudentsComponents/my-grades/my-grades.component';


const routes: Routes = [

  { path: '', redirectTo: 'Home', pathMatch: 'full' },

  //Acessable
  {path: 'Home', component: HomeComponent},
  {path: 'auth/login', component: LoginComponent},
  {path: 'auth/register', component: RegisterComponent},

  //Protected
    //Students
  { path: 'Studs', component: StudentsComponent, canActivate : [AuthGuard],data: {role: 'ROLE_ADMIN'}},
  { path: 'Studs/Add', component: AddStudentComponent, canActivate : [AuthGuard],data: {role: 'ROLE_ADMIN'}},
  { path: 'Studs/Update/:id', component: UpdateStudentComponent, canActivate : [AuthGuard],data: {role: 'ROLE_ADMIN'}},
  { path: 'Crs/register', component: RegisterCourseComponent, canActivate : [AuthGuard],data: {role: ['ROLE_STUDENT','ROLE_DOCTOR']}},
  { path: 'Grds/Stud', component: MyGradesComponent, canActivate : [AuthGuard],data: {role: 'ROLE_STUDENT'}},

    //Doctors
  { path: 'Docs', component: DoctorsComponent, canActivate : [AuthGuard],data: {role: 'ROLE_ADMIN'}},
  { path: 'Docs/Add', component: AddDoctorComponent, canActivate : [AuthGuard],data: {role: 'ROLE_ADMIN'}},
  { path: 'Docs/Update/:id', component: UpdateDoctorComponent, canActivate : [AuthGuard],data: {role: 'ROLE_ADMIN'}},
  { path: 'Docs/mycourse/:id', component: MyCourseComponent,canActivate:[AuthGuard],data: {role: 'ROLE_DOCTOR'} },

    //Faculties
  { path: 'Facs', component: FacultiesComponent, canActivate : [AuthGuard],data: {role: 'ROLE_ADMIN'}},
  { path: 'Facs/Add', component: AddFacultyComponent, canActivate : [AuthGuard],data: {role: 'ROLE_ADMIN'}},
  { path: 'Facs/Update/:id', component: UpdateFacultyComponent, canActivate : [AuthGuard],data: {role: 'ROLE_ADMIN'}},

    //Courses
  { path: 'Crs', component: CoursesComponent, canActivate : [AuthGuard],data: {role: 'ROLE_ADMIN'}},
  { path: 'Crs/Add', component: AddCourseComponent, canActivate : [AuthGuard],data: {role: 'ROLE_ADMIN'}},
  { path: 'Crs/Update/:id', component: UpdateCourseComponent, canActivate : [AuthGuard],data: {role: 'ROLE_ADMIN'}},

    //Grades
  { path: 'Grds', component: GradesComponent, canActivate : [AuthGuard],data: {role: 'ROLE_ADMIN'}},
  { path: 'Grds/Add', component: AddGradesComponent, canActivate : [AuthGuard],data: {role: 'ROLE_ADMIN'}},
  { path: 'Grds/Update/:id', component: UpdateGradesComponent, canActivate : [AuthGuard],data: {role: ['ROLE_ADMIN','ROLE_DOCTOR']}},

    {path: '**', redirectTo: 'Home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }