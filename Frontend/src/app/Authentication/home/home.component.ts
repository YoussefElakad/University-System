import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    localStorage.setItem('lang','en');
   }

  ngOnInit(): void {
  }

  isLogged()
  {
    if (localStorage.getItem('token'))
      return true;
    else
      return false;
  }

  SwitchEng()
  {
    this.translate.use('en');
    localStorage.setItem('lang','en');
  }

  SwitchAr()
  {
    this.translate.use('ar');
    localStorage.setItem('lang','ar');
  }

}
