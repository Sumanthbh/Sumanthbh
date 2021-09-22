/** Angular Imports */
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Services */
import { ClientsService } from '../../../clients/clients.service';

/**
 * Loan Product data resolver.
 */
@Injectable()
export class OfficeResolver implements Resolve<Object> {

  /**
   * @param {ClientsService} clientsService Clients Service.
   */
  constructor(private clientsService: ClientsService) { }

  /**
   * Returns the loan product data.
   * @returns {Observable<any>}
   */
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.clientsService.getOffices();
  }

}
