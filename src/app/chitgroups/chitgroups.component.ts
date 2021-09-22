/** Angular Imports */
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import {formatNumber} from '@angular/common';
import "@angular/common/locales/global/en-IN";

/** rxjs Imports */
import { merge } from 'rxjs';
import { async } from '@angular/core/testing';
import { tap, startWith, map, distinctUntilChanged, debounceTime} from 'rxjs/operators';

/** Custom Services */
import { ChitGroupsService } from './chitgroups.service';

/** Custom Data Source */
import { ChitGroupsDataSource } from './chitgroups.datasource';

/**
 * ChitGroups component.
 */
@Component({
  selector: 'mifosx-app-chitgroups',
  templateUrl: './chitgroups.component.html',
  styleUrls: ['./chitgroups.component.scss']
})
export class ChitGroupsComponent implements OnInit, AfterViewInit {
  @ViewChild('showCompletedChitGroups', { static: true }) showCompletedChitGroups: MatCheckbox;

  /** Name form control. */
  name = new FormControl();
  /** Columns to be displayed in chitgroups table. */
  displayedColumns =  ['name', 'officeName', 'currentCycle', 'nextauctiondate', 'chitduration', 'monthlycontribution','status'];
  /** Data source for chitgroups table. */
  dataSource: ChitGroupsDataSource;
  /** ChitGroups filter. */
  filterChitGroupsBy = [
    {
      type: 'name',
      value: ''
    },
    {
      type: 'status',
      value: ''
    },

  ];

  /** Paginator for chitgroups table. */
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  /** Sorter for chitgroups table. */
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  /**
   * @param {ChitGroupsService} chitgroupsService ChitGroups Service
   */
  constructor(private chitgroupsService: ChitGroupsService) { }

  ngOnInit() {
    this.getChitGroups();
  }

  /**
   * Subscribes to all search filters:
   * Name
   * sort change and page change.
   */
  ngAfterViewInit() {
    this.name.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap((filterValue) => {
          this.applyFilter(filterValue, 'name');
        })
      )
      .subscribe();
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadChitGroupsPage())
      )
      .subscribe();
  }

  changeShowCompletedChitGroups() {
    if (this.showCompletedChitGroups.checked)
      this.applyFilter('30', 'status');
    else
      this.applyFilter('', 'status');
  }

  /**
   * Loads a page of chitgroups.
   */
  loadChitGroupsPage() {
    if (!this.sort.direction) {
      delete this.sort.active;
    }
    this.dataSource.getChitGroups(this.filterChitGroupsBy, this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
//    this.dataSource.getChitGroups(this.filterChitGroupsBy, this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize, true);
  }

  /**
   * Filters data in chitgroups table based on passed value and poperty.
   * @param {string} filterValue Value to filter data.
   * @param {string} property Property to filter data by.
   */
  applyFilter(filterValue: string, property: string) {
    console.log(this.filterChitGroupsBy);
    console.log("filterValue="+filterValue);
    console.log("property="+property);
    this.paginator.pageIndex = 0;
    const findIndex = this.filterChitGroupsBy.findIndex(filter => filter.type === property);
    this.filterChitGroupsBy[findIndex].value = filterValue;

    console.log(this.filterChitGroupsBy);    
    this.loadChitGroupsPage();
  }

  /**
   * Initializes the data source for chitgroups table and loads the first page.
   */
  getChitGroups() {
    this.dataSource = new ChitGroupsDataSource(this.chitgroupsService);
    this.dataSource.getChitGroups(this.filterChitGroupsBy, this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
  }

  formatNumWithThousandSeparator(num : number) {
    return formatNumber(num, 'en-IN', '1.0-0')
  }
}
