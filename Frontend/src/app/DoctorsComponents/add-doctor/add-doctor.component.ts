import { Component, OnInit } from '@angular/core';
import { DoctorRequest } from 'src/app/shared/models/Doctor/DoctorRequest.model';
import { ApiService } from 'src/app/shared/service/ServiceUni/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {


  student : DoctorRequest =
  {
    first_name : null,
    last_name : null,
    age : null,
    email:null,
    address:null,

    phone:null,
  };

  constructor(private service : ApiService,private toaster: ToastrService) { }

  ngOnInit(): void {

  }

  addDoctor() {

    this.service.AddDoc(this.student).subscribe({
      next: () => {
        this.toaster.success('Doctor Added','Success')
      },
      error: (err) => {
        this.toaster.error(err.error.message,'Error')
      }

    });
  }
}
