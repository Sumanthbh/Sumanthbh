/** Angular Imports */
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Services */
import { ChitGroupsService } from '../../chitgroups/chitgroups.service';

@Injectable()
export class ChitAccoutingMappingResolver implements Resolve<Object> {

  constructor(private chitGroupsService: ChitGroupsService) {}

  /**
   * Returns the saving products template data.
   * @returns {Observable<any>}
   */
  resolve(): Observable<any> {
    return this.chitGroupsService.getAllChitToAccountingGLMapping();
  }

}
