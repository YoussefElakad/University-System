import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/shared/models/Course/course.model';
import { StudentGrade } from 'src/app/shared/models/Grades/StudentGrade.model';
import { ApiService } from 'src/app/shared/service/ServiceUni/api.service';

@Component({
  selector: 'app-my-course',
  templateUrl: './my-course.component.html',
  styleUrls: ['./my-course.component.css']
})
export class MyCourseComponent implements OnInit {

  currentPage: number = 1;
  itemsPerPage: number = 6;
  loading = true;

  course?: Course;
  students: StudentGrade[] = [];
  constructor(private route: ActivatedRoute,private api: ApiService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData()
  {
    this.route.paramMap.subscribe(params => {
    const id = +params.get('id')!;

    this.api.FetchCrs(id).subscribe(data => {
      this.course = data;
    })
    this.api.FetchStudCrs(id).subscribe(data => {
      this.students = data;
    });
    this.loading = false;
  });
  }


  get paginatedStudents() {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  const end = start + this.itemsPerPage;
  return this.students.slice(start, end);
  }
  get totalPages(): number[] {
  return Array(Math.ceil(this.students.length / this.itemsPerPage))
    .fill(0)
    .map((x, i) => i + 1);
  }
  changePage(page: number) {
  this.currentPage = page;
  }
}
