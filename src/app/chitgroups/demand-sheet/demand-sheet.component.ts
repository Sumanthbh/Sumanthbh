import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ChitGroupsService } from '../chitgroups.service';
import { SettingsService } from 'app/settings/settings.service';
import { OrganizationService } from 'app/organization/organization.service';

@Component({
  selector: 'mifosx-demand-sheet',
  templateUrl: './demand-sheet.component.html',
  styleUrls: ['./demand-sheet.component.scss']
})
export class DemandSheetComponent implements OnInit {

  /**Demand sheet form */
  demandsheetForm : FormGroup;
  /**Employee, Office, Payment type and currency options */
  officeOptions : any;
  employeeOptions : any; 
  paymentModeOptions : any;
  currencyData : any;
  /**Employee ID */
  employeeId : any;

  /**Client options */
  clientOptions : any[]; 

  /**Aphabets to search client*/
  searchAlpha : any;

  demandDetails : any[] ;
  

  /** Maximum Transaction Date allowed. */
  maxDate = new Date();

  selectedOption: string;

  constructor( private route : ActivatedRoute,
               private router : Router,
               private formBuilder : FormBuilder,
               private chitGroupsService : ChitGroupsService,
               private datePipe : DatePipe,
               private settingsService : SettingsService,
               private organizationService : OrganizationService) {
    this.route.data.subscribe( (data : {offices: any, paymentType : any, currencies: any }) => {
      this.officeOptions = data.offices;
      this.paymentModeOptions = data.paymentType;
      console.log(this.paymentModeOptions);
      
      this.currencyData = data.currencies.selectedCurrencyOptions;
      console.log(this.currencyData)
    })
   }

   ngOnInit() {
    this.createDemandSheetForm();
    this.initDemandSheetForm();
  }

  createDemandSheetForm(){
    this.demandsheetForm = this.formBuilder.group({
      'date': [new Date()],
      'officeId': [''],
      'collections': this.formBuilder.array([]),
      'paymentInfo': this.formBuilder.group({
        'paymentTypeId': ['', Validators.required],
        'transactionDate':['', Validators.required],
        'depositedDate':[''],
        'receiptNumber':['', Validators.required],
        'currency': [],
        'amount':['',Validators.required],
        'accountNumber':[],
        'checkNumber':[''],
        'routingCode':[],
        'bankNumber':[],
        'transactionNo':[],
      }), 
    })
  }
  initDemandSheetForm() {
    this.demandsheetForm.get('officeId').valueChanges.subscribe((option: any) => {
      this.organizationService.getStaff(option).subscribe(data => {
        this.employeeOptions = data;
      });
    });
  }
  searchClient(event: any){
    this.searchAlpha = event.target.value;
    if(this.searchAlpha == null || this.searchAlpha ===''){
      this.demandDetails = null
    }
    else{
    this.chitGroupsService.getClientsByStaffId(this.searchAlpha, this.employeeId).subscribe((response: any) => {
      this.clientOptions = response.pageItems
      })
    }
  }
  select(clientId: any){
    this.demandsheetForm.value.collections.forEach((a:any) => this.collections.removeAt(a))
  this.chitGroupsService.getChitDemandForClient(clientId,this.datePipe.transform(this.demandsheetForm.controls.date.value, "yyyy-MM-dd")).subscribe((response : any[]) =>{
      if(response.length!=0){
        this.demandDetails = response;
        console.log(this.demandDetails);
        this.displayDemandForm()
      }
    })
    
  }
  displayFn(subject : any){
    return subject ? subject.displayName : undefined
  }
  getPaymentModeName () {
    if (this.paymentModeOptions){
  
    return this.paymentModeOptions.find((Obj: any) => Obj.id === this.selectedOption)?.name
  }
  else
  {
     return '';
  }
 }
/**
   * Gets the demand form array.
   * @returns {FormArray} demand form array.
   */
 get collections(): FormArray {
  return this.demandsheetForm.get('collections') as FormArray;
}
 displayDemandForm() {
  this.demandDetails.forEach((demand: any) => {
    console.log(demand);
    
    this.collections.push(this.showDemands(demand));
    console.log(this.collections)
  });
}
showDemands(demand?: any): FormGroup{
  return this.formBuilder.group({
    'PaidAmount': [],
    'demandDate': [this.datePipe.transform(this.demandsheetForm.controls.date.value, "yyyy-MM-dd")],
    'DemandScheduleId':[demand.ChitDemandId],
    'ChitSubscriberChargeId':[demand.chitSubsChargeId],
    'ChitSubsId':[demand.chitGroupSubscriberId],
    'ChitId':[demand.chitGroupId],
    'ClientId':[demand.ClientId]
  });
}
totalAmount(){
  let sum: number = 0;
  console.log(this.collections)
  this.demandsheetForm.value.collections.forEach((a:any) => sum += parseFloat(a.PaidAmount))
  console.log(sum)
  this.demandsheetForm.controls.paymentInfo.patchValue({
    amount: sum
  });
}
 submit(){
   var demandSheet = this.demandsheetForm.value;
   const dateFormat = this.settingsService.dateFormat;
   demandSheet.paymentInfo.dateFormat = dateFormat;
   demandSheet.paymentInfo.locale = this.settingsService.language.code;
   demandSheet.date = this.datePipe.transform(demandSheet.date, dateFormat);
   demandSheet.paymentInfo.transactionDate = this.datePipe.transform(demandSheet.paymentInfo.transactionDate, dateFormat);
   demandSheet.paymentInfo.depositedDate = this.datePipe.transform(demandSheet.paymentInfo.depositedDate, dateFormat);
   console.log(demandSheet)
   this.chitGroupsService.addChitDemand(demandSheet).subscribe((response :any) => {
    alert ('Collections submitted successfully!');
    this.router.navigate(['/home'], { relativeTo: this.route });
  });
 }
}
