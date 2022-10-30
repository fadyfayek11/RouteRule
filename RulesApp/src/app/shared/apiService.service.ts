import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { RuleModel } from '../Models/RuleModel';
import { RuleUsedModel } from '../Models/RuleUsedModel';
import { map } from 'rxjs';
import * as e from 'cors';

@Injectable({
  providedIn: 'root',
})
export class apiService {
  constructor(private http: HttpClient) {}
  apiUrl = 'https://localhost:7046/Api/Rules';
  regexUrl = 'https://localhost:7046/Api/Rules/Regex';
  sitesUrl = 'https://localhost:7046/Api/Rules/RouteApps';
  pathUrl = 'https://localhost:7046/Api/Rules/ConfigFilePath'

  GetallRules(): Observable<RuleModel[]> {
    return this.http.get<RuleModel[]>(this.apiUrl);
  }

  GetRulebyName(name: any): Observable<RuleModel> {
    return this.http.get<RuleModel>(this.apiUrl + '/' + name);
  }

  RemoveRule(ruleData: RuleModel) {
    const options = {
      body: ruleData,
    };

    return this.http.delete(this.apiUrl, options);
  }

  CreateRule(ruleData: RuleModel) {
    return this.http.post(this.apiUrl, ruleData);
  }

  UpdateRule(name: any, ruleData: any) {
    return this.http.put(this.apiUrl + '/' + name, ruleData);
  }

  GetRegex(): Observable<string[]> {
    return this.http.get<string[]>(this.regexUrl);
  }

  GetMainSites():Observable<any[]>
  {
    return this.http.get<any[]>(this.sitesUrl);
  }

  FilePathSet(site :string)
  {
    const params = new HttpParams()
    .set('filePath',site)

    return this.http.post(this.pathUrl,'',{'params': params})
  }
}
