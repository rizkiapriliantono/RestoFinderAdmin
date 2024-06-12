import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  // Implementasikan logika ini sesuai kebutuhan Anda
  isLoggedIn(): boolean {
    // Misalnya, periksa token di localStorage
    return !!localStorage.getItem('authToken');
  }

  // Tambahkan metode untuk login dan logout jika diperlukan
  login(token: string): void {
    localStorage.setItem('authToken', token);
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }
}
