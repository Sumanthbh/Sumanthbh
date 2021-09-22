import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductsService } from 'app/products/products.service';

@Component({
  selector: 'mifosx-edit-config',
  templateUrl: './edit-config.component.html',
  styleUrls: ['./edit-config.component.scss']
})
export class EditConfigComponent implements OnInit {

  /** Edit Config form. */
  editbranchspecificForm: FormGroup;

  /**Cash bank Data */
  cashData: any;
  bankData: any;
  branchData: any;
  officeData: any =[];
  officeOptions: any =[];

  /**
   * Retrieves the configuredBranches data from `resolve`.
   * @param {ActivatedRoute} route Activated Route.
   */

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private productService: ProductsService, private router: Router) { 
    this.route.data.subscribe((data : { cash : any, bank : any, singleBranch:any, office : any}) => {
      this.branchData = data.singleBranch;
      console.log(this.branchData)
      this.officeData = data.office;
      this.cashData = data.cash;
      this.bankData = data.bank;
      this.branchData.forEach((each : any ) => {
       this.officeOptions.push(this.officeData.find( (x: any) => x.id == each.branchId));
      console.log(this.officeOptions)
      });
    })     
  }

  ngOnInit(): void {
    this.createBranchSpecificForm();
  }

  createBranchSpecificForm(){
    this.editbranchspecificForm = this.formBuilder.group({
      'branchId': [this.branchData[0]?.branchId, Validators.required],
      'cashglAccountId': [this.branchData[0]?.cashglAccountId, Validators.required],
      'bankglAccountId': [this.branchData[0]?.bankglAccountId, Validators.required],
    })
  }

  submit(){
    let branchConfig = this.editbranchspecificForm.value;
    this.productService.updateBranchConfig( branchConfig.branchId, branchConfig).subscribe((response : any) => {
      this.router.navigate(['../../'], { relativeTo: this.route });
    })

  }
}
