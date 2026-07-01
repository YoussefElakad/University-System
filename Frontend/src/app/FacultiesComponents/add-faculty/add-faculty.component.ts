import { Component, OnInit } from '@angular/core';
import { FacultyRequest } from 'src/app/shared/models/Faculty/FacultyRequest.model';
import { ApiService } from 'src/app/shared/service/ServiceUni/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-faculty',
  templateUrl: './add-faculty.component.html',
  styleUrls: ['./add-faculty.component.css']
})
export class AddFacultyComponent implements OnInit {

  faculty : FacultyRequest = new FacultyRequest;

  constructor(private service : ApiService,private toaster: ToastrService) { }

  ngOnInit(): void {
  }

  addFaculty() {

    this.service.AddFac(this.faculty).subscribe({
      next: () => {
        this.toaster.success('Faculty added','Success');
      },
      error: (err) => {
        this.toaster.error(err.error.message,'Error')
      }
    });
  }

}
