import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseRequest } from 'src/app/shared/models/Course/courseRequest.model';
import { Doctor } from 'src/app/shared/models/Doctor/Doctor.model';
import { Faculty } from 'src/app/shared/models/Faculty/Faculty.model';
import { ApiService } from 'src/app/shared/service/ServiceUni/api.service';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {

  id!: number;
  course: CourseRequest = new CourseRequest;
  faculty: Faculty[] = [];
  doctor: Doctor[] = [];
  levels = [1,2,3,4,5,6,7];



  constructor(private service: ApiService,private route: ActivatedRoute,private router: Router,private toaster: ToastrService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData()
  {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.FetchCrs(this.id).subscribe(
      data => {
      this.course = {
      coursename: data.coursename,
      facultyname: data.faculty?.facultyname,
      levelid: data.level?.levelid,
      doctorid: data.doctor?.doctorid
      };
    });

    this.service.getFacs().subscribe(data => {
      this.faculty = data;
    });

    this.service.getDocs(0,10000).subscribe(data => {
      this.doctor = data.content;
    });
  }


  UpdateCourse(){
    this.service.UpdateCrs(this.id,this.course).subscribe({
      next: () => {
        this.toaster.success('Course Updated','Success')
        setTimeout(() =>{this.router.navigate(['/Crs']);},2000)
      },
      error: (err) => {
        this.toaster.error(err.error.message,'Error')
      }
  });
}
}
