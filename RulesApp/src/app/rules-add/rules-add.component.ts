import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ɵInjectableAnimationEngine } from '@angular/platform-browser/animations';
import { apiService } from '../shared/apiService.service';
import * as alertify from 'alertifyjs';
import { RuleModel } from '../Models/RuleModel';
import { formatDate } from '@angular/common';
import { concat } from 'rxjs';

@Component({
  selector: 'app-rules-add',
  templateUrl: './rules-add.component.html',
  styleUrls: ['./rules-add.component.css'],
})
export class RulesAddComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private dialog: MatDialog,
    private api: apiService
  ) {}

  //regexControl = new FormControl<string | null>(null, Validators.required);
  //selectFormControl = new FormControl('', Validators.required);
  regex: string[] = [];
  formData = new FormData();

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
      // this.formData.append("name",this.ruleForm.get("name").value);
      // this.formData.append("prefix", this.ruleForm.get('name')?.value);
      // this.formData.append("regex", this.ruleForm.get('name')?.value);
      // this.formData.append('url', this.ruleForm.get('name')?.value);

      let newRule:RuleModel = {
        name : this.ruleForm.get("name")?.value!,
        pattern : this.ruleForm.get("prefix")?.value?.concat('',this.ruleForm.get('regex')?.value!)!,
        url :this.ruleForm.get("url")?.value!
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
