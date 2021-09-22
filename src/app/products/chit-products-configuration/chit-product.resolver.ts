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
export class ChitProductResolver implements Resolve<Object> {

  /**
   * @param {ProductsService} ProductsService product service.
   */
  constructor(private productsService: ProductsService) {}

  /**
   * Returns the product data.
   * @returns {Observable<any>}
   */
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const productId = route.paramMap.get('id');
    return this.productsService.getChitProduct(productId);
  }

}
