import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/service/ServiceUni/api.service';
import { StudentRequest } from '../../shared/models/Student/StudentRequest.model';
import { Faculty } from '../../shared/models/Faculty/Faculty.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  student : StudentRequest =
  {
    first_name : null,
    last_name : null,
    age : null,
    email:null,
    address:null,

    phone:null,
    facultyname :'',
    levelid:null
  };
  faculties : Faculty[] = [];

  constructor(private service : ApiService,private toaster: ToastrService) { }

  ngOnInit(): void {
    this.getFacData();
  }

  getFacData()
  {
    this.service.getFacs().subscribe(data => {
    this.faculties = data;
    });
  }

  addStudent() {

    this.service.AddStu(this.student).subscribe({
      next: () => {
        this.toaster.success('Student added','Sucess');
      },
      error: (err) => {
        this.toaster.error(err.error.message,'Error');
      }
    });
  }
}
