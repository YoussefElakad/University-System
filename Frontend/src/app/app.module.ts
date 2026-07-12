import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HomeComponent } from './Authentication/home/home.component';
import { StudentsComponent } from './StudentsComponents/students/students.component';
import { LoginComponent } from './Authentication/login/login.component';
import { AddStudentComponent } from './StudentsComponents/add-student/add-student.component';
import { UpdateStudentComponent } from './StudentsComponents/update-student/update-student.component';
import { FetchStudentComponent } from './StudentsComponents/fetch-student/fetch-student.component';
import { FacultiesComponent } from './FacultiesComponents/faculties/faculties.component';
import { AddFacultyComponent } from './FacultiesComponents/add-faculty/add-faculty.component';
import { FetchFacultyComponent } from './FacultiesComponents/fetch-faculty/fetch-faculty.component';
import { UpdateFacultyComponent } from './FacultiesComponents/update-faculty/update-faculty.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { AuthInterceptor } from './Authentication/SecurityLogic/auth.interceptor';
import { CoursesComponent } from './CourseComponents/courses/courses.component';
import { FetchCourseComponent } from './CourseComponents/fetch-course/fetch-course.component';
import { AddCourseComponent } from './CourseComponents/add-course/add-course.component';
import { UpdateCourseComponent } from './CourseComponents/update-course/update-course.component';
import { GradesComponent } from './GradesComponents/grades/grades.component';
import { AddGradesComponent } from './GradesComponents/add-grades/add-grades.component';
import { UpdateGradesComponent } from './GradesComponents/update-grades/update-grades.component';
import { FetchGradesComponent } from './GradesComponents/fetch-grades/fetch-grades.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { RegisterCourseComponent } from './StudentsComponents/register-course/register-course.component';
import { DoctorsComponent } from './DoctorsComponents/doctors/doctors.component';
import { AddDoctorComponent } from './DoctorsComponents/add-doctor/add-doctor.component';
import { UpdateDoctorComponent } from './DoctorsComponents/update-doctor/update-doctor.component';
import { FetchDoctorComponent } from './DoctorsComponents/fetch-doctor/fetch-doctor.component';
import { MyCourseComponent } from './DoctorsComponents/my-course/my-course.component';
import { MyGradesComponent } from './StudentsComponents/my-grades/my-grades.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/transes/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    StudentsComponent,
    LoginComponent,
    AddStudentComponent,
    UpdateStudentComponent,
    FetchStudentComponent,
    FacultiesComponent,
    AddFacultyComponent,
    FetchFacultyComponent,
    UpdateFacultyComponent,
    RegisterComponent,
    CoursesComponent,
    FetchCourseComponent,
    AddCourseComponent,
    UpdateCourseComponent,
    GradesComponent,
    AddGradesComponent,
    UpdateGradesComponent,
    FetchGradesComponent,
    ModalComponent,
    RegisterCourseComponent,
    DoctorsComponent,
    AddDoctorComponent,
    UpdateDoctorComponent,
    FetchDoctorComponent,
    MyCourseComponent,
    MyGradesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
