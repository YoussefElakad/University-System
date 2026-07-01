import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GradesRequest } from 'src/app/shared/models/Grades/GradesRequest.model';
import { ApiService } from 'src/app/shared/service/ServiceUni/api.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-update-grades',
  templateUrl: './update-grades.component.html',
  styleUrls: ['./update-grades.component.css']
})
export class UpdateGradesComponent implements OnInit {

  id!: number;
  grade: GradesRequest = new GradesRequest;


  constructor(private service: ApiService,private route: ActivatedRoute,private toaster: ToastrService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData()
  {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.FetchGrd(this.id).subscribe(
      data => {
      this.grade = {
      studentid : data.student?.studentid,
      coursename : data.course?.coursename,
      grade : data.grade
      };
    }
    );
  }

  UpdateGrade(){
    this.service.UpdateGrd(this.id,this.grade).subscribe({
      next: () => {
        this.toaster.success('Grade Updated','Sucess');
        setTimeout(() => {history.back()},2000);
      },
      error: (err) => {
        this.toaster.error(err.error.message,'error');
      }
  });
}
}
