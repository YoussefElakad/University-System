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
  
  currentPage: number = 0;
  itemsPerPage: number = 5;
  totalpages: number = 0;
  pages: number[] = [];

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
    this.api.getStuds(this.currentPage, this.itemsPerPage)
    .subscribe(data => {
      this.students = data.content;
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

changePage(page: number) {
  if (page >= 0 && page < this.totalpages) {
    this.currentPage = page;
    this.GetData();
  }
}
//----------------------------------------------

}
