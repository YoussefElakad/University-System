import { Component, OnInit } from '@angular/core';
import { CourseGrade } from 'src/app/shared/models/Grades/CourseGrade.model';
import { Student } from 'src/app/shared/models/Student/Student.model';
import { ApiService } from 'src/app/shared/service/ServiceUni/api.service';

@Component({
  selector: 'app-my-grades',
  templateUrl: './my-grades.component.html',
  styleUrls: ['./my-grades.component.css']
})
export class MyGradesComponent implements OnInit {

  currentPage: number = 1;
  itemsPerPage: number = 6;
  loading = true;

  student?: Student;
  courses: CourseGrade[] = [];
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData()
  {
    this.api.FetchStudUser(localStorage.getItem('username')!).subscribe(student => {
      this.student = student;

    this.api.FetchGrdsStud(student.studentid!).subscribe(courses => {
      this.courses = courses;
      this.loading = false;
    });
  });
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
}
