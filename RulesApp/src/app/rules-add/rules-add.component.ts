import { Component, Inject, OnInit } from '@angular/core';
import { apiService } from '../shared/apiService.service';
import * as alertify from 'alertifyjs';
import { RuleModel } from '../Models/RuleModel';
import { forbiddenNameValidator } from '../shared/forbidden-name.directive';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forbiddenPatternValidator } from '../shared/forbidden-pattern.directive copy';

@Component({
  selector: 'app-rules-add',
  templateUrl: './rules-add.component.html',
  styleUrls: ['./rules-add.component.css'],
})
export class RulesAddComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private dialog: MatDialog,
    private api: apiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  regexs: string[] = [];
  patterns: string[] = [];
  names: string[] = [];
  repeatedPattern: boolean = false;

  ngOnInit(): void {
    this.LoadRegex();
    this.LoadPatterns_names();
    // console.log(this.data)
    // console.log(this.patterns)
    // console.log(this.names);
  }

  NameControl = new FormControl('', [
    Validators.required,
    forbiddenNameValidator(this.names),
  ]);
  regexControl = new FormControl('', Validators.required);
  prefixControl = new FormControl('', Validators.required);
  hiddenChecker = new FormControl('',forbiddenPatternValidator(this.patterns))
  urlControl = new FormControl('', Validators.required);

  ruleForm = this.builder.group({
    name: this.NameControl,
    prefix: this.prefixControl,
    regex: this.regexControl,
    patternChecker :this.hiddenChecker,
    url: this.urlControl,
    // isactive: this.builder.control(true),
  });

  SaveRule() {
    if (this.ruleForm.valid) {
      let newRule: RuleModel = {
        name: this.ruleForm.get('name')?.value!,
        pattern:
          '(.*)' +
          '(couponNumber=' +
          this.ruleForm.get('prefix')?.value! +
          ')' +
          this.ruleForm.get('regex')?.value! +
          '(.*)',
        url: this.ruleForm.get('url')?.value!,
      };
      //console.log(newRule);

      this.api.CreateRule(newRule).subscribe(
        (response) => {
          alertify.success('Rule created succesfully');
        },
        (error) => {
          alertify.warning('Creation failed');
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
    this.data.allRules.map((element: RuleModel) => {
      this.patterns.push(element.pattern);
    });

    this.data.allRules.map((element: RuleModel) => {
      this.names.push(element.name);
    });
  }

    checkPatternUniqueness(event :any) {
    let inputPattern =
      '(.*)' +
      '(couponNumber=' +
      this.ruleForm.get('prefix')?.value! +
      ')' +
      this.ruleForm.get('regex')?.value! +
      '(.*)';

     // console.log(inputPattern)
      this.ruleForm.patchValue({patternChecker:inputPattern})
  }
}

