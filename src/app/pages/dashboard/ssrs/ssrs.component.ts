import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Reports } from '../../../model/employee';
import { MatPaginator } from '@angular/material/paginator';
import { EmpFilter, filterOption } from '../../../model/empfilter';
import { MatSelectChange } from '@angular/material/select';
import { MatSort, Sort } from '@angular/material/sort';
import { D3Service } from '../../../services/d3.service';
import { SimpleDataModel } from '../../../model/chart';

@Component({
  selector: 'app-ssrs',
  templateUrl: './ssrs.component.html',
  styleUrls: ['./ssrs.component.scss']
})

export class SsrsComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Reports', 'Aging'];
  displayedColumns2: string[] = ['Id', 'User Name', 'Aging'];

  reportData: Reports[] = [
    { Id: 1, Reports: 1011, Aging: '30 days' },
    { Id: 2, Reports: 1012, Aging: '60 days' },
    { Id: 3, Reports: 1012, Aging: '60 days' },
    { Id: 4, Reports: 1012, Aging: '60 days' },
    { Id: 5, Reports: 1012, Aging: '60 days' },
    { Id: 6, Reports: 1012, Aging: '60 days' },
    { Id: 7, Reports: 1012, Aging: '60 days' },
    { Id: 8, Reports: 1012, Aging: '60 days' },
    { Id: 9, Reports: 1012, Aging: '60 days' },
    { Id: 10, Reports: 1012, Aging: '60 days' },
  ];

  reportData2: Reports[] = [
    { Id: 1, 'User Name': 'Adam', Aging: '30 days' },
    { Id: 2, 'User Name': 'Roozen', Aging: '45 days' },
    { Id: 3, 'User Name': 'Judy', Aging: '45 days' },
    { Id: 4, 'User Name': 'Michael', Aging: '45 days' },
    { Id: 5, 'User Name': 'Adrian', Aging: '60 days' },
    { Id: 6, 'User Name': 'Alfred Henry', Aging: '60 days' },
    { Id: 7, 'User Name': 'Vu Ha', Aging: '60 days' },
    { Id: 8, 'User Name': 'Paul', Aging: '90 days' },
    { Id: 9, 'User Name': 'Bill', Aging: '90 days' },
    { Id: 10, 'User Name': 'Mary', Aging: '90 days' },
  ];

  reportData3: Reports[] = [
    { Id: 1, Reports: 1011, Aging: 'Daily' },
    { Id: 2, Reports: 1012, Aging: 'Weekly' },
    { Id: 3, Reports: 1012, Aging: 'Monthly' },
    { Id: 4, Reports: 1012, Aging: 'Quaterly' },
    { Id: 5, Reports: 1012, Aging: 'Yearly' },
    { Id: 6, Reports: 1012, Aging: 'Yearly' },
    { Id: 7, Reports: 1012, Aging: 'Yearly' },
    { Id: 8, Reports: 1012, Aging: 'Yearly' },
    { Id: 9, Reports: 1012, Aging: 'Yearly' },
    { Id: 10, Reports: 1012, Aging: 'Yearly' },
  ];

  dataSource = new MatTableDataSource(this.reportData);
  dataSource2 = new MatTableDataSource(this.reportData2);
  dataSource3 = new MatTableDataSource(this.reportData3);
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginator2') paginator2!: MatPaginator;
  @ViewChild('paginator3') paginator3!: MatPaginator;

  pageSizes1 = [5, 10];
  pageSizes2 = [5, 10];
  pageSizes3 = [5, 10];

  private data: any[] = [
    { name: '3000', value: '3000', color: '#198754' },
    { name: '215', value: '215', color: '#0d6efd' },
    { name: '1400', value: '1400', color: '#0dcaf0' },
    { name: '176', value: '176', color: '#ffc107' },
  ];
  private margin = { top: 10, right: 30, bottom: 30, left: 40 };
  private width = 450;
  private height = 450;
  private svg: any;
  private colors: any;
  private radius = Math.min(this.width, this.height) / 2 - this.margin.left;
  constructor(private d3: D3Service) { }

  ngOnInit(): void {
    this.createSvg();
    this.createColors(this.data);
    this.drawChart();
  }

  private createSvg(): void {
    this.svg = this.d3.d3
      .select('figure#donut')
      .append('svg')
      .attr('viewBox', `0 0 ${this.width} ${this.height}`)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
      );
  }

  private createColors(data: any): void {
    let index = 0;
    const defaultColors = [
      '#6773f1',
      '#32325d',
      '#6162b5',
      '#6586f6',
      '#8b6ced',
      '#1b1b1b',
      '#212121',
    ];
    const colorsRange: any = [];
    this.data.forEach((element) => {
      if (element.color) colorsRange.push(element.color);
      else {
        colorsRange.push(defaultColors[index]);
        index++;
      }
    });
    this.colors = this.d3.d3
      .scaleOrdinal()
      .domain(data.map((d: any) => d.value.toString()))
      .range(colorsRange);
  }

  private drawChart(): void {
    // Compute the position of each group on the pie:
    var pie = this.d3.d3
      .pie()
      .sort(null) // Do not sort group by size
      .value((d: any) => {
        return d.value;
      });
    var data_ready = pie(this.data);

    // The arc generator
    var arc = this.d3.d3
      .arc()
      .innerRadius(this.radius * 0.5) // This is the size of the donut hole
      .outerRadius(this.radius * 0.8);

    // Another arc that won't be drawn. Just for labels positioning
    var outerArc = this.d3.d3
      .arc()
      .innerRadius(this.radius * 0.9)
      .outerRadius(this.radius * 0.9);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    this.svg
      .selectAll('allSlices')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d: any) => this.colors(d.data.value))
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', 0.7);

    // Add the polylines between chart and labels:
    this.svg
      .selectAll('allPolylines')
      .data(data_ready)
      .enter()
      .append('polyline')
      .attr('stroke', 'black')
      .style('fill', 'none')
      .attr('stroke-width', 1)
      .attr('points', (d: any) => {
        var posA = arc.centroid(d); // line insertion in the slice
        var posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
        var posC = outerArc.centroid(d); // Label position = almost the same as posB
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = this.radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC];
      });

    // Add the polylines between chart and labels:
    this.svg
      .selectAll('allLabels')
      .data(data_ready)
      .enter()
      .append('text')
      .text((d: any) => {
        return d.data.name;
      })
      .attr('transform', (d: any) => {
        var pos = outerArc.centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = this.radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return 'translate(' + pos + ')';
      })
      .style('text-anchor', (d: any) => {
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midangle < Math.PI ? 'start' : 'end';
      });
  }

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
}
