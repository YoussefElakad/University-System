import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { Doctor } from 'src/app/shared/models/Doctor/Doctor.model';
import { ApiService } from 'src/app/shared/service/ServiceUni/api.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  currentPage: number = 1;
  itemsPerPage: number = 6;
  facultyFilter: string = '';
  doctorfilter: string = '';
  selectedId!:number;

  doctors: Doctor[] = [];
  loading = true;

  @ViewChild(ModalComponent)
  modal!: ModalComponent;


  constructor(private api:ApiService) { }

  //----------------------------------------------
  //Getting Data
  ngOnInit(): void {
    this.getData();
  }
  //----------------------------------------------

  getData()
  {
    this.api.getDocs().subscribe(data => {
    this.doctors = data;
    this.loading = false;
    });
  }
  //----------------------------------------------
  //Delete Function With Modal
  openDeleteModal(id: number) {
  this.selectedId = id;

  this.modal.open();
  }

  DeleteDoctor() {
  this.api.DeleteDocs(this.selectedId).subscribe(() => {
    this.doctors = this.doctors.filter(d => d.doctorid !== this.selectedId);
    });
  }
  //----------------------------------------------

  //----------------------------------------------
  //Pagination And Filteration For Students
  get filteredDoctors() {
  return this.doctors.filter(doc => {

    const nameMatch =
      !this.doctorfilter ||
      (doc.first_name + " " + doc.last_name)
        .toLowerCase()
        .includes(this.doctorfilter.toLowerCase());

    return nameMatch;
  });
}

get paginatedDocs() {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  const end = start + this.itemsPerPage;
  return this.filteredDoctors.slice(start, end);
}

get totalPages(): number[] {
  return Array(Math.ceil(this.filteredDoctors.length / this.itemsPerPage))
    .fill(0)
    .map((x, i) => i + 1);
}

changePage(page: number) {
  this.currentPage = page;
}
//----------------------------------------------
}
