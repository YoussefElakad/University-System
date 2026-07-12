import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Grades } from 'src/app/shared/models/Grades/Grades.model';
import { ApiService } from 'src/app/shared/service/ServiceUni/api.service';
import { ToastrService } from 'ngx-toastr';
import { Student } from 'src/app/shared/models/Student/Student.model';

@Component({
  selector: 'app-add-grades',
  templateUrl: './add-grades.component.html',
  styleUrls: ['./add-grades.component.css']
})
export class AddGradesComponent implements OnInit {

  gradeform!: FormGroup;
  grades! : Grades[];
  students!: Student[];
  coursesfilt: string[] = [];

  constructor(private FB : FormBuilder,private api : ApiService,private toaster: ToastrService) { }

  ngOnInit(): void {
    this.FormBuilding();
    this.GetSelections();
  }

  GetSelections()
  {

    this.api.getGrd(0,10000)
    .subscribe( data =>
    {
      this.grades = data.content
    }
    );

    this.api.getStuds(0,10000)
    .subscribe( data =>
    {
      this.students = data.content
    }
    );
  }

  FormBuilding()
  {
    this.gradeform = this.FB.group(
      {
        studentid : ['Select Student',Validators.required],
        coursename : [{value :'Select Course',disabled:true},Validators.required],
        grade : ['',[
          Validators.required,
          Validators.min(0),
          Validators.max(100)
        ]]
      }
    )
  }

  onStudentChange()
  {
    if(this.gradeform.get('studentid')?.value === 'Select Student')
    {
      this.gradeform.get('coursename')?.disable();
    }
    else
    {
      this.gradeform.get('coursename')?.enable();

      this.coursesfilt = this.grades.filter(g =>
        g.student?.studentid == this.gradeform.get('studentid')?.value
      ).map(g=>g.course?.coursename ?? 'Select Course');  
    }
  }

  onSubmit()
  {
    this.api.AddGrd(this.gradeform.value)
    .subscribe({
      next: () => {
        this.toaster.success('Grade Added','Sucess')
      },
      error: (err) => {
        this.toaster.error(err.error.message,'Sucess')
      }
    });
  }
}