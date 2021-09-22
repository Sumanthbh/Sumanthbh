import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ChitGroupsService } from 'app/chitgroups/chitgroups.service';

@Component({
  selector: 'mifosx-chit-product-accounting',
  templateUrl: './chit-product-accounting.component.html',
  styleUrls: ['./chit-product-accounting.component.scss']
})
export class ChitProductAccountingComponent implements OnInit {

  chitAccoutingTemplate: any;
  chitAccGLMapping: any;
  chitProductAccountingForm: FormGroup;

  assetAccountData: any;
  incomeAccountData: any;
  expenseAccountData: any;
  liabilityAccountData: any;
  paymentTypeData: any;
  
  paymentFundSourceDisplayedColumns: string[] = ['paymentTypeId', 'fundSourceAccountId', 'actions'];
  feesPenaltyIncomeDisplayedColumns: string[] = ['chargeId', 'incomeAccountId', 'actions'];

  constructor(private route: ActivatedRoute,  private router: Router, private formBuilder: FormBuilder,
                private chitGroupsService: ChitGroupsService) {
                this.route.data.subscribe((data: { chitAccoutingTemplate: any, chitAccGLMapping: any }) => {
                  this.chitAccoutingTemplate = data.chitAccoutingTemplate;
                  this.chitAccGLMapping = data.chitAccGLMapping;
                  //console.log(data.chitAccoutingTemplate);
                  //console.log(data.chitAccGLMapping);
                });
            
    this.createchitProductAccountingForm();
  }

  ngOnInit() {
    this.paymentTypeData = this.chitAccoutingTemplate.paymentTypeOptions || [];
    this.assetAccountData = this.chitAccoutingTemplate.assetAccountOptions || [];
    this.incomeAccountData = this.chitAccoutingTemplate.incomeAccountOptions || [];
    this.expenseAccountData = this.chitAccoutingTemplate.expenseAccountOptions || [];
    this.liabilityAccountData = this.chitAccoutingTemplate.liabilityAccountOptions || [];

    if (this.chitAccGLMapping) {
      console.log(this.chitAccGLMapping)
      this.chitProductAccountingForm.patchValue({
        // 'chitAdvanceId': this.chitAccGLMapping.chitAdvanceId.id,
        // 'chitEnrollFeeId': this.chitAccGLMapping.chitEnrollFeeId.id,
        // 'chitVerificationChargeId': this.chitAccGLMapping.chitVerificationChargeId.id,
        // 'chitAuctionWinnerId': this.chitAccGLMapping.chitAuctionWinnerId.id,
        
        'subscriptionReceivedInAdvanceId': this.chitAccGLMapping.subscriptionReceivedInAdvanceId.id,
        'oustandingSubscriptionId': this.chitAccGLMapping.oustandingSubscriptionId.id,
        'receivableFromPrizedSubscriberId': this.chitAccGLMapping.receivableFromPrizedSubscriberId.id,
        'receivableFromNonPrizedSubscriberId': this.chitAccGLMapping.receivableFromNonPrizedSubscriberId.id,
        'enrollmentFeeId': this.chitAccGLMapping.enrollmentFeeId.id,
        'replacementChargesId': this.chitAccGLMapping.replacementChargesId.id,
        'chequeBounceChargesId': this.chitAccGLMapping.chequeBounceChargesId.id,
        'chitVerificationChargeId': this.chitAccGLMapping.chitVerificationChargeId.id,
        'penaltyId': this.chitAccGLMapping.penaltyId.id,
        'bidsACId': this.chitAccGLMapping.bidsACId.id,
        'excessShortPaymentOfPSSubscriberId': this.chitAccGLMapping.excessShortPaymentOfPSSubscriberId.id,
        'foremanChitId': this.chitAccGLMapping.foremanChitId.id,
        'subscriptionId': this.chitAccGLMapping.subscriptionId.id,
        'ownChitsId': this.chitAccGLMapping.ownChitsId.id,
        'dividendPayableId': this.chitAccGLMapping.dividendPayableId.id,
        'subscriptionPayableId': this.chitAccGLMapping.subscriptionPayableId.id,
        'terminatedSubscriberDivedendId': this.chitAccGLMapping.terminatedSubscriberDivedendId.id,
        'terminatedSubscribersPayableId': this.chitAccGLMapping.terminatedSubscribersPayableId.id,
        'gstPayableId': this.chitAccGLMapping.gstPayableId.id,
        'foremanCommissionId': this.chitAccGLMapping.foremanCommissionId.id,
        'dividendEarnedOnOwnChitsId': this.chitAccGLMapping.dividendEarnedOnOwnChitsId.id,
        'bidLossId': this.chitAccGLMapping.bidLossId.id,
        'discountToCustomersId': this.chitAccGLMapping.discountToCustomersId.id,
        'bidAdvanceId':this.chitAccGLMapping.bidAdvanceId.id,
        'outstandingSubscriptionAdvanceNpsId':this.chitAccGLMapping.outstandingSubscriptionAdvanceNpsId.id,
        'chitCgstId':this.chitAccGLMapping.chitCgstId.id,
        'chitSgstId':this.chitAccGLMapping.chitSgstId.id,
        'chitPassbookId': this.chitAccGLMapping.chitPassbookId.id,
      });
    }
  }

  createchitProductAccountingForm() {
    this.chitProductAccountingForm = this.formBuilder.group({
      // 'chitAdvanceId': [''],
      // 'chitEnrollFeeId': [''],
      // 'chitVerificationChargeId': [''],
      // 'chitAuctionWinnerId': [''],

      'subscriptionReceivedInAdvanceId': [''],
      'oustandingSubscriptionId': [''],
      'receivableFromPrizedSubscriberId': [''],
      'receivableFromNonPrizedSubscriberId': [''],
      'enrollmentFeeId': [''],
      'replacementChargesId': [''],
      'chequeBounceChargesId': [''],
      'chitVerificationChargeId': [''],
      'penaltyId': [''],
      'bidsACId': [''],
      'excessShortPaymentOfPSSubscriberId': [''],
      'foremanChitId': [''],
      'subscriptionId': [''],
      'ownChitsId': [''],
      'dividendPayableId': [''],
      'subscriptionPayableId': [''],
      'terminatedSubscriberDivedendId': [''],
      'terminatedSubscribersPayableId': [''],
      'gstPayableId': [''],
      'foremanCommissionId': [''],
      'dividendEarnedOnOwnChitsId': [''],
      'bidLossId': [''],
      'discountToCustomersId': [''], 
      'bidAdvanceId':[''],
      'outstandingSubscriptionAdvanceNpsId':[''],
      'chitCgstId':[''],
      'chitSgstId':[''],
      'chitPassbookId':[''],
    });
  }

  submit() {

    const mappingData = this.chitProductAccountingForm.value;
  //  console.log(mappingData);
    if (this.chitAccGLMapping) {
      // Update mappings
      this.chitGroupsService.updateChitToAccountingGLMapping(mappingData).subscribe((response: any) => {
        this.router.navigate(['/products'], { relativeTo: this.route });
      });
  
    } else {
      // Create Mappings
      this.chitGroupsService.createChitToAccountingGLMapping(mappingData).subscribe((response: any) => {
        this.router.navigate(['/products'], { relativeTo: this.route });
      });
    }
  }
}
