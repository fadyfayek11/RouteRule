import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ɵInjectableAnimationEngine } from '@angular/platform-browser/animations';
import { apiService } from '../shared/apiService.service';
import * as alertify from 'alertifyjs'

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

regex :any[] = []

ngOnInit(): void {
  }

  ruleForm = this.builder.group({
    name: this.builder.control('', Validators.required),
    pattern: this.builder.control('', Validators.required),
    url: this.builder.control('', Validators.required),
    // isactive: this.builder.control(true),
  });

  SaveRule() {
    if (this.ruleForm.valid) {
      this.api.CreateRule(this.ruleForm.value).subscribe((response) => {
        alertify.success('Rule created succesfully');
      },(error) => {
        alertify.warning('Creation failed');
      });
      this.closepopup();
    }
  }
  closepopup() {
    this.dialog.closeAll();
  }
}
