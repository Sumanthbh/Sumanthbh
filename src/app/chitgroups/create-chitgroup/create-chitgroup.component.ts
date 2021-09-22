/** Angular Imports */
import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import {formatNumber} from '@angular/common';
import "@angular/common/locales/global/en-IN";

/** Custom Services */
import { ChitGroupsService } from '../chitgroups.service';
import { ClientsService } from '../../clients/clients.service';
import { SettingsService } from 'app/settings/settings.service';
import { AlertService } from '../../core/alert/alert.service';

/**
 * Create ChitGroup component.
 */
@Component({
  selector: 'mifosx-create-chitgroup',
  templateUrl: './create-chitgroup.component.html',
  styleUrls: ['./create-chitgroup.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateChitGroupComponent implements OnInit, AfterViewInit {

  /** Minimum date allowed. */
  now = new Date();
  startminDate = new Date(this.now.getFullYear(), this.now.getMonth() -6, this.now.getDate());
  /** Maximum date allowed. */
  startmaxDate = new Date(this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate());
  fdrIssueMinDate = new Date(this.now.getFullYear(), this.now.getMonth()-6, this.now.getDate());
  fdrIssueMaxDate = new Date();
  fdrMatuMinDate = new Date();
  fdrMatuMaxDate = new Date(this.now.getFullYear()+5, this.now.getMonth(), this.now.getDate());
  /** ChitGroup form. */
  chitgroupForm: FormGroup;
  /** Office data. */
  officeData: any;
  cyclefrequencyOptions: any;
  collectionfrequencyOptions: any;
  intPayableCycleOptions: any;
  /** Client data. */
  clientsData: any = [];
  /** Staff data. */
  staffData: any;
  /** Client Members. */
  clientMembers: any[] = [];
  
  monContribution : Number = 0;
  //auctionDaySelection?: string;
  calendarDaysArry : number[] = [1,2,3,4,5,6,7,8,9,10,
                                  11,12,13,14,15,16,17,18,19,20,
                                  21,22,23,24,25,26,27,28];
dayTypeArry : string[] = ["First", "Second", "Third", "Fourth","Last"];
  weekDayArry : string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  auctionDayTypes: string[] = ["Calendar Day", "Flexible Day"];
  
  fdrDocFile: File;
  fdrFileName: any = '';
  fdrFileSize: Number;
  psoDocFile: File;
  psoFileName: any = '';
  psoFileSize: Number;
  ccDocFile: File;
  ccFileName: any = '';
  ccFileSize: Number;
  AmountAppliedOptions: any;

  /**
   * Retrieves the offices data from `resolve`.
   * @param {FormBuilder} formBuilder Form Builder.
   * @param {ActivatedRoute} route Activated Route.
   * @param {Router} router Router for navigation.
   * @param {ClientsService} clientsService CentersService.
   * @param {ChitGroupsService} chitgroupService ChitGroupsService.
   * @param {DatePipe} datePipe Date Pipe to format date.
   * @param {SettingsService} settingsService SettingsService
   */
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private clientsService: ClientsService,
              private chitgroupService: ChitGroupsService,
              private datePipe: DatePipe,
              private settingsService: SettingsService,
              private alertService: AlertService) {
    this.route.data.subscribe( (data: {offices: any, product: any} ) => {
      this.officeData = data.offices;
      this.AmountAppliedOptions = data.product.Product;
    });
  }

  /**
   * Creates and sets the chitgroup form.
   */
  ngOnInit() {
    this.createChitGroupForm();
  }

  
  ngAfterViewInit() {
  }

  /**
   * Creates the chitgroup form.
   */
  createChitGroupForm() {
    this.chitgroupForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'officeId': ['', Validators.required],
      'staffid': [''],
      'chitcyclefrequency': [''],
      'chitcollectionfrequency': [''],
      'startdate':[''],
      'auctionday':[''],
      'auctiondayValue':[''],
      'auctiondayType':[''],
      'auctionweekValue':[''],
      'auctiontime':[''],
      'chitduration':[''],
      'chitvalue':[''],
      'enrollmentFees':['',  Validators.pattern('^[0-9]{0,10}$')],
      'minBidPerct':[''],
      'maxBidPerct':[''],
      'prizMemPenPerct':['',  Validators.pattern('^[0-9]{0,2}([.][0-9]{0,2})?$')],
      'nonPrizMemPenPerct':['',  Validators.pattern('^[0-9]{0,2}([.][0-9]{0,2})?$')],
      
      'fdrAcNumber':[''],
      'fdrIssueDate':[''],
      'fdrDepAmount':[''],
      'fdrDuration':['',  Validators.pattern('^[0-9]{0,2}$')],
      'fdrRatIntPerct':['',  Validators.pattern('^[0-9]{0,2}([.][0-9]{0,2})?$')],
      'fdrRateIntAmt':[''],
      'fdrIntPayCycle':[''],
      'fdrMatuDate':[''],
      'fdrMatuAmount':[''],
      'fdrBankName':[''],
      'fdrBankBranchName':[''],
      'fdrCertFile':[''],
      'psoAppDate':[''],
      'psoIssueDate':[''],
      'psoNumber':[''],
      'psoCertFile':[''],
      'ccAppDate':[''],
      'ccIssueDate':[''],
      'ccNumber':[''],
      // 'chitDuration':[''],
      // 'chitValue':[''],
      // 'minPercent':[''],
      // 'maxPercent':[''],
      'ccCertFile':[''],


    });
    this.buildDependencies();
    this.setOptions();

  }

  /**
   * Sets the staff and clients data each time the user selects a new office.
   * Adds form control Activation Date if active.
   */
  buildDependencies() {
    // this.chitgroupForm.get('officeId').valueChanges.subscribe((option: any) => {
    //   this.chitgroupService.getStaff(option).subscribe(data => {
    //     this.staffData = data;
    //     if (data === undefined || data.length === 0) {
    //       this.chitgroupForm.controls['staffid'].disable();
    //     } else {
    //       this.chitgroupForm.controls['staffid'].enable();
    //     }
    //   });
    // });

  }

  /**
     * Sets select dropdown options.
     */
  setOptions() {
    this.cyclefrequencyOptions = [{id:"Monthly", name: 'Monthly'}];
    this.collectionfrequencyOptions = [{id:"Daily", name: 'Daily'}, {id:"Monthly", name: 'Monthly'}];
    this.intPayableCycleOptions = [{id:"Monthly", name: 'Monthly'}, {id:"Quarterly", name: 'Quarterly'},{id:"Half Yearly", name: 'Half Yearly'},{id:"At Maturity", name: 'At Maturity'}];
  }

  getMonthlyContribution() {
    let chitvalue = 0;
    if (this.chitgroupForm.controls.chitvalue != null) {
      // chitvalue = this.chitgroupForm.get('chitvalue').value;
      // chitvalue = parseInt(this.chitgroupForm.get('chitvalue').value.replace(/,/g, ''));
      chitvalue = this.chitgroupForm.get('chitvalue').value;


    }
    // console.log(isNaN(chitvalue));
    // isNaN(chitvalue) ? chitvalue = 0 : '';
    // console.log("isNaN"+chitvalue);
    
    // if (chitvalue == 0) {
    //   this.chitgroupForm.get('chitvalue').setValue('');
    //   this.monContribution = 0;
    //   return 0;
    // }
    // if (this.chitgroupForm.controls.chitduration.value && !isNaN(this.chitgroupForm.controls.chitduration.value)) {
    //   this.chitgroupForm.get('chitvalue').setValue( isNaN(chitvalue) ? '' : formatNumber(chitvalue, 'en-IN', '1.0-0'));
    //   this.monContribution = chitvalue/this.chitgroupForm.controls.chitduration.value;
    //   return formatNumber(chitvalue/this.chitgroupForm.controls.chitduration.value, 'en-IN', '1.0-0');
      
    // }

    if (this.chitgroupForm.controls.chitduration.value && this.chitgroupForm.controls.chitduration.value) {
      // this.chitgroupForm.get('chitvalue').setValue( isNaN(chitvalue) ? '' : formatNumber(chitvalue, 'en-IN', '1.0-0'));
      this.monContribution = chitvalue/this.chitgroupForm.controls.chitduration.value;
      return formatNumber(chitvalue/this.chitgroupForm.controls.chitduration.value, 'en-IN', '1.0-0');
      
    }
    else {
      this.monContribution = 0;
      return 0;
    }
    //return this.monContribution = !isNaN(this.chitgroupForm.controls.chitvalue.value) && !isNaN(this.chitgroupForm.controls.chitduration.value) ? (this.chitgroupForm.controls.chitvalue.value/this.chitgroupForm.controls.chitduration.value).valueOf() : 0;
  }

  setSelectedChargeAmount(chitValueId :any){
    console.log("chitValueId Id"+chitValueId);
    
    let chitDuration= this.AmountAppliedOptions.find( (x: any) => x.id === chitValueId).chitDuration;
    console.log(chitDuration);
    
    this.chitgroupForm.patchValue({
      chitduration: chitDuration
    })

    let minBid = this.AmountAppliedOptions.find( (x: any) => x.id === chitValueId).minPercent;
    this.chitgroupForm.patchValue({
      minBidPerct: minBid
    })

    let maxBid = this.AmountAppliedOptions.find( (x: any) => x.id === chitValueId).maxPercent;
    this.chitgroupForm.patchValue({
      maxBidPerct: maxBid
    })
  }

  validForm() {
    if(this.chitgroupForm.value.auctionday === 'CalDay') {
      if(this.chitgroupForm.get('auctiondayValue').value == ''){
        return false;
      } else {
        return true;
      }
    } else if (this.chitgroupForm.value.auctionday === 'FlexDay') {
      if(this.chitgroupForm.get('auctiondayType').value == '' || this.chitgroupForm.get('auctionweekValue').value == ''){
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  // FDR file select event 
  onFDRFileSelect($event: any) {
    this.fdrDocFile = $event.target.files[0];
    this.fdrFileName = this.fdrDocFile.name;
    this.fdrFileSize = this.fdrDocFile.size;
  }
  
  // PSO file select event 
  onPSOFileSelect($event: any) {
    this.psoDocFile = $event.target.files[0];
    this.psoFileName = this.psoDocFile.name;
    this.psoFileSize = this.psoDocFile.size;
  }

  // CC file select event 
  onCCFileSelect($event: any) {
    this.ccDocFile = $event.target.files[0];
    this.ccFileName = this.ccDocFile.name;
    this.ccFileSize = this.ccDocFile.size;
  }

  // Format the FDR Deposit Amount
  formatDepAmount(){
    let fdrDepAmount = 0;
    if (this.chitgroupForm.controls.fdrDepAmount != null) {
      fdrDepAmount = parseInt(this.chitgroupForm.get('fdrDepAmount').value.replace(/,/g, ''));
    }
    isNaN(fdrDepAmount) ? fdrDepAmount = 0 : '';
    if (fdrDepAmount == 0) {
      this.chitgroupForm.get('fdrDepAmount').setValue('');
    } else {
      this.chitgroupForm.get('fdrDepAmount').setValue(formatNumber(fdrDepAmount, 'en-IN', '1.0-0'));
    }

    this.reCalcMatuAmt();
  }

  // Format the FDR Deposit Interest Amount
  formatIntAmount() {
    let fdrRateIntAmt = 0;
    if (this.chitgroupForm.controls.fdrRateIntAmt != null) {
      fdrRateIntAmt = parseInt(this.chitgroupForm.get('fdrRateIntAmt').value.replace(/,/g, ''));
    }
    isNaN(fdrRateIntAmt) ? fdrRateIntAmt = 0 : '';
    if (fdrRateIntAmt == 0) {
      this.chitgroupForm.get('fdrRateIntAmt').setValue('');
    } else {
      this.chitgroupForm.get('fdrRateIntAmt').setValue(formatNumber(fdrRateIntAmt, 'en-IN', '1.0-0'));
    }
    this.reCalcMatuAmt();
  }

  // Re-Calculate the Maturity Amount
  reCalcMatuAmt() {
    let fdrDepAmount = 0;
    if (this.chitgroupForm.controls.fdrDepAmount != null) {
      fdrDepAmount = parseInt(this.chitgroupForm.get('fdrDepAmount').value.replace(/,/g, ''));
    }

    let fdrRateIntAmt = 0;
    if (this.chitgroupForm.controls.fdrRateIntAmt != null) {
      fdrRateIntAmt = parseInt(this.chitgroupForm.get('fdrRateIntAmt').value.replace(/,/g, ''));
    }
    let fdrMatuAmount = fdrDepAmount + fdrRateIntAmt;
    if (fdrMatuAmount > 0) {
      this.chitgroupForm.get('fdrMatuAmount').setValue(formatNumber(fdrMatuAmount, 'en-IN', '1.0-0'));
    } else {
      this.chitgroupForm.get('fdrMatuAmount').setValue('');
    }
  }

  // Calculate FDR Maturity Date
  calcFDRMatuDate() {
    if ( this.chitgroupForm.get('fdrIssueDate').value && this.chitgroupForm.get('fdrDuration').value) {
      let dtIssue : Date = this.chitgroupForm.get('fdrIssueDate').value;
      this.chitgroupForm.get('fdrMatuDate').setValue(new Date (dtIssue.getFullYear(), dtIssue.getMonth() + this.chitgroupForm.get('fdrDuration').value, dtIssue.getDate()));
    }
  }

  submit() {
    
    const controls = this.chitgroupForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            console.log(name);
        }
    }

    const dateFormat = this.settingsService.dateFormat;
    
    const chitgroup = this.chitgroupForm.value;

    // If FDR/PSO/CC account number provided but certificate files not uploaded, then make it mandatory
    if (chitgroup['fdrAcNumber'] && this.fdrFileName === '') {
      alert("FDR certificate copy field is required when FDR account number is provided");
      return;
    }
    if (chitgroup['psoNumber'] && this.psoFileName === '') {
      alert("PSO certificate copy field is required when PSO number is provided");
      return;
    }
    if (chitgroup['ccNumber'] && this.ccFileName === '') {
      alert("CC certificate copy field is required when CC number is provided");
      return;
    }

    chitgroup['status'] = 10;
    chitgroup.locale = this.settingsService.language.code;
    chitgroup.dateFormat = dateFormat;

    chitgroup.startdate =  this.datePipe.transform(chitgroup['startdate'] , dateFormat),
    chitgroup.fdrIssueDate =  this.datePipe.transform(chitgroup['fdrIssueDate'] , dateFormat),
    chitgroup.fdrMatuDate =  this.datePipe.transform(chitgroup['fdrMatuDate'] , dateFormat),
    chitgroup.psoAppDate =  this.datePipe.transform(chitgroup['psoAppDate'] , dateFormat),
    chitgroup.psoIssueDate =  this.datePipe.transform(chitgroup['psoIssueDate'] , dateFormat),
    chitgroup.ccAppDate =  this.datePipe.transform(chitgroup['ccAppDate'] , dateFormat),
    chitgroup.ccIssueDate =  this.datePipe.transform(chitgroup['ccIssueDate'] , dateFormat),
    // chitvalue = this.chitgroupForm.get('chitvalue').value;
    chitgroup.chitvalue = chitgroup['chitvalue'];
    chitgroup.fdrMatuAmount = parseInt(chitgroup['fdrMatuAmount'].replace(/,/g, ''));
    chitgroup.fdrDepAmount = parseInt(chitgroup['fdrDepAmount'].replace(/,/g, ''));
    chitgroup.fdrRateIntAmt = parseInt(chitgroup['fdrRateIntAmt'].replace(/,/g, ''));

    chitgroup.chitduration = chitgroup['chitduration'];
    chitgroup.enrollmentFees = parseInt(chitgroup['enrollmentFees']);
    chitgroup.monthlycontribution  = parseInt(this.monContribution.toString());

    if(this.chitgroupForm.value.auctionday === 'CalDay') {
      delete chitgroup['auctiondayType'];
      delete chitgroup['auctionweekValue'];
    }
    if(this.chitgroupForm.value.auctionday === 'FlexDay') {
      delete chitgroup['auctiondayValue'];
    }

    delete chitgroup['fdrCertFile'];
    delete chitgroup['psoCertFile'];
    delete chitgroup['ccCertFile'];
    console.log('Fields to be submitted');
    console.log(chitgroup);
    
    // Validations...
    // Min Bid is >=7% and Max Bid <=40% and Min Bid % > Max Bid%

    // if (chitgroup.minBidPerct < 7 || chitgroup.maxBidPerct > 40 || chitgroup.minBidPerct > chitgroup.maxBidPerct) {
    //   this.alertService.alert({ type: 'ChitGroup-Validation-minMaxBid-ChitVal', message: 'Min-Max Bid percentage should be between 7-40%' });
    //   return;
    // }

    // FDR Fixed Deposit amount, should be equivalent to chit value
    if (chitgroup.fdrDepAmount && chitgroup.chitvalue !== chitgroup.fdrDepAmount) {
      this.alertService.alert({ type: 'ChitGroup-Validation-DepAmt-ChitVal', message: 'FDR Deposit Amount should be equal to Chit Value' });
      return;
    }
    // FDR Fixed Deposit period - equivalent to the Chit Duration.
    if (chitgroup['fdrDuration']  && chitgroup['fdrDuration'] !== chitgroup['chitduration']) {
      this.alertService.alert({ type: 'ChitGroup-Validation-fdrDuration-ChitDuration', message: 'FDR Duration should be equal to Chit Duration' });
      return;
    }
    
    const formData: FormData = new FormData;
    formData.append('chitgroup', JSON.stringify(chitgroup).toString());
    if (this.fdrFileName !== '') {
      formData.append('fdrfile', this.fdrDocFile);
      formData.append('fdrfileSize', this.fdrFileSize.toString());      
    }

    if (this.psoFileName !== '') {
      formData.append('psofile', this.psoDocFile);
      formData.append('psofileSize', this.psoFileSize.toString());
    }

    if (this.ccFileName !== '') {
      formData.append('ccfile', this.ccDocFile);
      formData.append('ccfileSize', this.ccFileSize.toString());
    }

console.log(chitgroup);
console.log(formData.get('chitgroup'));

    this.chitgroupService.createChitGroup(formData).subscribe((response: any) => {
      this.router.navigate(['../chitgroups']);
    });
  }

}
