import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
// import { ChitGroupsService } from '../../chitgroups.service';
// import { SettingsService } from 'app/settings/settings.service';
// import { OrganizationService } from 'app/organization/organization.service';


@Component({
  selector: 'mifosx-summary-tab',
  templateUrl: './summary-tab.component.html',
  styleUrls: ['./summary-tab.component.scss']
})
export class SummaryTabComponent implements OnInit {

  /**Column names to display */
  displayedColumns : string[] = ['chitNumber', 'winnerName', 'bidAmount', 'currentCycle', 'bidDate'];
  summaryForm :FormGroup;
  summary: any [] ;
  chitgroupData: any;

  /** Paginator for configuredBranch table. */
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

   /** Data source for offices table. */
   dataSource: MatTableDataSource<any>;

  //  this.datePipe.transform(this.nextBidDate, 'dd/MM/yyyy')

  constructor(private route : ActivatedRoute,
    private formBuilder : FormBuilder,
    private datePipe: DatePipe,
    ) {
      
    this.route.data.subscribe( (data : {summary: any,}) => {
      // this.chitgroupData = data.chitgroupViewData;
      this.summary = data.summary
    })
    console.log(this.summary);
    
     }

  ngOnInit(): void {
    this.viewSummaryForm();
  }

  viewSummaryForm(){
    // this.summaryForm = this.formBuilder.group({
    //   'chitNumber': [''],
    //   'winnerName': [''],
    //   'bidAmount': [''],
    //   'currentCycle': [''],
    //   'bidDate': ['']
    // })
    this.dataSource = new MatTableDataSource(this.summary);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
