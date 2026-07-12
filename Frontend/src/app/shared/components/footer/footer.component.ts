import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private translate: TranslateService) {
    this.translate.use(localStorage.getItem('lang')!)
   }

  ngOnInit(): void {
  }

  Show()
  {
    
    if(localStorage.getItem('username') != null)
      return this.translate.instant('FOOTER.LOGGED') +localStorage.getItem('username');
    else
      return this.translate.instant('FOOTER.NOTLOGGED');
  }

}
