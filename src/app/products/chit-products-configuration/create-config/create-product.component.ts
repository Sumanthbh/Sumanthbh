import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsService } from '../../products.service'; 


@Component({
  selector: 'mifosx-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class ChitCreateProductComponent implements OnInit {

  /** Create Config form. */
  chitproductForm: FormGroup;
  

  constructor( private formBuilder: FormBuilder,
                private router :Router,
                private route: ActivatedRoute,
                private productsService:ProductsService,){  
                }              

  ngOnInit() {
    this.createChitProductForm();
  }
  createChitProductForm(){
    this.chitproductForm = this.formBuilder.group({
      'chitName': ['', Validators.required],
      'chitValue': [''],
      'minPercent': [''],
      'maxPercent': [''],
      'chitDuration': [''],
      'noOfSubscribers': [''],
      'isEnabled': ['']
    })
  }

  submit() {
    const chitProductData = this.chitproductForm.value;
    this.productsService.createChitProductConfig(chitProductData).subscribe((response :any) => {
      this.router.navigate(['/products/chit-products-config'], { relativeTo: this.route });
    });
    }
  
}
