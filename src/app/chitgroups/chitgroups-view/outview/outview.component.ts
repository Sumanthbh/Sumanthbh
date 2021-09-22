import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


/** rxjs Imports */
import { of } from 'rxjs';

@Component({
  selector: 'mifosx-outview',
  templateUrl: './outview.component.html',
  styleUrls: ['./outview.component.scss']
})
export class OutviewComponent  implements OnInit {
  

  /** Data source for offices table. */
  dataSource: MatTableDataSource<any>;

  /**Column names to display */
  displayedColumns : string[] = ['ClientId', 'ClientName', 'ChitId', 'ChitNumber', 'ChitName', 'DemandId', 'DemandDate', 'PayableAmount'];

  /** Paginator for configuredBranch table. */
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  outviewData: any;

  /**
   * Retrieves the configuredBranches data from `resolve`.
   * @param {ActivatedRoute} route Activated Route.
   */

   constructor(private route: ActivatedRoute,
    private router: Router,) {
    this.route.data.subscribe(( data): { outview : any} => this.outviewData = data.outview);
    console.log(this.outviewData);
    
 
    
  }

  ngOnInit(){
    this.setCharges();
  }


  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   }

    setCharges(){
    this.dataSource = new MatTableDataSource(this.outviewData.Result);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  PayNow()
  {
    this.router.navigate(['/chitgroups/demand-sheet'], {relativeTo: this.route});
  }
  
}
