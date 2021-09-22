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
export class ChitGroupViewResolver implements Resolve<Object> {

  /**
   * @param {ChitGroupsService} ChitGroupsService ChitGroups service.
   */
  constructor(private chitgroupsService: ChitGroupsService) { }

  /**
   * Returns the ChitGroups data.
   * @param {ActivatedRouteSnapshot} route Route Snapshot
   * @returns {Observable<any>}
   */
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const chitgroupId = route.paramMap.get('chitgroupId');
    return this.chitgroupsService.getChitGroupData(chitgroupId);
  }

}
