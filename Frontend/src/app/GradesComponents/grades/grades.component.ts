import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { Course } from 'src/app/shared/models/Course/course.model';
import { Faculty } from 'src/app/shared/models/Faculty/Faculty.model';
import { Grades } from 'src/app/shared/models/Grades/Grades.model';
import { Student } from 'src/app/shared/models/Student/Student.model';
import { ApiService } from 'src/app/shared/service/ServiceUni/api.service';


@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {

  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalpages: number = 0;

  studentNameFilter: string = '';
  facultyFilter: string = 'All Faculties';
  coursesFilter: string = 'All Courses';
  levelFilter: string = 'All Levels';

  courseDisabled: boolean = true;
  levelDisabled: boolean = true;

  selectedId!:number;

  students: Student[] = [];
  faculty: Faculty[] = [];

  courses : Course[] = [];
  coursesfilt: string[] = [];
  levelfilt: string[] = [];
  
  loading = true;
  grade : Grades[] = [];

  @ViewChild(ModalComponent)
  modal! : ModalComponent;


  constructor(private api:ApiService) { }

  //----------------------------------------------
  //Getting Data
  ngOnInit(): void {
    this.FetchingData();
  }
  //----------------------------------------------

  FetchingData()
  {
    this.api.getGrd().subscribe(data => {
    this.grade = data;
    this.loading = false;
    });

    this.api.getFacs().subscribe(data => {
    this.faculty = data;
    });


    this.api.getStuds(this.currentPage, this.itemsPerPage).subscribe(data => {
      this.students = data.content;
      this.totalpages = data.totalPages;
    });

    this.api.getCrs().subscribe(data => {
    this.courses = data;
    });
  }

  OnFacultyChange()
  {
    if(this.facultyFilter === 'All Faculties')
    {
      this.levelFilter = 'All Levels'
      this.coursesFilter = 'All Courses'

      this.levelDisabled = true;
      this.courseDisabled = true;
    }
    else
    {
      this.levelDisabled = false;

      this.levelfilt = Array.from(
        { length: Number(this.faculty.find(f=> f.facultyname === this.facultyFilter)?.numlevels) ?? 0 }, (_, i) => (i + 1).toString())
    }
  }
  
  OnLevelChange()
  {
    if(this.levelFilter === 'All Levels')
    {
      this.coursesFilter = 'All Courses'
      this.courseDisabled = true;
    }
    else
    {
      this.courseDisabled = false;

      this.coursesfilt = this.courses.filter(c =>
        c.faculty.facultyname === this.facultyFilter && c.level?.levelid === +this.levelFilter
      ).map(c=>c.coursename);  
    }
  }



  //----------------------------------------------
  //Delete Function With Modal
  openDeleteModal(id: number) {
  this.selectedId = id;

  this.modal.open();
}

  DeleteGrade() {
  this.api.DeleteGrd(this.selectedId).subscribe(() => {
    this.grade = this.grade.filter(g => g.gradeid !== this.selectedId);
    });
  }
  //----------------------------------------------

  //----------------------------------------------
  //Pagination And Filteration For Grades
  get filteredGrades() {
  return this.grade.filter(grade => {

    const courseMatch =
      this.coursesFilter === 'All Courses' ||
      grade.course?.coursename == this.coursesFilter;

    const facultyMatch =
      this.facultyFilter === 'All Faculties' ||
      grade.course?.faculty?.facultyname === this.facultyFilter;

    const nameMatch =
      !this.studentNameFilter ||
      (grade.student?.first_name + " " + grade.student?.last_name)
        .toLowerCase()
        .includes(this.studentNameFilter.toLowerCase());
    
    const levelMatch =
      this.levelFilter === 'All Levels' ||
      grade.course?.level?.levelid?.toString() === this.levelFilter;

    return courseMatch && facultyMatch && nameMatch && levelMatch;
  });
}

get paginatedGrades() {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  const end = start + this.itemsPerPage;
  return this.filteredGrades.slice(start, end);
}

get totalPages(): number[] {
  return Array(Math.ceil(this.filteredGrades.length / this.itemsPerPage))
    .fill(0)
    .map((x, i) => i + 1);
}

changePage(page: number) {
  this.currentPage = page;
}
//----------------------------------------------

}
