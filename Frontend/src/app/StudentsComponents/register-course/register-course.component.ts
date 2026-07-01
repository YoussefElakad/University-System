import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { Course } from 'src/app/shared/models/Course/course.model';
import { Doctor } from 'src/app/shared/models/Doctor/Doctor.model';
import { GradesRequest } from 'src/app/shared/models/Grades/GradesRequest.model';
import { Student } from 'src/app/shared/models/Student/Student.model';
import { ApiService } from 'src/app/shared/service/ServiceUni/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-course',
  templateUrl: './register-course.component.html',
  styleUrls: ['./register-course.component.css']
})
export class RegisterCourseComponent implements OnInit {

  currentPage: number = 1;
  itemsPerPage: number = 6;
  courses: Course[] = [];
  selectedcoursename?: string;
  selectedcourseid?: number;

  student: Student = new Student;
  doctor: Doctor = new Doctor;

  grade: GradesRequest =
  {
    studentid: 0,
    coursename: '',
    grade: null
  };

  students!: number;
  loading = true;
  role = localStorage.getItem('role');

  @ViewChild(ModalComponent)
  modal!: ModalComponent;

  constructor(private api : ApiService,private router: Router,private toaster: ToastrService) { }

  ngOnInit(): void {
    this.FetchingData();
  }


  FetchingData()
  {
    this.api.FetchCrsUser(localStorage.getItem('username')!).subscribe(data =>{
      this.courses = data;
      this.loading = false;
    });

    if (localStorage.getItem('role') === 'ROLE_STUDENT')
    {
      this.api.FetchStudUser(localStorage.getItem('username')!).subscribe(data =>{
      this.student = data;
    });
    }
    else
    {
      this.api.FetchDocUser(localStorage.getItem('username')!).subscribe(data =>{
      this.doctor = data;
    });
    }
  }

  get paginatedCourses() {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  const end = start + this.itemsPerPage;
  return this.courses.slice(start, end);
  }
  get totalPages(): number[] {
  return Array(Math.ceil(this.courses.length / this.itemsPerPage))
    .fill(0)
    .map((x, i) => i + 1);
  }
  changePage(page: number) {
  this.currentPage = page;
  }



  NextPage(coursename?:string,courseid?:number)
  {
    this.selectedcoursename = coursename;
    this.selectedcourseid = courseid;
    if (this.role === 'ROLE_STUDENT')
    {
      this.modal.open();
    }
    else
      this.ApplyPage();

  }

  ApplyPage()
  {
    if (this.role === 'ROLE_STUDENT')
    {
      this.grade.studentid = this.student.studentid;
      this.grade.coursename = this.selectedcoursename;

      this.api.AddGrd(this.grade).subscribe({
        next: () => 
        {
        this.toaster.success('Suceesfully Reigstered the course','Sucess')
        this.courses = this.courses.filter(
          c => c.courseid !== this.selectedcourseid
        );
        },
        error: (err) =>
        {
        this.toaster.error(err.error.message,'Error')
        }
      });
    }
    else
    {
      this.router.navigate(['/Docs/mycourse',this.selectedcourseid]);
    }
  }
}
