import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RuleModel } from '../Models/RuleModel';

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
    return this.http.get<RuleModel>(this.apiUrl + '/' + name);
  }

  RemoveRulebyname(name: any) {
    return this.http.delete(this.apiUrl + '/' + name);
  }

  CreateRule(ruleData: any) {
    return this.http.post(this.apiUrl, ruleData);
  }

  UpdateRule(name: any, ruleData: any) {
    return this.http.put(this.apiUrl + '/' + name, ruleData);
  }
}
