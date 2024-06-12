import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, LOCALE_ID, NgZone, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/service/login.service';
import { CommonUtils } from 'src/app/shared/utils/commonUtil';
import { ConstantaUtil } from 'src/app/shared/utils/constantaUtil';


declare const google: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent {
  constructor(
    private router: Router,
    private loginService: LoginService,
    private ngZone: NgZone,
    private util: CommonUtils,
    @Inject(LOCALE_ID) private locale: string,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

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

  renderGoogleButton(): void {
    google.accounts.id.renderButton(
      document.getElementById('customBtn'),
      { type: 'standard', theme: 'outline', text: 'Google', size: 'large', logo_alignment: 'left', width: '300px' }
    );
  }

   handleCredentialResponse(response: any): void {
    const responsePayload = this.decodeJWTToken(response.credential);
    localStorage.setItem(ConstantaUtil.USER_PROFILE, this.util.encrypt(JSON.stringify(responsePayload)));
    localStorage.setItem('authToken', this.util.encrypt(JSON.stringify(responsePayload)));
    localStorage.setItem('authToken', JSON.stringify(responsePayload));
    // this.setSessionTimeout();
    this.ngZone.run(() => {
      this.router.navigate(['/dashboard']);
    });
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

  get f() {
    return this.form.controls;
  }

  submit() {
    // console.log(this.form.value);
    this.router.navigate(['/dashboard']);
  }
}
