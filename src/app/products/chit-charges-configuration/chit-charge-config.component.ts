import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


/** rxjs Imports */
import { of } from 'rxjs';

@Component({
  selector: 'mifosx-chit-charge-config',
  templateUrl: './chit-charge-config.component.html',
  styleUrls: ['./chit-charge-config.component.scss']
})
export class ChitChargeConfigComponent implements OnInit {
  

  /** Data source for offices table. */
  dataSource: MatTableDataSource<any>;

  /**Column names to display */
  displayedColumns : string[] = ['id', 'name', 'amount', 'isEnabled'];

  /** Paginator for configuredBranch table. */
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  chargesData: any;

  /**
   * Retrieves the configuredBranches data from `resolve`.
   * @param {ActivatedRoute} route Activated Route.
   */
   constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(( data): { charge : any} => this.chargesData = data.charges);
  }
  ngOnInit(){
    this.setCharges();
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    setCharges(){
    this.dataSource = new MatTableDataSource(this.chargesData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
}
