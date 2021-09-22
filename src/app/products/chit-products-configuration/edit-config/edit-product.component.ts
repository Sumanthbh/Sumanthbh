import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'mifosx-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class ChitEditProductComponent implements OnInit {

  /** Edit Config form. */
  editchitproductForm: FormGroup;
  productsData: any;


  /**
   * Retrieves the configuredBranches data from `resolve`.
   * @param {ActivatedRoute} route Activated Route.
   */

  constructor(private route: ActivatedRoute,
     private formBuilder: FormBuilder,
     private productService: ProductsService,
     private router: Router) {  this.route.data.subscribe((data: { product: any }) => {
      this.productsData = data.product;
    });
  }

  ngOnInit(): void {
    this.createChargeSpecificForm();
  }

  createChargeSpecificForm(){
    this.editchitproductForm = this.formBuilder.group({
      'chitName': [this.productsData.name, Validators.required],
      'chitValue': [this.productsData.chitValue],
      'minPercent': [this.productsData.minPercent],
      'maxPercent': [this.productsData.maxPercent],
      'chitDuration': [this.productsData.chitDuration],
      'isEnabled': [this.productsData.isEnabled],
      'noOfSubscribers': [this.productsData.NoOfSubs]
    })
  }

  submit(){
    let chitproduct = this.editchitproductForm.value;
    this.productService.editChitProductConfig(this.productsData.id,chitproduct).subscribe((response : any) => {
      this.router.navigate(['../../'], { relativeTo: this.route });
    })

  }
}
