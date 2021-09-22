/** Angular Imports */
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Services */
import { AccountingService } from 'app/accounting/accounting.service'; 
/**
 * Loan products data resolver.
 */
@Injectable()
export class PaymentTypeResolver implements Resolve<Object> {

  /**
   *
   * @param {AccountingService} accountingService AccountingService.
   */
  constructor(private accountingService: AccountingService) {}

  /**
   * Returns the loan products data.
   * @returns {Observable<any>}
   */
  resolve(): Observable<any> {
    return this.accountingService.getPaymentTypes();
  }

}
