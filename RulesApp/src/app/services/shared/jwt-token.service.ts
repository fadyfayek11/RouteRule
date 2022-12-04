import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class JWTTokenService {
  jwtToken?: string = localStorage.getItem('token') ?? '';
  decodedToken?: { [key: string]: string };

  constructor() {}

  setToken(token: string) {
    if (token) {
      this.jwtToken = token;
    }
  }
  getToken() {
    if (this.jwtToken !== '' && this.jwtToken !== null && this.jwtToken !== 'undefined') return this.jwtToken;
    else return localStorage.getItem('token') ?? '';
  }
  removeToken() {
    this.jwtToken = '';
    this.decodedToken = {};
    localStorage.removeItem('token');
  }

  decodeToken() {
    if (this.jwtToken) {
      this.decodedToken = jwt_decode(this.jwtToken);
    }
  }
  getDecodeToken() {
    return jwt_decode(this.jwtToken!);
  }

  // getDecodedToken(token: string): any {
  //   try {
  //     if(token)
  //     {
  //       return jwt_decode(token);
  //     }
  //   } catch(Error) {
  //     return null;
  //   }
  // }

  getEmail() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken?.['Email'] : null;
  }
  getFullName() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken?.['FullName'] : null;
  }
  getModileNumber() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken?.['MobileNo'] : null;
  }
  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken?.['exp'] : null;
  }

  isTokenExpired(): boolean {
    if (this.getExpiryTime() == null) return false;
    const expiryTime: any = this.getExpiryTime();
    if (expiryTime) {
      return 1000 * expiryTime - new Date().getTime() < 5000;
    } else {
      return false;
    }
  }
}
