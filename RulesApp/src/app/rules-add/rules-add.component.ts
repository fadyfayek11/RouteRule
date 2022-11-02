import { Component, Inject, OnInit } from '@angular/core';
import { apiService } from '../shared/apiService.service';
import * as alertify from 'alertifyjs';
import { RuleModel } from '../Models/RuleModel';
import { forbiddenPrefixValidator } from '../shared/forbidden-name.directive';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';


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
  prefixes: string[] = [];
  names:string[]=[]

  ngOnInit(): void {
    this.LoadRegex();
    this.LoadPrefixes_names();
    //console.log(this.data)
    //console.log(this.prefixes)
    //console.log(this.names);
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

  LoadPrefixes_names() {
    this.data.allRules.filteredData.map((element: RuleModel) => {
      this.prefixes.push(element.pattern?.substring(18, 21));
    });

    this.data.allRules.filteredData.map((element: RuleModel) => {
      this.names.push(element.name);
    });
  }
}
