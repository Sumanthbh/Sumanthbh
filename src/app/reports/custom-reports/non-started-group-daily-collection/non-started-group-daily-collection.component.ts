import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { NonStartedGroupDailyCollection } from 'app/reports/report-class/non-started-group-daily-collection';
import { ReportsService } from 'app/reports/reports.service';

@Component({
  selector: 'mifosx-non-started-group-daily-collection',
  templateUrl: './non-started-group-daily-collection.component.html',
  styleUrls: ['./non-started-group-daily-collection.component.scss']
})
export class NonStartedGroupDailyCollectionComponent implements OnInit {

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
 displayedColumns: string[] = ['BranchName', 'CustomerName', 'DailyDemandToday','CollectionAsOnTodayToday', 'ShortFallToday','PercentageToday',
                                'empty1','DailyDemandCurrentMonth','CollectionAsOnTodayCurrentMonth','ShortFallCurrentMonth','PercentageCurrentMonth'];

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
   this.reportService.getNonStartedGroupReport(this.childOfficeIdValue,this.childReportDateValue).subscribe((response:any) => {
     var dailycollectiondata: NonStartedGroupDailyCollection[]=[];
     var todayDemandData = response.TodayDate;
     var currentMonthData = response.CurrentMonth;
    
     let dailydata = new NonStartedGroupDailyCollection();
     todayDemandData.forEach((element:any) => {
      let dailydata = new NonStartedGroupDailyCollection();
     var currentMonthRow = currentMonthData.find((x:any) => x.BranchName === element.BranchName && x.CustomerName === element.CustomerName)
     dailydata.BranchName = element.BranchName;
     dailydata.CustomerName = element.CustomerName;
     dailydata.DailyDemandToday =  element.DailyDemand
     dailydata.CollectionAsOnTodayToday =  element.CollectionAsOnToday
     dailydata.ShortFallToday= element.ShortFall
     dailydata.PercentageToday= element.Percentage
     
     dailydata.DailyDemandCurrentMonth = currentMonthRow.DailyDemand
     dailydata.CollectionAsOnTodayCurrentMonth = currentMonthRow.CollectionAsOnToday
     dailydata.ShortFallCurrentMonth  = currentMonthRow.ShortFall
     dailydata.PercentageCurrentMonth  = currentMonthRow.Percentage
     dailycollectiondata.push(dailydata)
     });
     
     this.reportData = dailycollectiondata;
     this.dataSource = new MatTableDataSource(this.reportData);
     console.log(this.reportData);
     this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   })
   
 }

}
