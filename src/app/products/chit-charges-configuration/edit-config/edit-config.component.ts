import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'mifosx-edit-config',
  templateUrl: './edit-config.component.html',
  styleUrls: ['./edit-config.component.scss']
})
export class ChitEditConfigComponent implements OnInit {

  /** Edit Config form. */
  editchitchargeForm: FormGroup;
  chargesData: any;


  /**
   * Retrieves the configuredBranches data from `resolve`.
   * @param {ActivatedRoute} route Activated Route.
   */

  constructor(private route: ActivatedRoute,
     private formBuilder: FormBuilder,
     private productService: ProductsService,
     private router: Router) {  this.route.data.subscribe((data: { charge: any }) => {
      this.chargesData = data.charge;
    });
  }

  ngOnInit(): void {
    this.createChargeSpecificForm();
  }

  createChargeSpecificForm(){
    this.editchitchargeForm = this.formBuilder.group({
      'name': [this.chargesData.name, Validators.required],
      'amount': [this.chargesData.amount],
      'isEnabled': [this.chargesData.isEnabled]
    })
  }

  submit(){
    let chitcharge = this.editchitchargeForm.value;
    this.productService.editChitChargeConfig(this.chargesData.id,chitcharge).subscribe((response : any) => {
      this.router.navigate(['../../'], { relativeTo: this.route });
    })

  }
}
