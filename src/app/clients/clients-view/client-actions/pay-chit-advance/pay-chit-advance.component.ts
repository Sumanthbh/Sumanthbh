/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

/** Custom Services */
import { ClientsService } from 'app/clients/clients.service';
import { SettingsService } from 'app/settings/settings.service';
import { AccountingService } from 'app/accounting/accounting.service';

import { ConfirmationDialogComponent } from 'app/shared/confirmation-dialog/confirmation-dialog.component';
import { FormDialogComponent } from 'app/shared/form-dialog/form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
/**
 * Add Clients Charge component.
 */
@Component({
  selector: 'mifosx-pay-chit-advance',
  templateUrl: './pay-chit-advance.component.html',
  styleUrls: ['./pay-chit-advance.component.scss']
})
export class PayChitAdvanceComponent implements OnInit {

  selectedOption: string;


   paymentModeOptions : any; 
  // = [
  //   {  name: "CASH", id: 1 },
  //   {  name: "CHEQUE", id: 5 },
  //   {  name: "NEFT", id: 2 },
  //   {  name: "UPI", id: 3 },
  //   {  name: "QR CODE", id: 4 },
  //   {  name: "IMPS", id: 6 },
  //   {  name: "RTGS", id: 7 }

  // ]


  /** Minimum Transaction Date allowed. */
  now = new Date();
  minDate = new Date(this.now.getFullYear() , this.now.getMonth() - 1, this.now.getDate());
  /** Maximum Transaction Date allowed. */
  maxDate = new Date();
  
  chitAdvanceForm: FormGroup;
  // Payment Mode select options
  // paymentModeOptions: any;
  /** clients Id */
  clientId: string;

  clientDataAndTemplate: any;
  currencyData: any;
  movecycleDialogRef1: any;

  // submitted = false;

  /**
   * Retrieves charge template data from `resolve`
   * @param {FormBuilder} formBuilder Form Builder
   * @param {ActivatedRoute} route Activated Route
   * @param {Router} router Router
   * @param {DatePipe} datePipe Date Pipe
   * @param {ClientsService} clientsService Clients Service
   * @param {SettingsService} settingsService Setting service
   * @param {MatDialog} dialog Dialog
   */
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private clientsService: ClientsService,
    public dialog: MatDialog,
    private settingsService: SettingsService,
    private accountService: AccountingService
  ) {
    this.route.data.subscribe((data: { clientActionData: any }) => {
      // this.paymentModeOptions = data.paymentMode;
      this.clientDataAndTemplate = data.clientActionData;
      console.log(data);
      accountService.getPaymentTypes().subscribe(paymentModes => {
        this.paymentModeOptions = paymentModes;
      });
      
      accountService.getCurrencies().subscribe(currencies => {
        this.currencyData = currencies.selectedCurrencyOptions;
      });

    });
    this.clientId = this.route.parent.snapshot.params['clientId'];
  }

  ngOnInit() {
    this.createChitAdvanceForm();
  }

  /**
   * Creates the Clients Charge form.
   */
   createChitAdvanceForm() {
    this.chitAdvanceForm = this.formBuilder.group({
      'officeId':[{value: this.clientDataAndTemplate.officeId, disabled: true}],
      'staffId': [{value: this.clientDataAndTemplate.staffId, disabled: true}],
      'firstname':[{ value: this.clientDataAndTemplate.firstName, disabled: true } ],
      'paymentTypeId': ['', Validators.required],
      'transactionDate':['', Validators.required],
      'depositedDate':[''],
      'receiptNumber':['', Validators.required],
      'currency': [],
      'amount': ['', Validators.required],
      // 'accountNumber':[],
      'checkNumber':[''],
      'routingCode':[],
      'bankNumber':[],
      'transactionNo':[],
      'paymentNote':[]

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

payAdv(){

  const payadvDialogRef1 = this.dialog.open(ConfirmationDialogComponent, {
    data: { heading: 'Confirm', dialogContext: 'Are you sure want to pay Chit Advance', type: 'Mild' }
  });
  payadvDialogRef1.afterClosed().subscribe(response =>{
    if(response) {
      this.payAdvAmt();
    }

    this.movecycleDialogRef1 = null;
  
    // }
   });
   

}

payAdvAmt()
{

let chitAdvance = this.chitAdvanceForm.value
this.clientsService.createChitAdvance(this.clientId, chitAdvance).subscribe( () => {
  alert("Advance Paid Successfully");
  this.router.navigate(['../../'], { relativeTo: this.route });
});
}
  /**
   * Submits Client charge.
   */
  submit() {

    // this.submitted = true;

    // if(this.chitAdvanceForm.invalid){
    //   return;

    // }
    const chitAdvance = this.chitAdvanceForm.value;
    console.log(chitAdvance);

    delete chitAdvance['officeId'];
    delete chitAdvance['staffId'];
    // delete chitAdvance['depositedDate'];


    const dateFormat = this.settingsService.dateFormat;
    chitAdvance.dateFormat = dateFormat;
    chitAdvance.locale = this.settingsService.language.code;
    chitAdvance.transactionDate = this.datePipe.transform(chitAdvance.transactionDate, dateFormat);
    chitAdvance.depositedDate = this.datePipe.transform(chitAdvance.depositedDate, dateFormat);

  }

  }
