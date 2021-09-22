/** Angular Imports */
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormDialogComponent } from 'app/shared/form-dialog/form-dialog.component';
import { AccountingService } from '../../accounting/accounting.service';
import { ProductsService } from '../../products/products.service';
import { ConfirmationDialogComponent } from 'app/shared/confirmation-dialog/confirmation-dialog.component';
import { ChitGroupsService } from '../chitgroups.service';
import { DatePipe } from '@angular/common';

/**
 * View payout entry dialog component.
 */
 @Component({
  selector: 'mifosx-view-payout-entry',
  templateUrl: './view-payout-entry.component.html',
  styleUrls: ['./view-payout-entry.component.scss']
})
export class ViewPayoutEntryComponent  implements OnInit {
  viewPayoutForm: FormGroup;
   chargeTypeOptions: any;
   bankglAccountOptions: any;
   paymentModeOptions : any;
   selectedOption: string;
   paymentModes: any;
   currencyData: any;

   officeId: string;

   /** Minimum Transaction Date allowed. */
  now = new Date();
  minDate = new Date(this.now.getFullYear() , this.now.getMonth() - 1, this.now.getDate());
  /** Maximum Transaction Date allowed. */
  maxDate = new Date();
   payoutDialogRef1: any;

  /**
   * @param {MatDialogRef} dialogRef Component reference to dialog.
   * @param {any} data Provides payout entry.
   * @param {MatDialog} dialog Dialog reference.
   */
  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private chitgroupService: ChitGroupsService,
    public dialog: MatDialog,
    private router: Router,
    private datePipe : DatePipe,
    private accountService: AccountingService,
    private productsService: ProductsService,
    public dialogRef: MatDialogRef<ViewPayoutEntryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.route.data.subscribe((data: { paymentModes: any }) => {
                  this.paymentModes = data.paymentModes;
            
                  console.log(data);
                  accountService.getPaymentTypes().subscribe(paymentModes => {
                    this.paymentModeOptions = paymentModes;
                  });
                  
                  accountService.getCurrencies().subscribe(currencies => {
                    this.currencyData = currencies.selectedCurrencyOptions;
                  });
            
                });
               console.log(this.data.officeId);
               this.productsService.getConfiguredBranche(this.data.officeId,true).subscribe(bankglAccount => {
                 this.bankglAccountOptions = bankglAccount;
               });
               
                
               }
               
  ngOnInit() {
    this.createPayoutForm();
  }

  createPayoutForm(){
    this.viewPayoutForm = this.formBuilder.group({
      // 'officeId': [''],
      // 'staffId': [''],
      // 'date':[''],
      'chitName':[''],
      'firstname':[''],
      'bidDate':[''],
      'SubscriptionPayable':[''],
      'chitId':[''],
      'paymentInfo': this.formBuilder.group({
        'amount': [this.data.PayoutEntry.SubscriptionPayable],
        'currency': [],
        'transactionDate':['', Validators.required],
        'paymentTypeId': ['', Validators.required],
        'depositedDate':[],
        'receiptNumber':['', Validators.required],
        'checkNumber':[],
        'accId':[],
        'officeId': [],
        'routingCode':[],
        'bankNumber':[],
        'transactionNo':[],
  }),
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

subPayout(){
  const payoutDialogRef1 = this.dialog.open(ConfirmationDialogComponent, {
    data: { heading: 'Confirm', dialogContext: 'Are you sure want to Pay Subscriber', type: 'Mild' }
  });
  payoutDialogRef1.afterClosed().subscribe(response =>{
    if(response) {
      this.payoutSub();
    }
    this.payoutDialogRef1 = null;
});
}
payoutSub(){
  var paymentinfo = this.viewPayoutForm.value;
  console.log(paymentinfo);
  
  const accglId = this.viewPayoutForm.value.paymentInfo.accId;
  let transDate = this.datePipe.transform(this.viewPayoutForm.value.paymentInfo.transactionDate,'yyyy-MM-dd');
  paymentinfo.paymentInfo.transactionDate = transDate;
  this.chitgroupService.postPayout(this.data.PayoutEntry.SubscriberId,
    this.data.PayoutEntry.bidId, transDate,this.data.PayoutEntry.SubscriptionPayable, accglId,
    paymentinfo ).subscribe( (response: any) => {
    if (response && response['Status'] === "Success"){
    alert("Payout Successfull");
    window.location.reload();
    this.router.navigate(['/home'], { relativeTo: this.route });
    }else{
      alert ('Processing failed. !');
    }
  });
}

onClose() {
  this.dialogRef.close();
}

  

}
