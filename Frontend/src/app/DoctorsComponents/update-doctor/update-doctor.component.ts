import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorRequest } from 'src/app/shared/models/Doctor/DoctorRequest.model';
import { ApiService } from 'src/app/shared/service/ServiceUni/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-doctor',
  templateUrl: './update-doctor.component.html',
  styleUrls: ['./update-doctor.component.css']
})
export class UpdateDoctorComponent implements OnInit {

  id!: number;
  code!: string | undefined;
  doctor: DoctorRequest = new DoctorRequest;


  constructor(private service: ApiService,private route: ActivatedRoute,private router: Router,private toaster: ToastrService) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.FetchDocs(this.id).subscribe(
      data => {
      this.doctor = {
      first_name: data.first_name,
      last_name: data.last_name,
      age: data.age,
      email: data.email,
      phone: data.phone,
      address: data.address,
      };
      this.code = data.doctorcode;

    }
    );
  }

  UpdateDoctor(){
    this.service.UpdateDocs(this.id,this.doctor).subscribe({
      next: () => {
        this.toaster.success('Doctor Updated','Sucess')
      },
      error: (err) => {
        this.toaster.error(err.error.message,'Error')
      }
  });
}
}
