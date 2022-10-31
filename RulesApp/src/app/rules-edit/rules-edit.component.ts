import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forbiddenPrefixValidator } from '../shared/forbidden-prefix.directive';
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

  regex: string[] = [];

  ngOnInit(): void {
    this.LoadRegex();
  }

  ruleForm = this.builder.group({
    name: this.builder.control('', Validators.required),
    prefix: this.builder.control('', Validators.required),
    regex: this.builder.control('', Validators.required),
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
      this.regex = res;
    });
  }
}
