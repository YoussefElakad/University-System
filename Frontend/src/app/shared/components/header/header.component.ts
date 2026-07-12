import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  role: string | null = null;
  
  constructor(private translate: TranslateService) {
    translate.use(localStorage.getItem('lang')!);
   }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
  }

  logout()
  {
    localStorage.clear();
    location.reload();
  }
}
