import { Component, OnInit } from '@angular/core';
import { CourseRequest } from 'src/app/shared/models/Course/courseRequest.model';
import { Doctor } from 'src/app/shared/models/Doctor/Doctor.model';
import { Faculty } from 'src/app/shared/models/Faculty/Faculty.model';
import { ApiService } from 'src/app/shared/service/ServiceUni/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  course : CourseRequest =
  {
    coursename : '',
    facultyname : '',
    doctorid: '',
  };
  faculties : Faculty[] = [];
  doctors : Doctor[] = [];

  constructor(private service : ApiService,private toaster: ToastrService) { }

  ngOnInit(): void {
    this.getdata();
  }


  getdata()
  {
    this.service.getFacs().subscribe(data => {
    this.faculties = data;
    });

    this.service.getDocs().subscribe(data => {
    this.doctors = data;
    });
  }


  addCourse() {

    this.service.AddCrs(this.course).subscribe({
      next: () => {
        this.toaster.success('Course Added','Success')
      },
      error: (err) => {
        this.toaster.error(err.error.message,'Error')
      }
    });
  }

}
