import { Injectable, NgZone } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private ngZone: NgZone) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      // Navigasi harus dilakukan di dalam NgZone
      this.ngZone.run(() => {
        this.router.navigate(['/authentication/login']);
      });
      return false;
    }
  }
}
