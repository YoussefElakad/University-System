import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { RegisterRequest } from 'src/app/shared/models/Authentication/RegisterRequest.model';
import { Faculty } from 'src/app/shared/models/Faculty/Faculty.model';
import { ApiService } from 'src/app/shared/service/ServiceUni/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register : RegisterRequest =
  {
    role: '',
    code: '',

    first_name:'',
    last_name:'',
    age: null,
    email:'',
    address:'',
    username: '',
    password: ''
  }
  confirmPassword: string = '';

  
  constructor(private api: ApiService,private router: Router,private toaster: ToastrService,private translate: TranslateService) {
    translate.use(localStorage.getItem('lang')!);
   }

  faculty!: Faculty[];
  ngOnInit(): void {
    this.api.getFacs().subscribe(data =>{this.faculty = data;});
  }

  Register()
  {
    if(this.confirmPassword === '')
    {
      this.toaster.error('Confirm Your Password','Error');
      return;
    }
    if(this.register.password != this.confirmPassword)
    {
      this.toaster.error('Password and Confirm Password Must Match','Error');
      return;
    }
    if(this.register.password.length < 8)
    {
      this.toaster.error('Password is less than 8 Charecters','Error');
      return;
    }

    this.api.register(this.register)
    .subscribe({
      next: () => {
      this.toaster.success('Successfully Signed Up Please Login','Success');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.toaster.error(err.error.message,'Error');
      }
    });

  }
}
