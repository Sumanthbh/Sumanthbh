import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from 'app/reports/reports.service';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { DailyCollection } from 'app/reports/report-class/daily-collection'; 
@Component({
    selector: 'mifosx-daily-collection-report',
    templateUrl: './daily-collection-report.component.html',
    styleUrls: ['./daily-collection-report.component.scss']
})
export class DailyCollectionReportComponent implements OnInit {
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
    displayedColumns: string[] = ['BranchName', 'chitGroup', 'ChitDate','GroupStartDate', 'TotalNoOfCustomers','DailyDemandToday',
                                  'DailyCollectionToday','PenaltyAmountToday','ShortFallAdvanceToday','PercentageToday','empty1',
                                  'DailyDemandCurrentMonth','DailyCollectionCurrentMonth','PenaltyAmountCurrentMonth',
                                  'ShortFallAdvanceCurrentMonth','PercentageCurrentMonth','empty2','DailyDemandTillToday',
                                  'DailyCollectionTillToday','PenaltyAmountTillToday', 'ShortFallAdvanceTillToday',
                                  'PercentageTillToday'];

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
      this.reportService.getDailyCollectionReport(this.childOfficeIdValue,this.childReportDateValue).subscribe((response:any) => {
        var dailycollectiondata: DailyCollection[]=[];
        var todayDemandData = response.TodaysDemand;//.find((x:any) => x.BranchName === element.BranchName && x.chitGroup === element.chitGroup)
        var currentMonthData = response.CurrentMonth;//.find((x:any) => x.BranchName === element.BranchName && x.chitGroup === element.chitGroup)
        var tillTodayData = response.TillToday;//.find((x:any) => x.BranchName === element.BranchName && x.chitGroup === element.chitGroup)
        
        todayDemandData.forEach((element:any) => {
          let dailydata = new DailyCollection();
        var currentMonthRow = currentMonthData.find((x:any) => x.BranchName === element.BranchName && x.chitGroup === element.chitGroup)
        var tillTodayRow = tillTodayData.find((x:any) => x.BranchName === element.BranchName && x.chitGroup === element.chitGroup)
        dailydata.BranchName = element.BranchName;
        dailydata.chitGroup = element.chitGroup;
        dailydata.ChitDate =  element.ChitDate
        dailydata.DailyDemandToday =  element.DailyDemand
        dailydata.PenaltyAmountToday= element.PenaltyAmount
        dailydata.DailyCollectionToday= element.DailyCollection
        dailydata.PercentageToday=  element.Percentage
        dailydata.ShortFallAdvanceToday=  element.ShortFallAdvance
        dailydata.TotalNoOfCustomers = element.TotalNoOfCustomers
        dailydata.GroupStartDate =  element.GroupStartDate
        dailydata.DailyDemandCurrentMonth = currentMonthRow.DailyDemand
        dailydata.PenaltyAmountCurrentMonth = currentMonthRow.PenaltyAmount
        dailydata.DailyCollectionCurrentMonth = currentMonthRow.DailyCollection
        dailydata.PercentageCurrentMonth  = currentMonthRow.Percentage
        dailydata.ShortFallAdvanceCurrentMonth  = currentMonthRow.ShortFallAdvance
        dailydata.DailyDemandTillToday = tillTodayRow.DailyDemand
        dailydata.PenaltyAmountTillToday  = tillTodayRow.PenaltyAmount
        dailydata.DailyCollectionTillToday  = tillTodayRow.DailyCollection
        dailydata.PercentageTillToday = tillTodayRow.Percentage
        dailydata.ShortFallAdvanceTillToday = tillTodayRow.ShortFallAdvance
        dailycollectiondata.push(dailydata)
        });
        
        this.reportData = dailycollectiondata;
        this.dataSource = new MatTableDataSource(this.reportData);
        this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
        console.log(this.reportData);
      })
      
    }
}
