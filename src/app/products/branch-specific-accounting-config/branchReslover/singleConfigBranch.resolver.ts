/** Angular Imports */
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Services */
import { ProductsService } from 'app/products/products.service';
/**
 * Loan products data resolver.
 */
@Injectable()
export class SingleConfigBranch implements Resolve<Object> {

  /**
   *
   * @param {ProductsService} productsService ProductsService.
   */
  constructor(private productsService: ProductsService) {}

  /**
   * Returns the loan products data.
   * @returns {Observable<any>}
   */
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const branchId = route.paramMap.get('id');
    return this.productsService.getConfiguredBranche(branchId,true);
  }

}
