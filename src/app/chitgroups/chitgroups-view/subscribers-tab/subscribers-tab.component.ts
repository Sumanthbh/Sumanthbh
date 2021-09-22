import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mifosx-subscribers-tab',
  templateUrl: './subscribers-tab.component.html',
  styleUrls: ['./subscribers-tab.component.scss']
})
export class SubscribersTabComponent implements OnInit {

  /**Column names to display */
  displayedColumns : string[] = ['ticketNumber', 'subscriberName', 'totalDemand', 'totalDue', 'totalCollection'];
  subscriberForm :FormGroup


  /** Paginator for configuredBranch table. */
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

   /** Data source for offices table. */
   dataSource: MatTableDataSource<any>;
  subscriberList: any;

  constructor(private route : ActivatedRoute,
    private formBuilder : FormBuilder,
    ) {
      
    this.route.data.subscribe( (data : {subscriberList: any,}) => {
      // this.chitgroupData = data.chitgroupViewData;
      this.subscriberList = data.subscriberList
    })
    console.log(this.subscriberList);
    
     }

  ngOnInit(): void {
    this.viewSummaryForm();
  }

  viewSummaryForm(){
    this.dataSource = new MatTableDataSource(this.subscriberList.Result);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
