import { Component, OnInit, AfterViewInit, ElementRef, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { AppComponent } from '../../app.component';
import { CommonUtils } from '../../shared/utils/commonUtil';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginApiService } from '../../shared/service/login.service';
import { HttpClientModule } from '@angular/common/http';
import { ReqLoginUser } from '../../inteface/req';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare const google: any;

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login-admin.component.html',
  styles:[`

`]
})
export class LoginAdminComponent implements OnInit, AfterViewInit {

  @ViewChild('loginRef', { static: true }) loginElement!: ElementRef;

  constructor(
    public app: AppComponent,
    public util: CommonUtils,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private loginService: LoginApiService,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit(): void {
    this.initializeGoogleSignIn();
  }

  ngAfterViewInit(): void {
    this.renderGoogleButton();
  }

  initializeGoogleSignIn(): void {
    google.accounts.id.initialize({
      client_id: '304068169750-p6udcd9mtd2pku6o6c5rgn1rt79ghl2i.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this),
    });
  }

  renderGoogleButton(): void {
    google.accounts.id.renderButton(
      document.getElementById('customBtn'),
      { type: 'standard', shape: 'pill', theme: 'outline', text: 'Google', size: 'large', logo_alignment: 'left', width: '300px' }
    );
  }


  handleCredentialResponse(response: any): void {
    const responsePayload = this.decodeJWTToken(response.credential);
    sessionStorage.setItem('loggedInUser', JSON.stringify(responsePayload));
    this.router.navigate(['/dashboard']);
  }

  decodeJWTToken(token: string): any {
    return JSON.parse(atob(token.split('.')[1]));
  }

  triggerGoogleSignIn(): void {
    // Panggil fungsi atau metode yang memicu proses Google Sign-In
    this.renderGoogleButton(); // atau fungsi apapun yang sesuai dengan implementasi Anda
  }

  goToSignup(): void {
    this.router.navigate(['/signup']);
  }

  goToLogin(): void {
    const userLogin: ReqLoginUser = { email: 'admin', password: '123' }; // Inisialisasi userLogin
    this.loginService.getDataLogin(userLogin).subscribe(
      (response) => {
        // Tanggapan berhasil dari permintaan login
        const token = this.loginService.generateToken(response.user);
        console.log('Token:', token);
        // Anda dapat menyimpan token ke penyimpanan lokal di sini
      },
      (error) => {
        // Tanggapan gagal dari permintaan login
        console.error('Login error:', error);
      }
    );
  }
}
