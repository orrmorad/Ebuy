import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {
  headers: string[] = [];

  constructor() { }

  ngOnInit() {
    this.headers = ['Employee ID', 'User Type', 'Full Name', 'Login Name', 'Password', 'Registration Date'];
  }

}
