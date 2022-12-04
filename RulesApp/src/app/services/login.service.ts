// import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { UserLoginResponseDto } from '../../models/User/Response/UserLoginResponseDto';
// import { ResponseResultDto } from '../../models/base';
// import { UserForLoginAuthenticationDto } from '../../models/User/UserForLoginAuthenticationDto';
// import { HttpServices } from './shared/custom-http-services';
// import { EnvironmentService } from './shared/environment.service';
// import { JWTTokenService } from './shared/jwt-token.service';

// @Injectable({ providedIn: 'root' })
// export class LoginService {
//   baseUrl: string = '';
//   loginEndPoint: string = '';
//   public isLoggedInSubject?: BehaviorSubject<boolean>;
//   public isLoggedIn?: Observable<boolean>;
//   constructor(
//     private customHttpService: HttpServices,
//     private environmentService: EnvironmentService,
//     private jwtTokenService:  JWTTokenService
//   ) {
//     this.baseUrl = this.environmentService.appConfig.apiBaseURL;
//     this.loginEndPoint = this.environmentService.appConfig.endpoints.login;
//     if (localStorage.getItem('token')) {
//       this.isLoggedInSubject = new BehaviorSubject<boolean>(true);
//       this.isLoggedIn = this.isLoggedInSubject?.asObservable();
//     } else {
//       this.isLoggedInSubject = new BehaviorSubject<boolean>(false)!;
//       this.isLoggedIn = this.isLoggedInSubject.asObservable()!;
//     }
//   }

//   Login(
//     body: UserForLoginAuthenticationDto
//   ): Observable<ResponseResultDto<UserLoginResponseDto>> {
//     return this.customHttpService.post<ResponseResultDto<UserLoginResponseDto>>(
//       this.baseUrl + this.loginEndPoint,
//       body
//     );
//   }
//   SetToken(token: string) {
//     localStorage.setItem('token', token);
//     this.jwtTokenService.setToken(token)
//     this.isLoggedInSubject?.next(true);
//   }
// }
