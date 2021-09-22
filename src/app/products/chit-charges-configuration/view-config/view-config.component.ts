/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

/** Custom Services */
import { ProductsService } from '../../products.service'; 

/** Custom Components */
import { DeleteDialogComponent } from '../../../shared/delete-dialog/delete-dialog.component';
/**
 * View charge component.
 */
@Component({
  selector: 'mifosx-view-config',
  templateUrl: './view-config.component.html',
  styleUrls: ['./view-config.component.scss']
})
export class ChitViewConfigComponent implements OnInit {

  /** charge Data. */
  chargeData: any;



  /**
   * Retrieves the charge data from `resolve`.
     @param {ProductsService} productsService Products Service.
   * @param {ActivatedRoute} route Activated Route.
   * @param {Router} router Router for navigation.
   * @param {MatDialog} dialog Dialog reference.
   */
  constructor(private productsService: ProductsService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog) {
    this.route.data.subscribe((data: { charge: any }) => {
      this.chargeData = data.charge;
    });
  }

  ngOnInit() {
  }

  /**
   * Deletes the chitcharge and redirects to charges.
   */
  delete() {
    const deleteChargeDialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { deleteContext: `charge ${this.chargeData.id}` }
    });
    deleteChargeDialogRef.afterClosed().subscribe((response: any) => {
      if (response.delete) {
        this.productsService.deleteChitCharge(this.chargeData.id)
          .subscribe(() => {
            this.router.navigate(['products/chit-charges']);
          });
      }
    });
  }

}
