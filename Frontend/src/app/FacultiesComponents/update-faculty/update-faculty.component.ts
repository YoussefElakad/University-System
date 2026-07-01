import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FacultyRequest } from 'src/app/shared/models/Faculty/FacultyRequest.model';
import { ApiService } from 'src/app/shared/service/ServiceUni/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-faculty',
  templateUrl: './update-faculty.component.html',
  styleUrls: ['./update-faculty.component.css']
})
export class UpdateFacultyComponent implements OnInit {

  id!: number;
  faculty: FacultyRequest = new FacultyRequest;


  constructor(private service: ApiService,private route: ActivatedRoute,private router: Router,private toaster: ToastrService) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.FetchFac(this.id).subscribe(
      data => {
      this.faculty = {
      facultyname: data.facultyname,
      numlevels: data.numlevels
      };
    });
  }

  UpdateFaculty(){
    this.service.UpdateFac(this.id,this.faculty).subscribe({
      next: () => {
        this.toaster.success('Faculty Updated','Success')
        setTimeout(() =>{this.router.navigate(['/Facs']);},2000)
      },
      error: (err) => {
        this.toaster.success(err.error.message,'Error')
      }
  });
}
}
