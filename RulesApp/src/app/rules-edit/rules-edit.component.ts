import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forbiddenPrefixValidator } from '../shared/forbidden-name.directive';
import { apiService } from '../shared/apiService.service';
import * as alertify from 'alertifyjs';
import { RuleModel } from '../Models/RuleModel';

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
  prefixes: string[] = [];

  ngOnInit(): void {
    this.LoadRegex();
    this.LoadPrefixes();
    console.log(this.prefixes);
    console.log(this.data.oldRule);
    this.ruleForm.get('name')?.setValue(this.data.oldRule.name);
    this.ruleForm.get('url')?.setValue(this.data.oldRule.url);
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
        pattern:"(.*)"+"(couponNumber="+this.ruleForm
          .get('prefix')?.value!+")"+this.ruleForm.get('regex')?.value!+"(.*)",
        url: this.ruleForm.get('url')?.value!,
      };

      //console.log(newRule);

       this.api.UpdateRule(this.data.oldRule,newRule).subscribe(
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

  LoadPrefixes() {
    this.data.allRules.filteredData.map((element: RuleModel) => {
      this.prefixes.push(element.pattern?.substring(18, 21));
    });
  }
}
