import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { Course } from 'src/app/shared/models/Course/course.model';
import { Faculty } from 'src/app/shared/models/Faculty/Faculty.model';
import { ApiService } from 'src/app/shared/service/ServiceUni/api.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(private api:ApiService) { }

  //----------------------------------------------
  //Getting Data
  courses: Course[] = [];
  loading = true;
  faculties : Faculty[] = [];
  selectedId!:number;
  
  currentPage: number = 0;
  itemsPerPage: number = 5;
  totalpages: number = 0;
  pages: number[] = [];

  facultyFilter: string = '';
  courseNameFilter: string = '';

  @ViewChild(ModalComponent)
  modal! : ModalComponent;

  ngOnInit(): void {
    this.GetData();
  }
  //----------------------------------------------

  GetData()
  {
    this.api.getCrs(this.currentPage, this.itemsPerPage)
    .subscribe(data => {
      this.courses = data.content;
      this.totalpages = data.totalPages;

      this.pages = Array.from(
        { length: this.totalpages },
        (_, i) => i
      );
      this.loading = false;
    });

    this.api.getFacs().subscribe(data => {
    this.faculties = data;
    });
  }
  //----------------------------------------------
  //Delete Function With Modal

  openDeleteModal(id: number) {
  this.selectedId = id;

  this.modal.open();
}

  DeleteCourse() {
  this.api.DeleteCrs(this.selectedId).subscribe(() => {
    this.courses = this.courses.filter(s => s.courseid !== this.selectedId);
    });
  }
  //----------------------------------------------

  //----------------------------------------------
  //Pagination And Filteration For Students
  get filteredCourses() {
  return this.courses.filter(course => {

    const facultyMatch =
      !this.facultyFilter ||
      course.faculty.facultyname === this.facultyFilter;

    const nameMatch =
      !this.courseNameFilter ||
      course.coursename
        .toLowerCase()
        .includes(this.courseNameFilter.toLowerCase());

    return facultyMatch && nameMatch;
  });
}

get totalPages(): number[] {
  return Array(Math.ceil(this.filteredCourses.length / this.itemsPerPage))
    .fill(0)
    .map((x, i) => i + 1);
}

changePage(page: number) {
  if (page >= 0 && page < this.totalpages) {
    this.currentPage = page;
    this.GetData();
  }
}
//----------------------------------------------

}
