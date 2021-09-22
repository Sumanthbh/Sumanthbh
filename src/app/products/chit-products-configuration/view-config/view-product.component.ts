/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

/** Custom Services */
import { ProductsService } from '../../products.service'; 

/** Custom Components */
import { DeleteDialogComponent } from '../../../shared/delete-dialog/delete-dialog.component';
/**
 * View product component.
 */
@Component({
  selector: 'mifosx-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ChitViewProductComponent implements OnInit {

  /** product Data. */
  productData: any;



  /**
   * Retrieves the product data from `resolve`.
     @param {ProductsService} productsService Products Service.
   * @param {ActivatedRoute} route Activated Route.
   * @param {Router} router Router for navigation.
   * @param {MatDialog} dialog Dialog reference.
   */
  constructor(private productsService: ProductsService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog) {
    this.route.data.subscribe((data: { product: any }) => {
      this.productData = data.product;
    });
  }

  ngOnInit() {
  }

  /**
   * Deletes the chitcharge and redirects to charges.
   */
  delete() {
    const deleteChargeDialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { deleteContext: `product ${this.productData.id}` }
    });
    deleteChargeDialogRef.afterClosed().subscribe((response: any) => {
      if (response.delete) {
        this.productsService.deleteChitProduct(this.productData.id)
          .subscribe(() => {
            this.router.navigate(['products/chit-products-config']);
          });
      }
    });
  }

}
