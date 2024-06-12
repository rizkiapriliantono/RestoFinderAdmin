import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, LOCALE_ID, NgZone, PLATFORM_ID, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/service/login.service';
import { CommonUtils } from 'src/app/shared/utils/commonUtil';
import { ConstantaUtil } from 'src/app/shared/utils/constantaUtil';


declare const google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {

  @ViewChild('loginRef', { static: true }) loginElement!: ElementRef;
  email: string = '';
  password: string = '';

  // Dummy Token
  paramToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzMDQwNjgxNjk3NTAtcDZ1ZGNkOW10ZDJwa3U2bzZjNXJnbjFydDc5Z2hsMmkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIzMDQwNjgxNjk3NTAtcDZ1ZGNkOW10ZDJwa3U2bzZjNXJnbjFydDc5Z2hsMmkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTMwNzA4MzY4NzQwNTY3NjUzMjkiLCJlbWFpbCI6ImVtYWlsdHVtYmFsMzNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5iZiI6MTcxODEzMDg5NCwibmFtZSI6InR1bWJhbCAxIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0pRanM2MFlMNFk1WFRnWDJVbUVjQzNhTHVWRFJYWFlvWkhBc0tOQ01mMnBGV0s4Zz1zOTYtYyIsImdpdmVuX25hbWUiOiJ0dW1iYWwiLCJmYW1pbHlfbmFtZSI6IjEiLCJpYXQiOjE3MTgxMzExOTQsImV4cCI6MTcxODEzNDc5NCwianRpIjoiYTMzNDFhNjRlZjExZGJlODVhMjQwY2U5MTMxMjRjZTVlZDQ3YmMyZCJ9.UNIpqkpg6ISOBEZZkJoPwh0tjboLSz2bZSUPCJJqdsw'

  constructor(
    private router: Router,
    private loginService: LoginService,
    private ngZone: NgZone,
    private util: CommonUtils,
    @Inject(LOCALE_ID) private locale: string,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadGoogleScript().then(() => {
        this.initializeGoogleSignIn();
        this.renderGoogleButton();
      }).catch(error => {
        console.error('Failed to load Google API:', error);
      });
    }
  }

  loadGoogleScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof google !== 'undefined') {
        resolve();
      } else {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = (error: any) => reject(error);
        document.head.appendChild(script);
      }
    });
  }

  initializeGoogleSignIn(): void {
    google.accounts.id.initialize({
      client_id: '304068169750-p6udcd9mtd2pku6o6c5rgn1rt79ghl2i.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this),
    });
  }

    handleCredentialResponse(response: any): void {
    const responsePayload = this.decodeJWTToken(response.credential);
    localStorage.setItem(ConstantaUtil.USER_PROFILE, this.util.encrypt(JSON.stringify(responsePayload)));
    localStorage.setItem('authToken', this.util.encrypt(JSON.stringify(responsePayload)));
    localStorage.setItem('accessToken', this.paramToken);
    console.log('data token google', JSON.stringify(responsePayload));
    console.log('data token google', responsePayload);

    // localStorage.setItem('authToken', JSON.stringify(responsePayload));
    // this.setSessionTimeout();
    this.ngZone.run(() => {
      this.router.navigate(['/dashboard']);
    });
  }

  renderGoogleButton(): void {
    google.accounts.id.renderButton(
      document.getElementById('customBtn'),
      { type: 'standard', theme: 'outline', text: 'Google', size: 'large', logo_alignment: 'left', width: '300px' }
    );
  }

  setSessionTimeout(): void {
    setTimeout(() => {
      localStorage.clear();
      this.ngZone.run(() => {
        this.router.navigate(['/authentication/login']);
      });
    }, 10000); // 10 seconds
  }

  decodeJWTToken(token: string): any {
    return JSON.parse(atob(token.split('.')[1]));
  }

  loginWithEmail(): void {
    this.loginService.loginWithCredentials(this.email, this.password).subscribe(
      res => {
        const jwtToken = res.token;
        localStorage.setItem('authToken', jwtToken);
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
