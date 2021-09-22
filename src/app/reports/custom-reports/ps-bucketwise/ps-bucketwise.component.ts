import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from 'app/reports/reports.service';

@Component({
  selector: 'mifosx-ps-bucketwise',
  templateUrl: './ps-bucketwise.component.html',
  styleUrls: ['./ps-bucketwise.component.scss']
})
export class PsBucketwiseComponent implements OnInit {
  /**getting officeId and reportdate from Parent Component */
  @Input() childOfficeId: any;
  childOfficeIdValue : any;
  @Input() childReportDate: any;
  childReportDateValue : any
  /**Report data for dataSource Table */
  reportData :any=[];
  constructor(private route: ActivatedRoute,
              private reportService : ReportsService,
              private datePipe : DatePipe) {
  }
  displayedColumns: string[] = ['BranchName', 'ChitGroupWithTicketNumber', 'GroupStartDate', 'SubscriberName','DemandAmount',
                               'NumberOfCollectedInst','CollectedAmount','NumberOfDueInst','Days_1_to_7','Days_8_to_15',
                               'Days_31_to_90','Days_91_to_180','Above_180_Days'];

  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.childOfficeIdValue = this.childOfficeId
    this.childReportDateValue = this.datePipe.transform(this.childReportDate, "yyyy-MM-dd")
    this.getReportData()
    
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnChanges(changes: SimpleChanges) {
      for (let property in changes) {
          if (property === 'childOfficeId') {
              console.log('Previous:', changes[property].previousValue);
              console.log('Current:', changes[property].currentValue);
              console.log('firstChange:', changes[property].firstChange);
          }
      }
  }
  getReportData(){
    this.reportService.getPSBucketReport(this.childOfficeIdValue,this.childReportDateValue ).subscribe((response: any)=>{
      this.reportData = response['Prized Subscribers'];
      this.dataSource = new MatTableDataSource(this.reportData);
      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
      console.log(this.reportData);
    })
  }
}
