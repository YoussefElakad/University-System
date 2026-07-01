import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/service/ServiceUni/api.service';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../../shared/models/Student/Student.model';

@Component({
  selector: 'app-fetch-student',
  templateUrl: './fetch-student.component.html',
  styleUrls: ['./fetch-student.component.css']
})
export class FetchStudentComponent implements OnInit {

  id! : number;
  student : Student = new Student;

  constructor(private api:ApiService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.FetchStud(this.id).subscribe(data => {this.student = data as Student});
  }

}
