import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Reports, ReportsListing } from '../../model/employee';
import { MatPaginator } from '@angular/material/paginator';
import { EmpFilter, filterOption } from '../../model/empfilter';
import { MatSelectChange } from '@angular/material/select';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-report-listing',
  templateUrl: './report-listing.component.html',
  styleUrls: ['./report-listing.component.scss']
})

export class ReportListingComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Report Name', "Report Link"];

  reportData: ReportsListing[] = [
    { "Id": 1, "Report Name": "Insights Governance Project Tracker", "Report Link": "https://ascendionhub.sharepoint.com/:x:/s/CES-FullStackAnalyticsCircle/Eb_mVypYF31Kp1X4pnvX_swBZerLDShbVG17wlvW56H1Ng?e=iZwkMX&wdOrigin=TEAMS-WEB.p2p_ns.rwc&wdExp=TEAMS-TREATMENT&wdhostclicktime=1708575004668&web=1" },
    { "Id": 2, "Report Name": "Holiday Calendar 2024", "Report Link": "https://ascendionhub.sharepoint.com/sites/hr-hub-india/SitePages/ASC%20Corporate%20Holidays.aspx" },
    { "Id": 3, "Report Name": "Ascendion_Handbook---Final.pdf", "Report Link": "https://ascendionhub.sharepoint.com/Shared%20Documents/Ascendion_Handbook---Final.pdf" },
    { "Id": 4, "Report Name": "Ascendion_Handbook---Final.pdf", "Report Link": "https://ascendionhub.sharepoint.com/Shared%20Documents/Ascendion_Handbook---Final.pdf" },
    { "Id": 5, "Report Name": "Ascendion_Handbook---Final.pdf", "Report Link": "https://ascendionhub.sharepoint.com/Shared%20Documents/Ascendion_Handbook---Final.pdf" },
    { "Id": 6, "Report Name": "Ascendion_Handbook---Final.pdf", "Report Link": "https://ascendionhub.sharepoint.com/Shared%20Documents/Ascendion_Handbook---Final.pdf" },
    { "Id": 7, "Report Name": "Ascendion_Handbook---Final.pdf", "Report Link": "https://ascendionhub.sharepoint.com/Shared%20Documents/Ascendion_Handbook---Final.pdf" },
    { "Id": 8, "Report Name": "Ascendion_Handbook---Final.pdf" ,"Report Link": "https://ascendionhub.sharepoint.com/Shared%20Documents/Ascendion_Handbook---Final.pdf" },
    { "Id": 9, "Report Name": "Ascendion_Handbook---Final.pdf" ,"Report Link": "https://ascendionhub.sharepoint.com/Shared%20Documents/Ascendion_Handbook---Final.pdf" },
    { "Id": 10, "Report Name": "Ascendion_Handbook---Final.pdf" ,"Report Link": "https://ascendionhub.sharepoint.com/Shared%20Documents/Ascendion_Handbook---Final.pdf" },
    { "Id": 11, "Report Name": "Ascendion_Handbook---Final.pdf" ,"Report Link": "https://ascendionhub.sharepoint.com/Shared%20Documents/Ascendion_Handbook---Final.pdf" },
    { "Id": 12, "Report Name": "Ascendion_Handbook---Final.pdf" ,"Report Link": "https://ascendionhub.sharepoint.com/Shared%20Documents/Ascendion_Handbook---Final.pdf" },
    { "Id": 13, "Report Name": "Ascendion_Handbook---Final.pdf" ,"Report Link": "https://ascendionhub.sharepoint.com/Shared%20Documents/Ascendion_Handbook---Final.pdf" },
    { "Id": 14, "Report Name": "Ascendion_Handbook---Final.pdf" ,"Report Link": "https://ascendionhub.sharepoint.com/Shared%20Documents/Ascendion_Handbook---Final.pdf" },
    { "Id": 15, "Report Name": "Ascendion_Handbook---Final.pdf" ,"Report Link": "https://ascendionhub.sharepoint.com/Shared%20Documents/Ascendion_Handbook---Final.pdf" }
  ];

  dataSource = new MatTableDataSource(this.reportData);
  @ViewChild('paginator') paginator!: MatPaginator;

  constructor() { }

  pageSizes1 = [5, 10];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // Open Link in new window
  openLink(reportLink: any) {
    window.open(reportLink);
  }

  ngOnInit(): void { }

}
