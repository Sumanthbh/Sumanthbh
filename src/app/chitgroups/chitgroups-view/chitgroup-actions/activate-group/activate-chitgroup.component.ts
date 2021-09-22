/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

/** Custom Services */
import { ChitGroupsService } from 'app/chitgroups/chitgroups.service';
import { SettingsService } from 'app/settings/settings.service';

/**
 * Activate ChitGroup Component
 */
@Component({
  selector: 'mifosx-activate-chitgroup',
  templateUrl: './activate-chitgroup.component.html',
  styleUrls: ['./activate-chitgroup.component.scss']
})
export class ActivateChitGroupComponent implements OnInit {

  /** Activate group form. */
  activateGroupForm: FormGroup;
  /** Group Id */
  chitgroupId: any;
  // Validation Issues Array  
  valArray : [];
  chitgroupData: any;
  clientMembers: any[];
  clientIdList : any = [];
  //advancePaidList: any[];
  perClientChits: Record<number, number> = {}   

  requiredSusbcribers: Number;
  addedSubscribers: Number;
  subscribersMatch: boolean;
  fdrFieldsFilled: boolean;
  psoFieldsFilled: boolean;
  ccFieldsFilled: boolean;
  fdrFDChitValueSame: boolean;
  fdrFDPeriodChitDurationSame: boolean;
  someAdvanceMissing: boolean;
  
  /**
   * @param {FormBuilder} formBuilder Form Builder
   * @param {chitgroupsService} chitgroupsService ChitGroups Service
   * @param {DatePipe} datePipe Date Pipe
   * @param {ActivatedRoute} route Activated Route
   * @param {Router} router Router
   * @param {SettingsService} settingsService SettingsService
   */
  constructor(private formBuilder: FormBuilder,
              private chitgroupsService: ChitGroupsService,
              private datePipe: DatePipe,
              private route: ActivatedRoute,
              private router: Router,
              private settingsService: SettingsService) {
    this.chitgroupId = this.route.parent.snapshot.params['chitgroupId'];
    this.route.data.subscribe((data: { chitgroupActionData: any }) => {
      this.chitgroupData = data.chitgroupActionData;
      // console.log('chit details');
      // console.log(this.chitgroupData);
    });
    this.getSubscribers();
  }

  ngOnInit() {
    /* Perform Validation ...
      Before Activating ChitGroup
        1. Required Fields Validation -- TODO FDR/PSO/CC Files
        2. Required and Added Subscribers should match
        3. Data validations
        4. Status should be 10
        5. All 1st instalments are paid?
    */
    this.requiredSusbcribers = this.chitgroupData.chitduration;

    // Required fields validation - FDR
    if (this.chitgroupData.fdrAcNumber && this.chitgroupData.fdrIssueDate && this.chitgroupData.fdrMatuDate && 
        this.chitgroupData.fdrDepAmount && this.chitgroupData.fdrDuration && this.chitgroupData.fdrRatIntPerct && 
        this.chitgroupData.fdrRateIntAmt && this.chitgroupData.fdrIntPayCycle && this.chitgroupData.fdrBankName &&
        this.chitgroupData.fdrBankBranchName && this.chitgroupData.fdrMatuAmount ) {

          this.fdrFieldsFilled = true;
        }
        
    // Required fields validation - PSO
    if (this.chitgroupData.psoAppDate && this.chitgroupData.psoIssueDate && this.chitgroupData.psoNumber) {
      this.psoFieldsFilled = true;
    } 
    // Required fields validation - CC
    if (this.chitgroupData.ccAppDate && this.chitgroupData.ccIssueDate && this.chitgroupData.ccNumber){
      this.ccFieldsFilled = true;
    } 
    
    // If FDR Fields are not provided dont proceed with next validations
    if (this.fdrFieldsFilled) {

      // FDR Fixed Deposit amount, should be equivalent to chit value
      if (this.chitgroupData.fdrDepAmount === this.chitgroupData.chitvalue) {
        this.fdrFDChitValueSame = true;
      }
      // FDR Fixed Deposit period - equivalent to the Chit Duration.
      if (this.chitgroupData.chitduration === this.chitgroupData.fdrDuration) {
        this.fdrFDPeriodChitDurationSame = true;
      }
    }
    this.createActivateGroupForm();

  }

