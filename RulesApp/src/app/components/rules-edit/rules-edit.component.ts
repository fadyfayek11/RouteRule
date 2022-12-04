import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forbiddenNameValidator } from '../../utils/validators/forbidden-name.directive';
import { apiService } from '../../services/shared/apiService.service';
import * as alertify from 'alertifyjs';
import { RuleModel } from '../../Models/RuleModel';
import { forbiddenPatternValidator } from '../../utils/validators/forbidden-pattern.directive copy';

@Component({
  selector: 'app-rules-edit',
  templateUrl: './rules-edit.component.html',
  styleUrls: ['./rules-edit.component.css'],
})
export class RulesEditComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private dialog: MatDialog,
    private api: apiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  regexs: string[] = [];
  patterns: string[] = [];
  names: string[] = [];

  ngOnInit(): void {
    this.LoadRegex();
    this.LoadPatterns_names();
    //console.log(this.patterns);
    //console.log(this.names);
    this.ruleForm.get('name')?.setValue(this.data.oldRule.name);
    this.ruleForm.get('pattern')?.setValue(this.data.oldRule.pattern);
    this.ruleForm.get('url')?.setValue(this.data.oldRule.url);
  }

  NameControl = new FormControl('', [
    Validators.required,
    forbiddenNameValidator(this.names),
  ]);
  patternControl = new FormControl('', [
    Validators.required,
    forbiddenPatternValidator(this.patterns),
  ]);
  urlControl = new FormControl('', Validators.required);

  ruleForm = this.builder.group({
    name: this.NameControl,
    pattern: this.patternControl,
    url: this.urlControl,
    // isactive: this.builder.control(true),
  });

  SaveRule() {
    if (this.ruleForm.valid) {
      let newRule: RuleModel = {
        name: this.ruleForm.get('name')?.value!,
        pattern: this.ruleForm.get('pattern')?.value!,
        url: this.ruleForm.get('url')?.value!,
      };

      //console.log(newRule);

      this.api.UpdateRule(this.data.oldRule, newRule).subscribe(
        (response) => {
          alertify.success('Rule updated succesfully');
        },
        (error) => {
          alertify.warning('update failed');
        }
      );

      this.closepopup();
    }
  }

  closepopup() {
    this.dialog.closeAll();
  }

  LoadRegex() {
    this.api.GetRegex().subscribe((res) => {
      this.regexs = res;
    });
  }

  LoadPatterns_names() {
    this.data.allRules
      .filter((r: RuleModel) => {
        return r.name != this.data.oldRule.name;
      })
      .map((element: RuleModel) => {
        this.patterns.push(element.pattern);
      });

    this.data.allRules
      .filter((r: RuleModel) => {
        return r.name != this.data.oldRule.name;
      })
      .map((element: RuleModel) => {
        this.names.push(element.name);
      });
  }
}
