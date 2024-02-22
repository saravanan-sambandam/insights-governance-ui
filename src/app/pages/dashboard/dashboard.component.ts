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
  displayedColumns: string[] = ['id', 'Reports', 'Aging'];

  reportData: Reports[] = [
    {
      id: 1,
      Reports: 1011,
      Aging: '30 days',
    },
    {
      id: 2,
      Reports: 1012,
      Aging: '60 days',
    },
    {
      id: 3,
      Reports: 1012,
      Aging: '60 days',
    },
    {
      id: 4,
      Reports: 1012,
      Aging: '60 days',
    },
    {
      id: 5,
      Reports: 1012,
      Aging: '60 days',
    },
    {
      id: 6,
      Reports: 1012,
      Aging: '60 days',
    },
    {
      id: 7,
      Reports: 1012,
      Aging: '60 days',
    },
    {
      id: 8,
      Reports: 1012,
      Aging: '60 days',
    },
    {
      id: 9,
      Reports: 1012,
      Aging: '60 days',
    },
    {
      id: 10,
      Reports: 1012,
      Aging: '60 days',
    },
  ];

  dataSource = new MatTableDataSource(this.reportData);
  dataSource2 = new MatTableDataSource(this.reportData);
  dataSource3 = new MatTableDataSource(this.reportData);
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginator2') paginator2!: MatPaginator;
  @ViewChild('paginator3') paginator3!: MatPaginator;

  constructor() {}

  pageSizes1 = [5, 10];
  pageSizes2 = [5, 10];
  pageSizes3 = [5, 10];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource2.paginator = this.paginator2;
    this.dataSource3.paginator = this.paginator3;
  }

  openExcel() {
    window.open(
      'https://ascendionhub.sharepoint.com/:x:/s/CES-FullStackAnalyticsCircle/Eb_mVypYF31Kp1X4pnvX_swBZerLDShbVG17wlvW56H1Ng?e=iZwkMX&wdOrigin=TEAMS-WEB.p2p_ns.rwc&wdExp=TEAMS-TREATMENT&wdhostclicktime=1708575004668&web=1'
    );
  }
  ngOnInit(): void {}
}
