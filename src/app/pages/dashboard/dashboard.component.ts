import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Reports } from '../../model/employee';
import { MatPaginator } from '@angular/material/paginator';
import { EmpFilter, filterOption } from '../../model/empfilter';
import { MatSelectChange } from '@angular/material/select';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Reports', 'Aging'];
  displayedColumns2: string[] = ['Id', 'User Name', 'Aging'];

  reportData: Reports[] = [
    { "Id": 1, "Reports": 1011, "Aging": "30 days" },
    { "Id": 2, "Reports": 1012, "Aging": "60 days" },
    { "Id": 3, "Reports": 1012, "Aging": "60 days" },
    { "Id": 4, "Reports": 1012, "Aging": "60 days" },
    { "Id": 5, "Reports": 1012, "Aging": "60 days" },
    { "Id": 6, "Reports": 1012, "Aging": "60 days" },
    { "Id": 7, "Reports": 1012, "Aging": "60 days" },
    { "Id": 8, "Reports": 1012, "Aging": "60 days" },
    { "Id": 9, "Reports": 1012, "Aging": "60 days" },
    { "Id": 10, "Reports": 1012, "Aging": "60 days" }
  ];

  reportData2: Reports[] = [
    { "Id": 1, "User Name": "Adam", "Aging": "30 days" },
    { "Id": 2, "User Name": "Roozen", "Aging": "45 days" },
    { "Id": 3, "User Name": "Judy", "Aging": "45 days" },
    { "Id": 4, "User Name": "Michael", "Aging": "45 days" },
    { "Id": 5, "User Name": "Adrian", "Aging": "60 days" },
    { "Id": 6, "User Name": "Alfred Henry", "Aging": "60 days" },
    { "Id": 7, "User Name": "Vu Ha", "Aging": "60 days" },
    { "Id": 8, "User Name": "Paul", "Aging": "90 days" },
    { "Id": 9, "User Name": "Bill", "Aging": "90 days" },
    { "Id": 10, "User Name": "Mary", "Aging": "90 days" }];

  reportData3: Reports[] = [
    { "Id": 1, "Reports": 1011, "Aging": "Daily" },
    { "Id": 2, "Reports": 1012, "Aging": "Weekly" },
    { "Id": 3, "Reports": 1012, "Aging": "Monthly" },
    { "Id": 4, "Reports": 1012, "Aging": "Quaterly" },
    { "Id": 5, "Reports": 1012, "Aging": "Yearly" },
    { "Id": 6, "Reports": 1012, "Aging": "Yearly" },
    { "Id": 7, "Reports": 1012, "Aging": "Yearly" },
    { "Id": 8, "Reports": 1012, "Aging": "Yearly" },
    { "Id": 9, "Reports": 1012, "Aging": "Yearly" },
    { "Id": 10, "Reports": 1012, "Aging": "Yearly" }
  ];

  dataSource = new MatTableDataSource(this.reportData);
  dataSource2 = new MatTableDataSource(this.reportData2);
  dataSource3 = new MatTableDataSource(this.reportData3);
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginator2') paginator2!: MatPaginator;
  @ViewChild('paginator3') paginator3!: MatPaginator;

  constructor() { }

  pageSizes1 = [5, 10];
  pageSizes2 = [5, 10];
  pageSizes3 = [5, 10];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource2.paginator = this.paginator2;
    this.dataSource3.paginator = this.paginator3;
  }

  ngOnInit(): void { }
}
