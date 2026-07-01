import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../shared/service/ServiceUni/api.service';
import { Student } from '../../shared/models/Student/Student.model';
import { Faculty } from '../../shared/models/Faculty/Faculty.model';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  
  currentPage: number = 1;
  itemsPerPage: number = 6;
  facultyFilter: string = '';
  studentNameFilter: string = '';
  selectedId!:number;

  students: Student[] = [];
  loading = true;
  faculties : Faculty[] = [];

  @ViewChild(ModalComponent)
  modal!: ModalComponent;


  constructor(private api:ApiService) { }

  //----------------------------------------------
  //Getting Data
  ngOnInit(): void {
    this.GetData();
  }
  //----------------------------------------------

  GetData()
  {
      this.api.getStuds().subscribe(data => {
      this.students = data;
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

  DeleteStudent() {
  this.api.DeleteStu(this.selectedId).subscribe(() => {
    this.students = this.students.filter(s => s.studentid !== this.selectedId);
    });
  }
  //----------------------------------------------

  //----------------------------------------------
  //Pagination And Filteration For Students
  get filteredStudents() {
  return this.students.filter(student => {

    const facultyMatch =
      !this.facultyFilter ||
      student.faculty.facultyname === this.facultyFilter;

    const nameMatch =
      !this.studentNameFilter ||
      (student.first_name + " " + student.last_name)
        .toLowerCase()
        .includes(this.studentNameFilter.toLowerCase());

    return facultyMatch && nameMatch;
  });
}

get paginatedStudents() {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  const end = start + this.itemsPerPage;
  return this.filteredStudents.slice(start, end);
}

get totalPages(): number[] {
  return Array(Math.ceil(this.filteredStudents.length / this.itemsPerPage))
    .fill(0)
    .map((x, i) => i + 1);
}

changePage(page: number) {
  this.currentPage = page;
}
//----------------------------------------------

}
