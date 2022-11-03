import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RuleModel } from '../Models/RuleModel';
import { MatTableDataSource } from '@angular/material/table';
import { RulesAddComponent } from '../rules-add/rules-add.component';
import { apiService } from '../shared/apiService.service';
import { RulesEditComponent } from '../rules-edit/rules-edit.component';
import * as alertify from 'alertifyjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { SiteModel } from '../Models/SiteModel';

const ELEMENT_DATA: RuleModel[] = [];

@Component({
  selector: 'app-rules-list',
  templateUrl: './rules-list.component.html',
  styleUrls: ['./rules-list.component.css'],
})
export class RulesListComponent implements OnInit {
  constructor(private dialog: MatDialog, private api: apiService,private _router:Router) {}
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;

  displayedColCumns: string[] = ['name', 'url', 'action'];
  dataSource = ELEMENT_DATA;
  finalData: any;
  MainSites: SiteModel[] = [];

  ngOnInit(): void {
    this.LoadRules();
    this.LoadMainSites();
    //console.log(this.MainSites)
  }

  openAddPopup() {
    const _popup = this.dialog.open(RulesAddComponent, {
      width: '600px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        allRules: this.dataSource
      },
    });
    _popup.afterClosed().subscribe((res) => {
      this.LoadRules();
    });
  }

  openEditPopup(rule: RuleModel) {
    const _popup = this.dialog.open(RulesEditComponent, {
      width: '600px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        allRules: this.dataSource,
        oldRule:rule
      },
    });
    _popup.afterClosed().subscribe((res) => {
      this.LoadRules();
    });
  }

  LoadPartenerRules(name: string,configPath : string,folderPath:string) {
    //console.log(path)
    this.api.FilePathSet(name,configPath,folderPath).subscribe(
      (res) => {
        this.LoadRules();
      },
      (res) => {
        alertify.warning('Site not available');
      }
    );
  }

  LoadRules() {
    this.api.GetallRules().subscribe((response) => {
      this.dataSource = response.map((obj: RuleModel) => ({
        name: obj.name,
        pattern: obj.pattern,
        url: obj.url.slice(0, -6),
      }));
      this.finalData = new MatTableDataSource<RuleModel>(this.dataSource);
      this.finalData.paginator = this._paginator;
      this.finalData.sort = this._sort;
    });
  }

  editRule(rule :any) {
    this.openEditPopup(rule);
  }

  removeRule(rule: RuleModel) {
    alertify.confirm(
      'Remove Rule',
      'Are you sure you want to remove this rule ?',
      () => {
        //console.log(rule);
        this.api.RemoveRule(rule).subscribe(
          (res) => {
            alertify.success('Rule deleted succesfully');
            this.LoadRules();
          },
          (error) => {
            alertify.warning('Deletion failed');
          }
        );
      },
      function () {}
    );
  }

  LoadMainSites() {
    this.api.GetMainSites().subscribe((res) => {
      this.MainSites = res;
    });
  }


  displayHistory()
  {
    this._router.navigateByUrl('History')
  }
}
