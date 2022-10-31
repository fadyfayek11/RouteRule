import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ɵInjectableAnimationEngine } from '@angular/platform-browser/animations';
import { apiService } from '../shared/apiService.service';
import * as alertify from 'alertifyjs';
import { RuleModel } from '../Models/RuleModel';
import { formatDate } from '@angular/common';
import { concat, elementAt } from 'rxjs';
import { forbiddenPrefixValidator } from '../shared/forbidden-prefix.directive';

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
  formData = new FormData();
  prefixes: string[] = [];

  ngOnInit(): void {
    this.LoadRegex();
    this.LoadPrefixes();
    //console.log(this.data)
    console.log(this.prefixes);
  }

  prefixControl = new FormControl('', [
    Validators.required,
    forbiddenPrefixValidator(this.prefixes),
  ]);
  regexControl = new FormControl('', Validators.required);

  ruleForm = this.builder.group({
    name: this.builder.control('', Validators.required),
    prefix: this.prefixControl,
    regex: this.regexControl,
    url: this.builder.control('', Validators.required),
    // isactive: this.builder.control(true),
  });

  SaveRule() {
    if (this.ruleForm.valid) {
      let newRule: RuleModel = {
        name: this.ruleForm.get('name')?.value!,
        pattern: this.ruleForm
          .get('prefix')
          ?.value?.concat('', this.ruleForm.get('regex')?.value!)!,
        url: this.ruleForm.get('url')?.value!,
      };
      console.log(newRule);

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

  LoadPrefixes() {
    this.data.allRules.filteredData.map((element: RuleModel) => {
      this.prefixes.push(element.pattern?.substring(18, 21));
    });
  }

  checkPrefix() {}
}
