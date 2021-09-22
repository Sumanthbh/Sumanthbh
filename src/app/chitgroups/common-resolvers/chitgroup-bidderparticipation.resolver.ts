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
export class BidderParticipationResolver implements Resolve<Object> {

  /**
   * @param {ChitGroupsService} ChitGroupsService ChitGroups service.
   */
  constructor(private chitgroupsService: ChitGroupsService) { }

  /**
   * Returns the Bids data for this Chit & Cycle.
   * @param {ActivatedRouteSnapshot} route Route Snapshot
   * @returns {Observable<any>}
   */
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    
    return this.chitgroupsService.getBidderParticipation();
  }

}
