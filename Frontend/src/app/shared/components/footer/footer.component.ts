import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  Show()
  {
    if(localStorage.getItem('username') != null)
      return "Logged In As User "+localStorage.getItem('username');
    else
      return "Welcome To Your University"
  }

}
