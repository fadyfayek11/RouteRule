// import { Injectable } from '@angular/core';
// import { RuleModel } from '../../Models/RuleModel';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Login } from '../../Models/LoginModel';
// import { ArchiveModel } from '../../Models/ArchiveModel';
// import { SiteModel } from '../../Models/SiteModel';

// @Injectable({
//   providedIn: 'root',
// })
// export class apiService {
//   constructor(private http: HttpClient) {}

//   apiUrl = 'https://localhost:7046/Api/Rules';
//   regexUrl = 'https://localhost:7046/Api/Rules/Regex';
//   sitesUrl = 'https://localhost:7046/Api/Rules/RouteApps';
//   pathUrl = 'https://localhost:7046/Api/Rules/ApplicationPath';
//   loginUrl = 'https://localhost:7046/Api/Rules/Login';
//   archiveUrl = 'https://localhost:7046/Api/Rules/Archives';
//   rulesbypathUrl = 'https://localhost:7046/Api/Rules/Rules';
//   rollbackUrl = 'https://localhost:7046/Api/Rules/RollBack';




//   GetMainSites(): Observable<SiteModel[]> {
//     return this.http.get<SiteModel[]>(this.sitesUrl);
//   }

//   FilePathSet(siteName: string, ConfigFilePath: string, folderPath: string) {
//     //const params = new HttpParams().set('filePath', site);

//     let body = {
//       name: siteName,
//       configurationFilePath: ConfigFilePath,
//       folderPath: folderPath,
//     };

//     return this.http.post(this.pathUrl, body);
//   }

//   Login(user: Login): Observable<any> {
//     return this.http.post(this.loginUrl, user);
//   }

//   GetArchives(): Observable<ArchiveModel[]> {
//     return this.http.get<ArchiveModel[]>(this.archiveUrl);
//   }



//   RollBack(path: string) {
//     const params = new HttpParams().set('archivePath', path);

//      return this.http.post(this.rollbackUrl,'',{params});
//   }
// }
