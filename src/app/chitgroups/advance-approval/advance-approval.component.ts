/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {formatNumber} from '@angular/common';
import "@angular/common/locales/global/en-IN";
import { DatePipe } from '@angular/common';
import { OrganizationService } from 'app/organization/organization.service';

/** Custom Components */
import { DeleteDialogComponent } from 'app/shared/delete-dialog/delete-dialog.component';
import { ChitGroupsService } from 'app/chitgroups/chitgroups.service';
import { ConfirmationDialogComponent } from 'app/shared/confirmation-dialog/confirmation-dialog.component';

/**
 * Collection Approval Component.
 */
@Component({
  selector: 'mifosx-advance-approval',
  templateUrl: './advance-approval.component.html',
  styleUrls: ['./advance-approval.component.scss']
})
export class AdvanceApprovalComponent implements OnInit {
  officeOptions : any;
  staffOptions: any;
  advApproveHeaderForm: FormGroup;  
  collectionData : any = [];
  paymentModes: [];
  displayedColumns =  ['FirstName', 'amount', 'tranId', 'RecieptNumber', 'isprocessed'];
  
  now = new Date();
  minDate = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate() - 10);
  maxDate = new Date();
  advapproveDialogRef1: any;

  /**
   * @param {ActivatedRoute} route Activated Route.
   * @param {ChitGroupsService} chitgroupService ChitGroupsService.
   * @param {Router} router Router for navigation.
   * @param {FormBuilder} formBuilder Form Builder.
   * @param {MatDialog} dialog Dialog reference.
   */
  constructor(private route: ActivatedRoute,
              private chitgroupService: ChitGroupsService,
              private organizationService: OrganizationService,
              private router: Router,
              private datePipe: DatePipe,
              private formBuilder: FormBuilder,
              private dialog: MatDialog) {
    this.route.data.subscribe((data: { offices: any, paymentModes: any }) => {
      this.officeOptions = data.offices;
      this.paymentModes = data.paymentModes;

      console.log(data);
    });
  }

  /**
   * Creates and initializes the form.
   */
  ngOnInit() {
    this.createCollectionForm();
    this.initCollectionForm();
  }

  createCollectionForm() {
    this.advApproveHeaderForm = this.formBuilder.group({
      'collectionsFormArr': this.formBuilder.array([]),
      'officeId': [''],
      'staffId': ['', Validators.required],
      'date':['', Validators.required]
    });
  }

  initCollectionForm() {
    this.advApproveHeaderForm.get('officeId').valueChanges.subscribe((option: any) => {
      this.organizationService.getStaff(option).subscribe(data => {
        this.staffOptions = data;
      });
    });
  }

  get collApproveFormArr(): FormArray {
    return this.advApproveHeaderForm.get('collectionsFormArr') as FormArray;
  }


  getCollections() {
    //Date date = this.collApproveForm.get('officeId').value;
    //console.log(this.collApproveHeaderForm.get('officeId').value);
    const selStaffId = this.advApproveHeaderForm.get('staffId').value;
    const selDate = this.datePipe.transform(this.advApproveHeaderForm.get('date').value, "yyyy-MM-dd");
    console.log(selStaffId + " ,  "+ selDate);

    // reset variables..
    this.collectionData = [];
    //console.log(this.collApproveFormArr);
    this.collApproveFormArr.clear();
    
    if (selStaffId && selDate) {
      this.chitgroupService.getAdvancebyClient(selStaffId, selDate)
      .subscribe((response: any) => {
        let groupedData  = response.reduce(function (r : any, a : any) {
            r[a.type] = r[a.type] || [];
            r[a.type].push(a);
            return r;
        }, Object.create(null));
        // 
          this.paymentModes.forEach( (paymentMode: any) => {
            //console.log(paymentMode);
            //console.log(groupedData[paymentMode.id]);
            if(groupedData[paymentMode.id]){
              let obj = new Object();
              obj["paymentMode"] = paymentMode.name;
              //obj['paymentMode'] = paymentMode.name;
              let subTotalAmount = 0;
              let tempFormArray: any[] = [];
              groupedData[paymentMode.id].forEach((each: any) => {
                // multiple collection rows for this payment mode
                let formGroup = this.createCollectionRow(each);
                this.collApproveFormArr.push(formGroup);
                tempFormArray.push(formGroup);
                subTotalAmount = subTotalAmount + each.amount;
              });
              obj["subTotalAmount"] = subTotalAmount;
              obj['formArray'] = tempFormArray;
              console.log(obj);
              this.collectionData.push(obj);
            }

          })
      });

    } else {
      alert ("Please select an Agent and Date");
    }
  }

  /**
   * Creates collection Rows form.
   */
   createCollectionRow(collection?: any): FormGroup {
    return this.formBuilder.group({
      'FirstName': [collection.FirstName],
      'clientId': [collection.clientid],
      'tranId': [collection.TransactionId],
      'RecieptNumber': [collection.RecieptNumber],
      'amount': [collection.amount],
      'isprocessed': [true]
    });
  }


  changeProcessCheckBox (row : any) {
    console.log(row);
    console.log("1"+row.controls.isprocessed.value);
    console.log('step-1');
    
    row.controls.isprocessed.value = !row.controls.isprocessed.value; 
    console.log("2"+row.controls.isprocessed.value);
    console.log(row);
  }


  advaApproval()
  {
    const advapproveDialogRef1 = this.dialog.open(ConfirmationDialogComponent, {
      data: { heading: 'Confirm', dialogContext: 'Are you sure want to Approve Advance Collection', type: 'Mild' }
    });
    advapproveDialogRef1.afterClosed().subscribe(response =>{
      if(response) {
        this.onSubmit();
      }
      this.advapproveDialogRef1 = null;
  });
  } 
  
  // changeCreditedAmount(row: any, amount: any) {
  //   row.controls.creditedAmount.value = amount;
  // }

  /**
   * on Submit
   */
  onSubmit() {
    console.log('step-2');
    
    console.log( this.collApproveFormArr);
    let dataToSubmit : any = [];
    this.collApproveFormArr.controls.forEach((eachRow:any) => {
      if (eachRow.controls.isprocessed.value){
        console.log(eachRow);
        console.log("ID ="); console.log(eachRow.controls.tranId.value);
        console.log("CreditedAmount ="); console.log(eachRow.controls.amount.value);
        // if (eachRow.controls.creditedAmount.value <= 0 ){
        //   alert ("Incorrect number entered in Credited Amount field");
        //   return;
        // }
        const rowData = {id : eachRow.value.tranId.value};
        // if (isNaN(eachRow.controls.amount.value)){
        //   console.log('not a number');
        // } else {
        //   console.log('is a number >' + eachRow.controls.amount.value);
        //   rowData['amount'] = eachRow.controls.amount.value;
        // }
        rowData['tranId'] = eachRow.controls.tranId.value;
        rowData['clientId'] = eachRow.controls.clientId.value;
        rowData['isprocessed'] = true;
        dataToSubmit.push(rowData);
      }
    })
    if (dataToSubmit.length > 0) {
      console.log(dataToSubmit);
      this.chitgroupService.processAdvance(dataToSubmit).subscribe((response) => {
        console.log(response);
        if (response && response['status'] === "Success") {
          alert ('Advance Collection Approved successfully!');
          this.router.navigate(['../'], { relativeTo: this.route });
          // this.getCollections();
        } else {
          alert ('Processing failed. !');
        }
      });
    }
    // const advance = this.advApproveHeaderForm.value.collectionsFormArr
    // console.log(advance);
    
    // this.chitgroupService.processAdvance(advance).subscribe((response : any) => {
    //       console.log(response);
    //       if (response && response['status'] === "Success") {
    //         alert (' Advance Collection Approved successfully!');
    //         this.getCollections();
    //       } else {
    //         alert ('Processing failed. !');
    //       }
    //     });
  }
 

  
 
}
