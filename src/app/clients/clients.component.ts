/** Angular Imports. */
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ClientsDataSource } from './clients.datasource';

/** rxjs Imports */
import { merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

/** Custom Services */
import { ClientsService } from './clients.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'mifosx-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit, AfterViewInit {
  @ViewChild('showClosedAccounts', { static: true }) showClosedAccounts: MatCheckbox;

  firstName = new FormControl();
  displayedColumns = ['firstName', 'clientno', 'status', 'mobileNo', 'gender', 'office', 'staff'];
 
  dataSource: ClientsDataSource;
  /** Get the required filter value. */
  searchValue = '';

  filterClientssBy = [
    {
      type: 'firstName',
      value: ''
    },
    {
      type: 'status',
      value: ''
    },

  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private clientsService: ClientsService) {

  }

  ngOnInit() {
    this.getClients();
  }
  ngAfterViewInit() {
    this.firstName.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap((filterValue) => {
          this.applyFilters(filterValue, 'firstName');
        })
      )
      .subscribe();
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadClientsPage())
      )
      .subscribe();
  }

  /**
   * Loads a page of journal entries.
   */
  loadClientsPage() {
    if (!this.sort.direction) {
      delete this.sort.active;
    }

    if (this.searchValue !== '') {
    this.applyFilters(this.searchValue,'firstName');
    } else {
    this.dataSource.getClients(this.filterClientssBy, this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
    }
  }

  loadClientsPages() {
    if (!this.sort.direction) {
      delete this.sort.active;
    }
    this.dataSource.getClients(this.filterClientssBy, this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
//    this.dataSource.getChitGroups(this.filterChitGroupsBy, this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize, true);
  }

  /**
   * Initializes the data source for clients table and loads the first page.
   */
  getClients() {
    this.dataSource = new ClientsDataSource(this.clientsService);
    this.dataSource.getClients(this.filterClientssBy, this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
  }



  applyFilters(filterValue: string, property: string) {
  
    this.paginator.pageIndex = 0;
    const findIndex = this.filterClientssBy.findIndex(filter => filter.type === property);
    this.filterClientssBy[findIndex].value = filterValue;

    console.log(this.filterClientssBy);    
    this.loadClientsPages();
  }

  ShowNonActiveAccounts(){
    if (!this.showClosedAccounts.checked)
    this.applyFilters('300', 'status');
  else
    this.applyFilters('!300', 'status');
  }

}
