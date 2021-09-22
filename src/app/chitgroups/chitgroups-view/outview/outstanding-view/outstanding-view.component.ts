/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

/** Custom Services */
import { ChitGroupsService } from '../../../chitgroups.service'; 
/**
 * View charge component.
 */
 @Component({
  selector: 'mifosx-outstanding-view',
  templateUrl: './outstanding-view.component.html',
  styleUrls: ['./outstanding-view.component.scss']
})
export class OutstandingViewComponent implements OnInit {


   viewData: any;



  /**
   * Retrieves the charge data from `resolve`.
     @param {ChitGroupsService} chitgroupsService ChitGroups Service
   * @param {ActivatedRoute} route Activated Route.
   * @param {Router} router Router for navigation.
   * @param {MatDialog} dialog Dialog reference.
   */
  constructor(private chitgroupsService: ChitGroupsService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog) {
    this.route.data.subscribe((data: { view: any }) => {
      this.viewData = data.view;
    });
  }

  ngOnInit() {
  }

}
