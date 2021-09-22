import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


/** rxjs Imports */
import { of } from 'rxjs';

@Component({
  selector: 'mifosx-chit-products-configuration',
  templateUrl: './chit-products-configuration.component.html',
  styleUrls: ['./chit-products-configuration.component.scss']
})
export class ChitProductsConfigurationComponent implements OnInit {
  

  /** Data source for offices table. */
  dataSource: MatTableDataSource<any>;

  /**Column names to display */
  displayedColumns : string[] = ['id', 'chitValue', 'chitDuration', 'NoOfSubs', 'minPercent', 'maxPercent', 'isEnabled'];

  /** Paginator for configuredBranch table. */
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  productsData: any;

  /**
   * Retrieves the configuredBranches data from `resolve`.
   * @param {ActivatedRoute} route Activated Route.
   */
   constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(( data: { product : any}) => {this.productsData = data.product.Product  });
    console.log(this.productsData);
    
  }
  ngOnInit(){
    this.setCharges();
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    setCharges(){
    this.dataSource = new MatTableDataSource(this.productsData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
}
