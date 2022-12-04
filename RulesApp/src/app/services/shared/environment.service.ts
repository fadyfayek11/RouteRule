import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../Models/configuration/enviornment.model';

@Injectable()
export class EnvironmentService {
  public appConfig!: environment;

  constructor(private http: HttpClient) { }

  loadAppConfig() {
    return this.http.get('/assets/appsettings.json').toPromise().then(data => {
      this.appConfig = data as environment;
    });
  }

}
