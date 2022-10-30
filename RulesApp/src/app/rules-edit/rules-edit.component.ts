import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { apiService } from '../shared/apiService.service';
import * as alertify from 'alertifyjs';

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
this.LoadRegex()

  }

  ruleForm = this.builder.group({
    name: this.builder.control('', Validators.required),
    pattern: this.builder.control('', Validators.required),
    url: this.builder.control('', Validators.required),
    // isactive: this.builder.control(true),
  });

  SaveRule() {
    // if (this.ruleForm.valid) {
    //   this.api.CreateRule(this.ruleForm.value).subscribe(
    //     (response) => {
    //       alertify.success('Rule updated succesfully');
    //     },
    //     (error) => {
    //       alertify.warning('Update failed');
    //     }
    //   );
    //   this.closepopup();
    // }
  }
  closepopup() {
    this.dialog.closeAll();
  }

  LoadRegex()
  {
    this.api.GetRegex().subscribe((res)=>{this.regex=res})
  }
}
