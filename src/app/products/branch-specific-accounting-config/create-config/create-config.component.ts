import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientsService } from '../../../clients/clients.service';
import { ChitGroupsService } from 'app/chitgroups/chitgroups.service';
import { ProductsService } from 'app/products/products.service';
import { faTintSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'mifosx-create-config',
  templateUrl: './create-config.component.html',
  styleUrls: ['./create-config.component.scss']
})
export class CreateConfigComponent implements OnInit {

  /** Create Config form. */
  branchspecificForm: FormGroup;
  /**Unconfigured Data */
  unconfiguredData : any;
  /** office data. */
  officeData: any = [];
  /**Configured Data */
  configuredData : any = [];
  /**Cash Bank Data */
  cashData : any;
  bankData : any;

  constructor( private formBuilder: FormBuilder,
                private router :Router,
                private route: ActivatedRoute,
                private productsService:ProductsService,){  
      this.route.data.subscribe((data : { cash : any, bank : any, office:any, configuredBranches: any})=>{
        this.officeData = data.office;
        this.cashData = data.cash;
        this.bankData = data.bank;
        this.configuredData = data.configuredBranches;
        this.unconfiguredData = this.officeData.filter(( x:any)  => !this.configuredData.filter( (y:any)  => y.branchId === x.id).length)
      })        
  }

  ngOnInit() {
    this.createBranchSpecificForm();
  }
  createBranchSpecificForm(){
    this.branchspecificForm = this.formBuilder.group({
      'branchId': ['', Validators.required],
      'cashglAccountId': ['', Validators.required],
      'bankglAccountId': ['', Validators.required],
    })
  }

  submit() {
    const branchSpecificData = this.branchspecificForm.value;
    this.productsService.createBranchSpecificConfig(branchSpecificData).subscribe((response :any) => {
      this.router.navigate(['/products/branch-specific-accounting-config'], { relativeTo: this.route });
    });
    }
  
}
