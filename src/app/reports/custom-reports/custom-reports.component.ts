import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportsService } from '../reports.service';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { DailyCollection } from '../report-class/daily-collection';

@Component({
  selector: 'mifosx-custom-reports',
  templateUrl: './custom-reports.component.html',
  styleUrls: ['./custom-reports.component.scss']
})

export class CustomReportsComponent implements OnInit {

   /** Data for Report Details */
   selectedValue: string;
    ParentData : any ;
   reportDate =new Date();
 
   /**Office Options */
   officeOptions : any;
   officeId:any;
   /** Maximum Transaction Date allowed. */
   maxDate = new Date();
 
   /**Report Data */
   reportData : any=[];
   
   dataSource :any;
   /**Flages to display tables */
   dailyCollectionFlag = false
   nonStartedGroupFlag = false
   psBucketFlag = false
   npsBucketFlag = false
   constructor(private route:ActivatedRoute,
               private reportService : ReportsService,
               private datePipe : DatePipe,
               private router : Router) {
       this.route.data.subscribe((data: {officeData: any})=>{
         this.officeOptions = data.officeData;
       })
       this.ParentData = null;
    }
 
 

   ngOnInit(): void {

    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
   }

   applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // exportTable() {
  //   this.exporter.exportTable();
  //   }

  // exportIt() {
  //   this.exporter.exportTable(ExportType.CSV, {
  //     fileName: "Report",
  //     Props: {
  //       Author: "@ChetanaChits"
  //     }
  //   });
  // }

  //======================================================================================
   reportOptions = [
     {id: 1,reportName:"dailycollection", value : "Daily Collection Reports"},
     {id: 1,reportName:"nonstartedgroup", value : "Non Started Group Reports"},
     {id: 3,reportName:"psbucketreport", value : "PS Reports"},
     {id: 4,reportName:"npsbucketreport", value : "NPS Reports"},
   ]

}
