/** Angular Imports */
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Services */
import { ChitGroupsService } from '../chitgroups.service';

/**
 * ChitGroup Actions data resolver.
 */
@Injectable()
export class ChitGroupActionsResolver implements Resolve<Object> {

  /**
   * @param {ChitGroupsService} chitgroupsService ChitGroups service.
   */
  constructor(private chitgroupsService: ChitGroupsService) { }

  /**
   * Returns the chitgroup actions data.
   * @param {ActivatedRouteSnapshot} route Route Snapshot
   * @returns {Observable<any>}
   */
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const actionName = route.paramMap.get('name');
    const chitgroupId = route.paramMap.get('chitgroupId') || route.parent.parent.paramMap.get('chitgroupId');
  console.log("actionName="+actionName);      

    switch (actionName) {
      case 'Activate':
      case 'Manage Subscribers':
        return this.chitgroupsService.getChitGroupData(chitgroupId);
      // case 'Close':
      //   return this.chitgroupsService.getChitGroupCommandTemplate('close');
        // case 'Attendance':
      default:
        return undefined;
    }
  }

}
