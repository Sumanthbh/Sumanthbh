/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

/** Custom Services */
import { ClientsService } from 'app/clients/clients.service';
import { SettingsService } from 'app/settings/settings.service';
import { FormfieldBase } from 'app/shared/form-dialog/formfield/model/formfield-base';
import { CheckboxBase } from 'app/shared/form-dialog/formfield/model/checkbox-base';
import { SelectionModel } from '@angular/cdk/collections';
import * as _ from 'lodash';
/**
 * Transfer Client Component
 */
@Component({
  selector: 'mifosx-cibil-check',
  templateUrl: './cibil-check.component.html',
  styleUrls: ['./cibil-check.component.scss']
})
export class CibilCheckComponent implements OnInit {

  /** Minimum date allowed. */
  minDate = new Date(2000, 0, 1);
  /** Maximum date allowed. */
  maxDate = new Date();
  /** Transfer Client form. */
  CibilCheckForm: FormGroup;
  /** Client Data */
  officeData: any;
  /** Client Id */
  clientId: any;
  selection: SelectionModel<any>;

  AmountAppliedOptions: any;

  /**
   * @param {FormBuilder} formBuilder Form Builder
   * @param {ClientsService} clientsService Clients Service
   * @param {DatePipe} datePipe Date Pipe
   * @param {ActivatedRoute} route Activated Route
   * @param {Router} router Router
   * @param {SettingsService} settingsService Setting service
   */
  constructor(private formBuilder: FormBuilder,
              private clientsService: ClientsService,
              private datePipe: DatePipe,
              private route: ActivatedRoute,
              private router: Router,
              private settingsService: SettingsService) {
    this.route.data.subscribe((data: { clientActionData: any, product: any }) => {
      this.officeData = data.clientActionData;
      this.AmountAppliedOptions = data.product.Product;
    });
    this.clientId = this.route.parent.snapshot.params['clientId'];

   

    console.log(this.CibilCheckForm)
  }
 


  ngOnInit() {
    this.createCibilCheckForm();
  }


  createCibilCheckForm() {
    this.CibilCheckForm = this.formBuilder.group({
      'Adhar':[''],
      'Mobile':[''],
      'Address':[''],
      'SecondaryProofID':[''],
      'LoanAmount': ['']
    });
  }


 

  verifycibil() {
    
console.log(this.CibilCheckForm.controls.Adhar.value);
console.log(this.CibilCheckForm.controls.Mobile.value);
    this.clientsService.getCibilData(this.clientId,this.CibilCheckForm.controls.LoanAmount.value).subscribe(response => {
      console.log(response);
      if(response && response['response_msg'] === 'Report Fetched Successfully') {
        alert ("Cibil Score Has been Verified succesfully. To view the Entire report please refer to the document section.");

            } else {
              alert (" verification failed. Please recheck and try again.");
            }
          });
     
      }
      
      validation(){
        console.log(this.CibilCheckForm.controls.Adhar.value && this.CibilCheckForm.controls.Mobile.value && this.CibilCheckForm.controls.Address.value && this.CibilCheckForm.controls.SecondaryProofID.value)
        return this.CibilCheckForm.controls.Adhar.value && this.CibilCheckForm.controls.Mobile.value && this.CibilCheckForm.controls.Address.value && this.CibilCheckForm.controls.SecondaryProofID.value && this.CibilCheckForm.controls.LoanAmount.value ;
      }

    
}
