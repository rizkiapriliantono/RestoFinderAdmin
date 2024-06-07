import { Component, OnInit, AfterViewInit, ElementRef, Inject, LOCALE_ID, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../shared/service/login.service';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConstantaUtil } from '../../shared/utils/constantaUtil';
import { CommonUtils } from '../../shared/utils/commonUtil';

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
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private loginService: LoginService,
    private ngZone: NgZone,  // Injeksi NgZone di sini
    private util: CommonUtils,  // Injeksi NgZone di sini
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
    // localStorage.setItem('authToken', JSON.stringify(responsePayload));
    localStorage.setItem(ConstantaUtil.USER_PROFILE, this.util.encrypt(JSON.stringify(responsePayload)));
    this.ngZone.run(() => {
      this.router.navigate(['/dashboard']);
  });
  }

  decodeJWTToken(token: string): any {
    return JSON.parse(atob(token.split('.')[1]));
  }

  loginWithEmail(): void {
    this.loginService.loginWithCredentials(this.email, this.password).subscribe(
      res => {
        const jwtToken = res.token;
        localStorage.setItem('authToken', jwtToken);

        // Menggunakan NgZone untuk navigasi
        this.ngZone.run(() => {
          this.router.navigate(['/dashboard']);
        });
      },
      error => {
        console.error('Login error:', error);
      }
    );
  }

  goToSignup(): void {
    this.router.navigate(['/signup']);
  }
}