  async getSubscribers() {
    
    await this.chitgroupsService.getAllSubscribersOfChitGroup(this.chitgroupData.id).subscribe((subscribersList :any) => {
      // console.log("subscribersList");
      // console.log(subscribersList);
      this.clientMembers = subscribersList ? subscribersList : [];
      this.addedSubscribers = this.clientMembers.length;
      if (this.addedSubscribers == this.requiredSusbcribers)
        this.subscribersMatch = true;
      else
        this.subscribersMatch = false;

      this.clientMembers.forEach(mem => {
        // prepare client ids list for getting advance paid..
        this.clientIdList.push(mem.clientId);
        // if same client has more than 1 chit, note it down for dividing advance equally.
        if (this.perClientChits[mem.clientId])
          this.perClientChits[mem.clientId] = this.perClientChits[mem.clientId] + 1
        else
          this.perClientChits[mem.clientId] = 1; 
        
      });
      // console.log('perClientChits');console.log(this.perClientChits);
      // console.log("clientIdList");console.log(this.clientIdList.toString())
      
      this.chitgroupsService.getAllSubscribersPaidAdvances(this.clientIdList.toString()).subscribe((advancePaidList :any) => {
        // console.log("advancePaidList");
        // console.log(advancePaidList);
        let totAmount: number;
        this.clientMembers.forEach (eachClient => {
          if (eachClient.chitNumber === 1) {
            // Ignore chit number 1 which is for company
          } else {
            totAmount = advancePaidList.find( (adv: any) => adv.clientId === eachClient.clientId)?.amount;
              
            if (totAmount) {
              eachClient.amount = totAmount / this.perClientChits[eachClient.clientId];
            } else {
              this.someAdvanceMissing = true;
            }

            this.activateGroupFormArr.push(this.createSubsAdvance(eachClient));
          }

        })
        // console.log(this.clientMembers);
      });
    })
  }

  /**
   * Creates the activate group form.
   */
  createActivateGroupForm() {
    this.activateGroupForm = this.formBuilder.group({
      'activateGroupFormArr': this.formBuilder.array([])
    });
  }
  
  get activateGroupFormArr(): FormArray {
    return this.activateGroupForm.get('activateGroupFormArr') as FormArray;
  }

  createSubsAdvance(record?: any): FormGroup {
    return this.formBuilder.group({
      'subsId': [{ value: record ? record.id : '', disabled: true }],
      'clientId': [{ value: record ? record.clientId : '', disabled: true }],
      'name': [{ value: record ? record.name : '', disabled: true }],
      'chitNumber': [{ value: record ? record.chitNumber : '', disabled: true }],      
      'amount': [{ value: record && record.amount ? record.amount : '--No Advance Paid--', disabled: true}],
      'amountAdjust': [{ value: record && record.amount ? record.amount : '', disabled: record && record.amount ? false: true}],

    });
  }

  /**
   * Submits the form and activates the group,
   * if successful redirects to the group.
   */
  submit() {
    // Validate that all users have paid minimum of enrollment fee
    let enrollFee = this.chitgroupData.chitvalue < 100000 ? 100 : (this.chitgroupData.chitvalue >= 100000 && this.chitgroupData.chitvalue < 200000 ? 200 : (this.chitgroupData.chitvalue >= 200000 && this.chitgroupData.chitvalue < 300000 ? 400 : 600 )) ;
    let minEnrollFeePaid = true;
    // console.log(this.activateGroupForm.get('activateGroupFormArr'));
    
    this.activateGroupForm.get('activateGroupFormArr').value.forEach((element: any) => {
      if (element.amountAdjust < enrollFee)
        minEnrollFeePaid = false;
    });

    if (!minEnrollFeePaid) {
      alert ('Advance paid OR Adjusted Amount cannot be lesser than Enrollment Fee = ₹ ' + enrollFee);
      return;
    }

    // Validate that Amount to Adjst is not empty or > Amount Paid.. mistakenly entered by branch person
    let adjustAmtValid = true;
    let clientIdAdjustAmt: any = [];
    this.activateGroupFormArr.controls.forEach((element: any) => {
        console.log(element); 
        // console.log(element.value.amountAdjust); console.log(element.controls.amount.value);
        if (element.value.amountAdjust === '' || element.value.amountAdjust < 0 || element.controls.amount.value < element.value.amountAdjust) {
          alert('Incorrect amount entered in Advance to Adjust field for Client ' + element.controls.name.value);
          adjustAmtValid = false;
        }

        clientIdAdjustAmt.push({subsId: element.controls.subsId.value, clientId: element.controls.clientId.value, amount:element.value.amountAdjust});
    });

    if (!adjustAmtValid)
      return;
    
    console.log (clientIdAdjustAmt);

    const locale = this.settingsService.language.code;
    const dateFormat = this.settingsService.dateFormat;
    const dateArr : number[] = this.chitgroupData.startdate;
  
    const tempStartDate : Date  = new Date(dateArr[0], dateArr[1]-1,dateArr[2]);
    this.chitgroupData.locale = locale;
    this.chitgroupData.dateFormat = dateFormat;
    this.chitgroupData.startdate = this.datePipe.transform(tempStartDate, dateFormat),
    this.chitgroupData.adjustAmount = clientIdAdjustAmt;
    console.log(this.chitgroupData);
    // const prevactivationDate: Date = this.activateGroupForm.value.activationDate;
    // this.activateGroupForm.patchValue({
    //   activationDate: this.datePipe.transform(prevactivationDate, dateFormat),
    // });
    // const data = {
    //   ...this.activateGroupForm.value,
    //   dateFormat,
    //   locale
    // };
 
    this.chitgroupsService.executeChitGroupCommand(this.chitgroupId, 'activate', this.chitgroupData).subscribe(() => {
      this.router.navigate(['../../'], { relativeTo: this.route });
    });
  }

}
