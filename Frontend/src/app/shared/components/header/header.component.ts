import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  constructor() { }

  role: string | null = null;
  ngOnInit(): void {
    this.role = localStorage.getItem('role');
  }

  logout()
  {
    localStorage.clear();
    location.reload();
  }
}
