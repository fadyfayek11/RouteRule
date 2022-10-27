import { HttpClient } from '@angular/common/http';
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

  GetallRules(): Observable<RuleModel[]> {

    return this.http.get<RuleModel[]>(this.apiUrl);
 }

  GetRulebyName(name: any): Observable<RuleModel> {
     return this.http.get<RuleModel>(this.apiUrl + '/' + name)
  }

  RemoveRule(ruleData: any) {
    return this.http.delete(this.apiUrl, ruleData);
  }

  CreateRule(ruleData: any) {
    return this.http.post(this.apiUrl, ruleData);
  }

  UpdateRule(name: any, ruleData: any) {
    return this.http.put(this.apiUrl + '/' + name, ruleData);
  }
}
