import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RuleModel } from '../../Models/RuleModel';
import { apiService } from '../../shared/services/apiService.service';



const ELEMENT_DATA: RuleModel[] = [];



@Component({
  selector: 'app-archive-details',
  templateUrl: './archive-details.component.html',
  styleUrls: ['./archive-details.component.css']
})
export class ArchiveDetailsComponent implements OnInit {

  constructor(private dialog: MatDialog, private api: apiService,private _router:Router,@Inject(MAT_DIALOG_DATA) public data: any) {}
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;

  displayedColCumns: string[] = ['name', 'url','pattern'];
  dataSource = ELEMENT_DATA;
  finalData: any;
  MainSites: any[] = [];

  ngOnInit(): void {
    this.LoadRules(this.data.configPath);
  }


  LoadRules(path:string) {
    this.api.GetRulesByPath(path).subscribe((response) => {
      this.dataSource = response.map((obj: RuleModel) => ({
        name: obj.name,
        pattern: obj.pattern,
        url: obj.url.slice(0, -6),
      }));
      this.finalData = new MatTableDataSource<RuleModel>(this.dataSource);
      this.finalData.sort = this._sort;
    });
  }

  displayHistory()
  {
    this._router.navigateByUrl('History')
  }


  closepopup() {
    this.dialog.closeAll();
  }

}
