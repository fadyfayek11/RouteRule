import { RuleModel } from './RuleModel';

export class RuleUsedModel {
  constructor(public model: RuleModel) {}

  get newRule(): RuleModel {
    return {
      name: this.model.name,
      pattern: this.model.pattern,
      url: this.model.url.slice(0,-6)
    };
  }
}
