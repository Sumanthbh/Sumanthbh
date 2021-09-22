/** Angular Imports */
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Services */
import { ProductsService } from '../products.service';

/**
 * Users data resolver.
 */
@Injectable()
export class ChitProductsResolver implements Resolve<Object> {

  /**
   * @param {ProductsService} ProductsService Charges service.
   */
  constructor(private productsService: ProductsService) {}

  /**
   * Returns the charges data.
   * @returns {Observable<any>}
   */
  resolve(): Observable<any> {
    return this.productsService.getChitProducts();
  }

}
