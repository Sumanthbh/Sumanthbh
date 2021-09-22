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
  selector: 'mifosx-charge-approval',
  templateUrl: './charge-approval.component.html',
  styleUrls: ['./charge-approval.component.scss']
})
export class ChargeApprovalComponent  implements OnInit {
  officeOptions : any;
  staffOptions: any;
  chargeApproveHeaderForm: FormGroup;  
  collectionData : any = [];
  paymentModes: [];
  displayedColumns =  ['chitGroup', 'clientName', 'amount', 'ChargeType', 'Transactionid', 'RecieptNumber', 'isprocessed'];
  
  now = new Date();
  minDate = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate() - 10);
  maxDate = new Date();
   chargeapproveDialogRef1: any;

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
    this.chargeApproveHeaderForm = this.formBuilder.group({
      'collectionsFormArr': this.formBuilder.array([]),
      'officeId': [''],
      'staffId': ['', Validators.required],
      'date':['', Validators.required]
    });
  }

  initCollectionForm() {
    this.chargeApproveHeaderForm.get('officeId').valueChanges.subscribe((option: any) => {
      this.organizationService.getStaff(option).subscribe(data => {
        this.staffOptions = data;
      });
    });
  }

  get collApproveFormArr(): FormArray {
    return this.chargeApproveHeaderForm.get('collectionsFormArr') as FormArray;
  }


  getCollections() {
    
    const selStaffId = this.chargeApproveHeaderForm.get('staffId').value;
    const selDate = this.datePipe.transform(this.chargeApproveHeaderForm.get('date').value, "yyyy-MM-dd");
    console.log(selStaffId + " ,  "+ selDate);

    
    this.collectionData = [];
    
    this.collApproveFormArr.clear();
    
    if (selStaffId && selDate) {
      this.chitgroupService.getChargebyClient(selStaffId, selDate)
      .subscribe((response: any) => {
        let groupedData  = response.reduce(function (r : any, a : any) {
            r[a.type] = r[a.type] || [];
            r[a.type].push(a);
            return r;
        }, Object.create(null));
          this.paymentModes.forEach( (paymentMode: any) => {
            if(groupedData[paymentMode.id]){
              let obj = new Object();
              obj["paymentMode"] = paymentMode.name;
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
     console.log(collection);
    return this.formBuilder.group({
      'clientName': [collection.clientName],
      // 'clientId': [collection.clientid],
      'id': [collection.Transactionid],
      'chitGroup': [collection.chitGroup],
      'ChargeType': [collection.ChargeType],
      'Transactionid': [collection.Transactionid],
      'RecieptNumber': [collection.RecieptNumber],
      'amount': [collection.amount],
      'isprocessed': [true]
    });
  }


  changeProcessCheckBox (row : any) {
    // console.log(row);
    // console.log("1"+row.controls.isprocessed.value);
    // console.log('step-1');
    
    row.controls.isprocessed.value = !row.controls.isprocessed.value; 
    // console.log("2"+row.controls.isprocessed.value);
    // console.log(row);
  }
  
  chargeApproval()
  {
    const chargeapproveDialogRef1 = this.dialog.open(ConfirmationDialogComponent, {
      data: { heading: 'Confirm', dialogContext: 'Are you sure want to Approve Charges Collections', type: 'Mild' }
    });
    chargeapproveDialogRef1.afterClosed().subscribe(response =>{
      if(response) {
        this.onSubmit();
      }
      this.chargeapproveDialogRef1 = null;
  });
  }

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
        // console.log("ID ="); console.log(eachRow.controls.id.value);
        // console.log("CreditedAmount ="); console.log(eachRow.controls.amount.value);
        const rowData = {id : eachRow.value.Transactionid.value};
        rowData['id'] = eachRow.controls.Transactionid.value;
        // rowData['clientId'] = eachRow.controls.clientId.value;
        rowData['isprocessed'] = true;
        dataToSubmit.push(rowData);
      }
    })
    if (dataToSubmit.length > 0) {
      console.log(dataToSubmit);
      this.chitgroupService.processCharge(dataToSubmit).subscribe((response) => {
        console.log(response);
        if (response && response['status'] === "success") {
          alert ('Charges Collection Approved successfully!');
          this.router.navigate(['../'], { relativeTo: this.route });
          // this.getCollections();
        } else {
          alert ('Processing failed. !');
        }
      });
    }
  }
 
}
