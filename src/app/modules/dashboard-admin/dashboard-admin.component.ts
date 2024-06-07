import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss'
})
export class DashboardAdminComponent implements OnInit {
  constructor(
    private router: Router,
  ) { }
  userProfile : any;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.userProfile = sessionStorage.getItem("loggedInUser");
    if (this.userProfile) {
      this.userProfile = JSON.parse(this.userProfile);
    } else {
      this.userProfile = {}; // or any default value
    }

  }
}
