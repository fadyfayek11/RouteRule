export interface environment {

  apiBaseURL: string;
  endpoints: endpoints;
}

export interface endpoints {
  routerRulesUrl:string;
  getRegexUrl:string;
  getsWebitesUrl:string;
  getApppathUrl:string;
  loginUrl:string;
  getArchivesUrl:string;
  getRulesByPathUrl:string;
  rollBackUrl:string;
}
