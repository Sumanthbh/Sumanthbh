/** Angular Imports */
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

/** rxjs Imports */
import { Observable } from 'rxjs';
import { ProductsService } from 'app/products/products.service';

/**
 * Manage BranchSpecifConfig data resolver.
 */

@Injectable()
export class BranchResolver implements Resolve<Object> {

    /**
   * @param {ProductsService} productsService Products service.
   */

    constructor(private productsService: ProductsService){
    }
    /**
   * Returns the offices data.
   * @returns {Observable<any>}
   */
  resolve(): Observable<any> {
    return this.productsService.getConfiguredBranches();
  }
}
