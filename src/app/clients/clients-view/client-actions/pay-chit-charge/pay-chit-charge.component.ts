/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

/** Custom Services */
import { ClientsService } from '../../../clients.service';
import { SettingsService } from '../../../../settings/settings.service'; 
import { AccountingService } from '../../../../accounting/accounting.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'app/shared/confirmation-dialog/confirmation-dialog.component';
/**
 * Add Clients Charge component.
 */
@Component({
  selector: 'mifosx-pay-chit-charge',
  templateUrl: './pay-chit-charge.component.html',
  styleUrls: ['./pay-chit-charge.component.scss']
})
export class PayChitChargeComponent implements OnInit {

  selectedOption: string;


   paymentModeOptions : any; 
   chargeTypeOptions : any=[];
   chitGroupOptions : any =[];
  chitGroupIdOptions : any;
 

  /** Minimum Transaction Date allowed. */
  now = new Date();
  minDate = new Date(this.now.getFullYear() , this.now.getMonth() - 1, this.now.getDate());
  /** Maximum Transaction Date allowed. */
  maxDate = new Date();
  
  chitChargeForm: FormGroup;
  
  clientId: string;

  clientDataAndTemplate: any;
  currencyData: any;
  paychargeDialogRef1: any;

  

  /**
   * Retrieves charge template data from `resolve`
   * @param {FormBuilder} formBuilder Form Builder
   * @param {ActivatedRoute} route Activated Route
   * @param {Router} router Router
   * @param {DatePipe} datePipe Date Pipe
   * @param {ClientsService} clientsService Clients Service
   * @param {MatDialog} dialog Dialog
   * @param {SettingsService} settingsService Setting service
   */
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private clientsService: ClientsService,
    private settingsService: SettingsService,
    private accountService: AccountingService
  ) {
    this.route.data.subscribe((data: { clientActionData: any }) => {
      
      this.clientDataAndTemplate = data.clientActionData;
      console.log(data);
      accountService.getPaymentTypes().subscribe(paymentModes => {
        this.paymentModeOptions = paymentModes;
      });
      
      accountService.getCurrencies().subscribe(currencies => {
        this.currencyData = currencies.selectedCurrencyOptions;
      });

      clientsService.getChargeList().subscribe(chargeTypeList =>{
        this.chargeTypeOptions = chargeTypeList;
      }) 

    });
    this.clientId = this.route.parent.snapshot.params['clientId'];

    clientsService.getChitGroupList(this.clientId).subscribe(chitGroupList =>{
      this.chitGroupOptions = chitGroupList;
      console.log(this.chitGroupOptions);
      
    })

    clientsService.getChitGroupIdList(this.clientId).subscribe(chitGroupIdList =>{
      this.chitGroupIdOptions = chitGroupIdList;
    })
  }

  ngOnInit() {
    this.createChitChargeForm();
  }

  /**
   * Creates the Clients Charge form.
   */
   createChitChargeForm() {
    this.chitChargeForm = this.formBuilder.group({
      'officeId':[{value: this.clientDataAndTemplate.officeId, disabled: true}],
      'staffId': [{value: this.clientDataAndTemplate.staffId, disabled: true}],
      'firstname':[{ value: this.clientDataAndTemplate.firstName, disabled: true } ],
      'chitChargeId': ['', Validators.required],
      'amount':[''],
      'paymentInfo': this.formBuilder.group({
            'amount': [''],
            'currency': [],
            'transactionDate':['', Validators.required],
            'paymentTypeId': ['', Validators.required],
            'depositedDate':[''],
            'receiptNumber':['', Validators.required],
            'checkNumber':[''],
            'routingCode':[],
            'bankNumber':[],
            'transactionNo':[],
            // 'paymentNote':[],
      }),
      'chitNumber':[],
      'chitId':[],
      'clientId':[this.clientId],
      
    });
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

setSelectedChargeAmount(chargeTypeId :any){
  console.log("CharegeType Id"+chargeTypeId);
  
  let ChargeAmount= this.chargeTypeOptions.find( (x: any) => x.id == chargeTypeId).amount;
  console.log(ChargeAmount);
  
  this.chitChargeForm.patchValue({
    amount: ChargeAmount
  })
  this.chitChargeForm.controls.paymentInfo.patchValue({
    amount : ChargeAmount
  })
}

payCharge()
{
  const paychargeDialogRef1 = this.dialog.open(ConfirmationDialogComponent, {
    data: { heading: 'Confirm', dialogContext: 'Are you sure want to pay Chit Charge', type: 'Mild' }
  });
  paychargeDialogRef1.afterClosed().subscribe(response =>{
    if(response) {
      this.payChargeAmt();
    }
    this.paychargeDialogRef1 = null;
});
}

payChargeAmt()
{
  let chitCharge = this.chitChargeForm.value
  this.clientsService.createChitCharge(this.clientId, chitCharge).subscribe( () => {
    alert("Charges Paid Successfully");
    this.router.navigate(['../../'], { relativeTo: this.route });
  });
}

  /**
   * Submits Client charge.
   */
  submit() {

    
    const chitCharge = this.chitChargeForm.value;
    console.log(chitCharge);

    delete chitCharge['officeId'];
    delete chitCharge['staffId'];
    


    const dateFormat = this.settingsService.dateFormat;
    chitCharge.paymentInfo.dateFormat = dateFormat;
    chitCharge.paymentInfo.locale = this.settingsService.language.code;
    chitCharge.paymentInfo.transactionDate = this.datePipe.transform(chitCharge.paymentInfo.transactionDate, dateFormat);
    chitCharge.paymentInfo.depositedDate = this.datePipe.transform(chitCharge.paymentInfo.depositedDate, dateFormat);

    
  }

  }
