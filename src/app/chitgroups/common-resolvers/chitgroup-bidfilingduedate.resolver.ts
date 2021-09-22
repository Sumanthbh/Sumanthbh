/** Angular Imports */
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Services */
import { ChitGroupsService } from '../chitgroups.service';

/**
 * ChitGroups data resolver.
 */
@Injectable()
export class bidFillingDueDateResolver implements Resolve<Object> {

  /**
   * @param {ChitGroupsService} ChitGroupsService ChitGroups service.
   */
  constructor(private chitgroupsService: ChitGroupsService) { }

  /**
   * Returns the Bids data for this Chit & Cycle.
   * @param {ActivatedRouteSnapshot} route Route Snapshot
   * @returns {Observable<any>}
   */

  private cycleNumber : any;
  private id : any;
   resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.paramMap.get('chitgroupId');
 
    // await this.chitgroupsService.getChitGroupData(id).subscribe(response => {
    //   console.log(response);
    //   cycleNumber = response['currentcycle'];
    //   console.log(cycleNumber);
    // });
    return this.chitgroupsService.getbidfilingduedate(id);
  }

}
