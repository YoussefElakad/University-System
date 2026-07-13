import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LoginRequest } from 'src/app/shared/models/Authentication/LoginRequest.model';
import { ApiService } from 'src/app/shared/service/ServiceUni/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginRequest: LoginRequest = {
    username: '',
    password: ''
  };

  constructor(private router : Router,private api : ApiService,private toaster: ToastrService,private translate: TranslateService) {
    translate.use(localStorage.getItem('lang')!);
   }

  ngOnInit(): void {
  }

  login(){
  this.api.login(this.loginRequest)
    .subscribe({
      next: (res: any) => {

        localStorage.setItem('token', res.token);
        localStorage.setItem('username',this.loginRequest.username);
        localStorage.setItem('role',res.role);

        if(localStorage.getItem('role') === 'ROLE_ADMIN')
          this.router.navigate(['/Studs']).then(()=>{location.reload();});
        else
          this.router.navigate(['/Home']).then(()=>{location.reload();});
      },
      error: () => {
        this.toaster.error('Invalid Credentials','Error')
      }
    });
  }
}
