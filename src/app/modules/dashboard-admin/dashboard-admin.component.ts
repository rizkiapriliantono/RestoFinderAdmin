import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantaUtil } from '../../shared/utils/constantaUtil';
import { CommonUtils } from '../../shared/utils/commonUtil';

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
    private util: CommonUtils,
  ) { }
  userProfile : any;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('data masuk dashboard');

    if (localStorage.getItem(ConstantaUtil.USER_PROFILE)) {
      this.userProfile = JSON.parse(this.util.decrypt(localStorage.getItem(ConstantaUtil.USER_PROFILE)));
    }
    console.log('data user profile', this.userProfile);

    if (this.userProfile) {
      this.userProfile = JSON.parse(this.userProfile);
    } else {
      this.userProfile = {}; // or any default value
    }

  }

  // console.log();

}
