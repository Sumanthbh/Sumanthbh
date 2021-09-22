/** Angular Imports */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Services */
import { ProductsService } from '../products.service';

/**
 * Users data resolver.
 */
@Injectable()
export class ChitChargeResolver implements Resolve<Object> {

  /**
   * @param {ProductsService} ProductsService Charges service.
   */
  constructor(private productsService: ProductsService) {}

  /**
   * Returns the charges data.
   * @returns {Observable<any>}
   */
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const chargeId = route.paramMap.get('id');
    return this.productsService.getChitCharge(chargeId);
  }

}
