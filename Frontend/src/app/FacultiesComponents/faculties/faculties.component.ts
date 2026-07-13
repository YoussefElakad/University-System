import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../shared/service/ServiceUni/api.service';
import { Faculty } from '../../shared/models/Faculty/Faculty.model';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-faculties',
  templateUrl: './faculties.component.html',
  styleUrls: ['./faculties.component.css']
})
export class FacultiesComponent implements OnInit {


  //----------------------------------------------
  //Getting Data
  faculties : Faculty[] = [];
  loading = true;
  selectedId!:number;
  currentPage: number = 1;
  itemsPerPage: number = 6;
  facultyFilter: string = '';

  @ViewChild(ModalComponent)
  modal!: ModalComponent;


 constructor(private api:ApiService,private translate: TranslateService) {
  translate.use(localStorage.getItem('lang')!);
  }
  ngOnInit(): void {
   this.getFaculties();
  }

  getFaculties(){
     this.api.getFacs().subscribe(data => {
      this.faculties = data;
      this.loading = false;
  });
  }
  //----------------------------------------------

  //----------------------------------------------
  //Delete Function With Modal
  openDeleteModal(id: number) {
  this.selectedId = id;

  this.modal.open();
  }

  DeleteFaculty() {
  this.api.DeleteFac(this.selectedId).subscribe(() => {
    this.faculties = this.faculties.filter(f => f.facultyid !== this.selectedId);
    });
  }
  //----------------------------------------------

  //----------------------------------------------
  //Pagination And Filteration For Students
  get filteredFaculties() {
  return this.faculties.filter(faculty => {

    const nameMatch =
      !this.facultyFilter ||
      faculty.facultyname
        ?.toLowerCase()
        .includes(this.facultyFilter.toLowerCase());

    return nameMatch;
  });
}

get paginatedFaculties() {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  const end = start + this.itemsPerPage;
  return this.filteredFaculties.slice(start, end);
}

get totalPages(): number[] {
  return Array(Math.ceil(this.filteredFaculties.length / this.itemsPerPage))
    .fill(0)
    .map((x, i) => i + 1);
}

changePage(page: number) {
  this.currentPage = page;
}
//----------------------------------------------

}
