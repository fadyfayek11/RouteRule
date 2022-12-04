import { Injectable } from '@angular/core';
import { RuleModel } from '../Models/RuleModel';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvironmentService } from './shared/environment.service';
import { JWTTokenService } from './shared/jwt-token.service';

@Injectable({
  providedIn: 'root',
})
export class RulesService {
  baseUrl: string = '';
  rouetrRulesEndPoint: string = '';
  getRulesByPathEndPoint: string = '';

  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService,
    private jwtTokenService: JWTTokenService
  ) {
    this.baseUrl = environmentService.appConfig.apiBaseURL;
    this.rouetrRulesEndPoint =
      environmentService.appConfig.endpoints.routerRulesUrl;
    this.getRulesByPathEndPoint =
      environmentService.appConfig.endpoints.getRulesByPathUrl;
  }

  GetallRules(): Observable<RuleModel[]> {
    //const token = this.jwtTokenService.getToken();
    return this.http.get<RuleModel[]>(this.baseUrl + this.rouetrRulesEndPoint);
  }

  RemoveRule(ruleData: RuleModel) {
       //const token = this.jwtTokenService.getToken();
    const options = {
      body: ruleData,
    };
    return this.http.delete(this.baseUrl + this.rouetrRulesEndPoint, options);
  }

  CreateRule(ruleData: RuleModel) {
    //const token = this.jwtTokenService.getToken();
    return this.http.post(this.baseUrl + this.rouetrRulesEndPoint, ruleData);
  }

  UpdateRule(oldRule: RuleModel, newRule: RuleModel) {
    //const token = this.jwtTokenService.getToken();
    const params = new HttpParams()
      .set('name', oldRule.name)
      .set('pattern', oldRule.pattern)
      .set('url', oldRule.url);
    return this.http.put(this.baseUrl + this.rouetrRulesEndPoint, newRule, {
      params: params,
    });
  }

  GetRulesByPath(path: string): Observable<RuleModel[]> {
       //const token = this.jwtTokenService.getToken();
    const params = new HttpParams().set('configPath', path);
    return this.http.get<RuleModel[]>(
      this.baseUrl + this.getRulesByPathEndPoint,
      { params }
    );
  }
}
