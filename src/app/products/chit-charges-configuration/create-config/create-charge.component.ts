import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsService } from '../../products.service'; 


@Component({
  selector: 'mifosx-create-charge',
  templateUrl: './create-charge.component.html',
  styleUrls: ['./create-charge.component.scss']
})
export class ChitCreateConfigComponent implements OnInit {

  /** Create Config form. */
  chitchargeForm: FormGroup;
  

  constructor( private formBuilder: FormBuilder,
                private router :Router,
                private route: ActivatedRoute,
                private productsService:ProductsService,){  
                }              

  ngOnInit() {
    this.createChitChargeForm();
  }
  createChitChargeForm(){
    this.chitchargeForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'amount': [''],
      'isEnabled': ['']
    })
  }

  submit() {
    const chitChargeData = this.chitchargeForm.value;
    this.productsService.createChitChargeConfig(chitChargeData).subscribe((response :any) => {
      this.router.navigate(['/products/chit-charges'], { relativeTo: this.route });
    });
    }
  
}
