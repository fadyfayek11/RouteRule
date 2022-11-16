import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { apiService } from '../../shared/services/apiService.service';
import * as alertify from 'alertifyjs';
import { MatTableDataSource } from '@angular/material/table';
import { ArchiveModel } from '../../Models/ArchiveModel';
import { ArchiveDetailsComponent } from '../archive-details/archive-details.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';

const ELEMENT_DATA: ArchiveModel[] = [];

@Component({
  selector: 'app-archive-history',
  templateUrl: './archive-history.component.html',
  styleUrls: ['./archive-history.component.css'],
})
export class ArchiveHistoryComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private api: apiService,
    private _router: Router,
    private _liveannouncer :LiveAnnouncer
  ) {}
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;

  displayedColCumns: string[] = ['name', 'action', 'date', 'others'];
  dataSource = ELEMENT_DATA;
  finalData: any;
  MainSites: any[] = [];

  ngOnInit(): void {
    this.LoadArchives();
  }

  openDetailsPopup(path: string) {
    const _popup = this.dialog.open(ArchiveDetailsComponent, {
      width: '850px',
      height: '550px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        configPath: path,
      },
    });
    _popup.afterClosed().subscribe((res) => {
      this.LoadArchives();
    });
  }

  LoadArchives() {
    this.api.GetArchives().subscribe((response) => {
      this.dataSource = response.map((obj: ArchiveModel) => ({
        ruleName: obj.ruleName,
        action: obj.action,
        date: obj.date,
        configPath: obj.configPath,
      }));
      this.finalData = new MatTableDataSource<ArchiveModel>(this.dataSource);
      this.finalData.paginator = this._paginator;
      this.finalData.sort = this._sort;
      this.finalData.sortingDataAccessor = (item:any , property:any) => {
        switch (property) {
          case 'date': return new Date(item.date);
          default: return item[property];
        }
      };
    });
  }

  getDetails(archive: any) {
    this.openDetailsPopup(archive);
  }

  returnHomeSite() {
    this._router.navigateByUrl('list');
  }

  rollBack(path: string) {
    alertify.confirm(
      'Roll back a previous versioin',
      'Are you sure you want to Roll back to this version ?',
      () => {
        this.api.RollBack(path).subscribe(
          (res) => {
            alertify.success('Rolled back succesfully');
            this._router.navigateByUrl('list');
          },
          (error) => {
            alertify.warning('Rolling back failed');
          }
        );
      },
      function () {}
    );
  }

}
