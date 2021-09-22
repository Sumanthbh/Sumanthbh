/** Angular Imports */
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Services */
import { ProductsService } from 'app/products/products.service';
/**
 * Loan products data resolver.
 */
@Injectable()
export class BankResolver implements Resolve<Object> {

  /**
   *
   * @param {ProductsService} productsService ProductsService.
   */
  constructor(private productsService: ProductsService) {}

  /**
   * Returns the loan products data.
   * @returns {Observable<any>}
   */
  resolve(): Observable<any> {
    return this.productsService.getBankDetails();
  }

}
