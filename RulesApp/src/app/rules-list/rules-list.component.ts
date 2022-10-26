import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { RuleModel } from '../Models/RuleModel';
import { MatTableDataSource } from '@angular/material/table';
import { RulesAddComponent } from '../rules-add/rules-add.component';
import { apiService } from '../shared/apiService.service';
import { RulesEditComponent } from '../rules-edit/rules-edit.component';
import * as alertify from 'alertifyjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

const ELEMENT_DATA: RuleModel[] = [];

@Component({
  selector: 'app-rules-list',
  templateUrl: './rules-list.component.html',
  styleUrls: ['./rules-list.component.css'],
})
export class RulesListComponent implements OnInit {
  constructor(private dialog: MatDialog, private api: apiService) {}
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;

  displayedColCumns: string[] = ['name', 'url', 'action'];
  dataSource = ELEMENT_DATA;
  finalData: any;

  ngOnInit(): void {
    this.LoadCompany();
  }

  openAddPopup() {
    const _popup = this.dialog.open(RulesAddComponent, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
    });
    _popup.afterClosed().subscribe((res) => {
      this.LoadCompany();
    });
  }

  openEditPopup(name: any) {
    const _popup = this.dialog.open(RulesEditComponent, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        name: name,
      },
    });

    _popup.afterClosed().subscribe((res) => {
      this.LoadCompany();
    });
  }

  LoadCompany() {
    this.api.GetallRules().subscribe((response) => {
      this.dataSource = response;
      this.finalData = new MatTableDataSource<RuleModel>(this.dataSource);
      this.finalData.paginator = this._paginator;
      this.finalData.sort = this._sort;
    });
  }

  editRule(name: any) {
    this.openEditPopup(name);
  }

  removeRule(name: any) {
    alertify.confirm(
      'Remove Rule',
      'Are you sure you want to remove this rule ?',
      () => {
        this.api.RemoveRulebyname(name).subscribe((res) => {
          this.LoadCompany();
        });
      },
      function () {}
    );
  }
}
