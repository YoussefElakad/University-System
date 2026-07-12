import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../../models/Student/Student.model';
import { StudentRequest } from '../../models/Student/StudentRequest.model';
import { Faculty } from '../../models/Faculty/Faculty.model';
import { FacultyRequest } from '../../models/Faculty/FacultyRequest.model';
import { RegisterRequest } from '../../models/Authentication/RegisterRequest.model';
import { LoginRequest } from '../../models/Authentication/LoginRequest.model';
import { Course } from '../../models/Course/course.model';
import { CourseRequest } from '../../models/Course/courseRequest.model';
import { Grades } from '../../models/Grades/Grades.model';
import { GradesRequest } from '../../models/Grades/GradesRequest.model';
import { Doctor } from '../../models/Doctor/Doctor.model';
import { DoctorRequest } from '../../models/Doctor/DoctorRequest.model';
import { CourseGrade } from '../../models/Grades/CourseGrade.model';
import { StudentGrade } from '../../models/Grades/StudentGrade.model';
import { Page } from '../../models/Page.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  // Authentication-------------------------------------------------
  register(register: RegisterRequest){
    return this.http.post<RegisterRequest>(this.baseUrl + "/auth/register",register);
  }

  login(login: LoginRequest){
    return this.http.post<LoginRequest>(this.baseUrl + "/auth/login",login);
  }
  // Authentication-------------------------------------------------

  // Students-------------------------------------------------
  getStuds(page: number, size: number) {
    return this.http.get<Page<Student>>(
      `${this.baseUrl}/Studs?page=${page}&size=${size}`
    );
  }

  FetchStudUser(username: string) {
    return this.http.get<Student>(
      this.baseUrl + "/Studs/user",
      {
        params: { username }
      }
    );
  }

  FetchStud(id : number){
    return this.http.get<Student>(`${this.baseUrl}/Studs/${id}`);
  }

  DeleteStu(id : number){
    return this.http.delete(`${this.baseUrl}/Studs/Delete/${id}`);
  }

  AddStu(student : StudentRequest){
    return this.http.post<StudentRequest>(this.baseUrl + '/Studs/Add',student);
  }

  UpdateStu(id : number,student : StudentRequest){
    return this.http.put<StudentRequest>(`${this.baseUrl}/Studs/Update/${id}`,student);
  }
  // Students-------------------------------------------------

  // Doctors-------------------------------------------------
  getDocs(){
    return this.http.get<Doctor[]>(this.baseUrl + "/Docs");
  }

  FetchDocUser(username: string) {
    return this.http.get<Doctor>(
      this.baseUrl + "/Docs/user",
      {
        params: { username }
      }
    );
  }

  FetchDocs(id : number){
    return this.http.get<Doctor>(`${this.baseUrl}/Docs/${id}`);
  }

  DeleteDocs(id : number){
    return this.http.delete(`${this.baseUrl}/Docs/Delete/${id}`);
  }

  AddDoc(doctor : DoctorRequest){
    return this.http.post<DoctorRequest>(this.baseUrl + '/Docs/Add',doctor);
  }

  UpdateDocs(id : number,student : DoctorRequest){
    return this.http.put<DoctorRequest>(`${this.baseUrl}/Docs/Update/${id}`,student);
  }
  // Doctors-------------------------------------------------

  // Faculties-------------------------------------------------
  getFacs(){
    return this.http.get<Faculty[]>(this.baseUrl + "/Facs")
  }
  

  FetchFac(id : number){
    return this.http.get<Faculty>(`${this.baseUrl}/Facs/${id}`);
  }

  DeleteFac(id : number){
    return this.http.delete(`${this.baseUrl}/Facs/Delete/${id}`);
  }

  AddFac(faculty : FacultyRequest){
    return this.http.post<FacultyRequest>(this.baseUrl + '/Facs/Add',faculty);
  }

  UpdateFac(id : number,faculty : FacultyRequest){
    return this.http.put<FacultyRequest>(`${this.baseUrl}/Facs/Update/${id}`,faculty);
  }
  // Faculties-------------------------------------------------

  // Courses-------------------------------------------------
  getCrs(){
    return this.http.get<Course[]>(this.baseUrl + "/Crs")
  }

  FetchCrs(id : number){
    return this.http.get<Course>(`${this.baseUrl}/Crs/${id}`);
  }

  FetchCrsUser(username: string) {
    return this.http.get<Course[]>(
      this.baseUrl + "/Crs/user",
      {
        params: { username }
      }
    );
  }

  DeleteCrs(id : number){
    return this.http.delete(`${this.baseUrl}/Crs/Delete/${id}`);
  }

  AddCrs(faculty : CourseRequest){
    return this.http.post<CourseRequest>(this.baseUrl + '/Crs/Add',faculty);
  }

  UpdateCrs(id : number,faculty : CourseRequest){
    return this.http.put<CourseRequest>(`${this.baseUrl}/Crs/Update/${id}`,faculty);
  }
  // Courses-------------------------------------------------

  // Grades-------------------------------------------------
  getGrd(){
    return this.http.get<Grades[]>(this.baseUrl + "/Grds")
  }

  FetchGrd(id : number){
    return this.http.get<Grades>(`${this.baseUrl}/Grds/${id}`);
  }

  DeleteGrd(id : number){
    return this.http.delete(`${this.baseUrl}/Grds/Delete/${id}`);
  }

  AddGrd(faculty : GradesRequest){
    return this.http.post<GradesRequest>(this.baseUrl + '/Grds/Add',faculty);
  }

  UpdateGrd(id : number,faculty : GradesRequest){
    return this.http.put<GradesRequest>(`${this.baseUrl}/Grds/Update/${id}`,faculty);
  }

  FetchStudCrs(courseid: number) {
    return this.http.get<StudentGrade[]>(
      this.baseUrl + "/Grds/Crs",
      {
        params: { courseid }
      }
    );
  }

  FetchGrdsStud(studentid: number) {
    return this.http.get<CourseGrade[]>(
      this.baseUrl + "/Grds/Stud",
      {
        params: { studentid }
      }
    );
  }
  // Grades-------------------------------------------------
}