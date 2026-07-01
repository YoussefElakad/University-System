import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/service/ServiceUni/api.service';
import { ActivatedRoute } from '@angular/router';
import { StudentRequest } from '../../shared/models/Student/StudentRequest.model';
import { Faculty } from '../../shared/models/Faculty/Faculty.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {

  id!: number;
  code!: string | undefined;
  student: StudentRequest = new StudentRequest;
  faculties : Faculty[] = [];


  constructor(private service: ApiService,private route: ActivatedRoute,private toaster : ToastrService) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.FetchStud(this.id).subscribe(
      data => {
      this.student = {
      first_name: data.first_name,
      last_name: data.last_name,
      age: data.age,
      email: data.email,
      phone: data.phone,
      address: data.address,
      facultyname: data.faculty.facultyname,
      levelid: data.level.levelid
      };
      this.code = data.studentcode;

    }
    );

    this.service.getFacs().subscribe(data => {
    this.faculties = data;
    });
  }

  UpdateStudent(){
    this.service.UpdateStu(this.id,this.student).subscribe({
      next: (res) => {
        console.log('Student Updated:', res);
        this.toaster.success('Student Updated','Sucess');

      },
      error: (err) => {
        console.log('Error:', err);
        this.toaster.error(err.error.message,'Error')
      }
  });
}
}
