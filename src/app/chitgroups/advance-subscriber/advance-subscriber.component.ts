/** Angular Imports */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from 'app/shared/form-dialog/form-dialog.component';
import {formatNumber} from '@angular/common';
import "@angular/common/locales/global/en-IN";
import { DatePipe } from '@angular/common';
import { OrganizationService } from 'app/organization/organization.service';

/** Custom Components */
import { DeleteDialogComponent } from 'app/shared/delete-dialog/delete-dialog.component';
import { ChitGroupsService } from 'app/chitgroups/chitgroups.service';
import { ClientsService } from '../../clients/clients.service';
import { FormfieldBase } from 'app/shared/form-dialog/formfield/model/formfield-base';
import { CheckboxBase } from 'app/shared/form-dialog/formfield/model/checkbox-base';
import { InputBase } from 'app/shared/form-dialog/formfield/model/input-base';
import { DatepickerBase } from 'app/shared/form-dialog/formfield/model/datepicker-base';
import { ConfirmationDialogComponent } from 'app/shared/confirmation-dialog/confirmation-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewPayoutEntryComponent } from '../view-payout-entry/view-payout-entry.component';

/**
 * Collection Approval Component.
 */
 @Component({
  selector: 'mifosx-advance-subscriber',
  templateUrl: './advance-subscriber.component.html',
  styleUrls: ['./advance-subscriber.component.scss']
})
export class AdvanceSubscriberComponent implements OnInit {

  /** ChitGroup view data */
  chitgroupViewData: any;

  private chitName:string;
  private firstname :string;
  private SubscriptionPayable:string;

  officeOptions : any;
  staffOptions: any;
  advApproveHeaderForm: FormGroup;  
  collectionData : any = [];
  paymentModes: [];
  displayedColumns =  ['ticketNumber', 'SubscriberId', 'bidId', 'chitName', 'firstname', 'bidAmount', 'SubscriptionPayable', 'Action'];
  
  now = new Date();
  minDate = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate() - 10);
  maxDate = new Date();
  advapproveDialogRef1: any;
   chitGroupOptions: any = [];

    /** Paginator for configuredBranch table. */
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

     /** Data source for offices table. */
     dataSource: MatTableDataSource<any>;

   clientId: string;
   officeId: any;
   payoutmember: any[];
  

  /**
   * @param {ActivatedRoute} route Activated Route.
   * @param {ChitGroupsService} chitgroupService ChitGroupsService.
  * @param {ClientsService} clientsService Clients Service
   * @param {Router} router Router for navigation.
   * @param {FormBuilder} formBuilder Form Builder.
   * @param {MatDialog} dialog Dialog reference.
   */
  constructor(private route: ActivatedRoute,
              private chitgroupService: ChitGroupsService,
              private organizationService: OrganizationService,
              private router: Router,
              private clientsService: ClientsService,
              private datePipe: DatePipe,
              private formBuilder: FormBuilder,
              private dialog: MatDialog) {
    this.route.data.subscribe((data: { chitgroupViewData: any, offices: any, paymentModes: any }) => {
      this.officeOptions = data.offices;
      this.chitgroupViewData = data.chitgroupViewData;
      this.paymentModes = data.paymentModes;

      console.log(data);
    });
  
  }
  

  /**
   * Creates and initializes the form.
   */
  ngOnInit() {
    this.createCollectionForm();
    // this.summaryform();
  }

  createCollectionForm() {
    this.advApproveHeaderForm = this.formBuilder.group({
      'collectionsFormArr': this.formBuilder.array([]),
      'officeId': [''],
      'staffId': [''],
      'date':[''],
      'chitId':['']
    });
  }

  ShowChitGroup(officeId: number){
     console.log(officeId);
    this.officeId = officeId;
  this.chitgroupService.getChitGroupsByOfficeId(officeId).subscribe((data: { pageItems: any}) => {
    this.chitGroupOptions = data.pageItems;

  });
  }

  get collApproveFormArr(): FormArray {
    return this.advApproveHeaderForm.get('collectionsFormArr') as FormArray;
  }
 
  getCollections(chitGroupid:number){


    this.collectionData = [];

    this.collApproveFormArr.clear();
    if(chitGroupid){
    this.chitgroupService.getPayOutClient(chitGroupid).subscribe( (data: {ListOfSubscribersTobePaid: any}) => {
      console.log(chitGroupid);
      
      this.payoutmember = data.ListOfSubscribersTobePaid;
      console.log(this.payoutmember);
      this.dataSource = new MatTableDataSource(this.payoutmember);
      this.dataSource.paginator = this.paginator;
      
    });
  }else{
    alert ("Please select an Branch and Chitgroup");
  }
  console.log(this.officeId);
  
    
    // this.summaryform();
  }

  /**
   * View details of selected Payout entry.
   * @param {any} PayoutEntry Selected Payout entry.
   */
   viewPayoutEntry(PayoutEntry: any) {
    this.dialog.open(ViewPayoutEntryComponent, {
      data: { PayoutEntry: PayoutEntry, officeId: this.officeId }
    });
    console.log(PayoutEntry);
    
  }

  // paynow(){
  //   {
  //     let id = this.chitgroupViewData.id;
  //     console.log(id);
  //     this.chitgroupService.getPayOutClient(id).subscribe(response => {
  //       this.chitName  = response['chitName'];
  //       this.firstname = response['firstname'];
  //       this.SubscriptionPayable= response['SubscriptionPayable'];
  //       const data = {
  //         title: 'Pay Now',
  //         formfields: this.getPopupDialogFormFields2('Dialog2'),
  //         layout: { addButtonText: 'Ok' },
  //       };
       
  //       const auctionDialogRef2 = this.dialog.open(FormDialogComponent, { data });
  //       auctionDialogRef2.afterClosed().subscribe((dialog2Response: any) => {
  
  //         // this.chitgroupService.allotPrize(id,dialog2Response.data.value).subscribe((res: any) => {
  
  //         //   if(res === 'success'){
  //         //     alert("Successfully Alotted Prize Money to " +this.name)
  //         //     window.location.reload();
  //         //   }
            
  
  //         // });
  //       });
  //     }
  //     );
  //   }
  
  // }

  // Generate Dialog fields 
  // getPopupDialogFormFields2(formType?: string) {
    
  //   let formfields: FormfieldBase[] = [];
  //     if (formType === 'Dialog2') {
  //       formfields.push(new InputBase({
  //         controlType : "Read-Only",
  //         controlName: 'chit Name',
  //         label: 'chitName',
  //         value : '',
  //         order: 1,
  //         readonly: true
  //       }));
  //       formfields.push(new InputBase({
  //         controlName: 'firstname',
  //         label: 'first Name',
  //         value: '',
  //         type: 'text',
  //         order: 2,
  //         readonly: true
  //       }));
  //       formfields.push(new InputBase({
  //         controlName: 'SubscriptionPayable',
  //         label: 'Subscription Payable',
  //         value: '',
  //         type:'number',
  //         order: 3,
  //         readonly: true
  //       }));
        // formfields.push(new InputBase({
        //   controlName: 'chitnumber',
        //   label: 'Chit Number',
        //   value: '',
        //   type:'number',
        //   order: 4,
        //   readonly: true
        // }));
        // formfields.push(new InputBase({
        //   controlName: 'bidAmount',
        //   label: 'Bid Amount',
        //   value: '',
        //   type:'number',
        //   order: 5,
        //   readonly: true
        // }));
        // formfields.push(new InputBase({
        //   controlName: 'EmiAmount',
        //   label: 'EMI Amount',
        //   value: '0.0',
        //   type: 'number',
        //   order: 6,
        // }));
        // formfields.push(new CheckboxBase({
        //   controlName: "linkedCBox",
        //   label: 'Do you want to Continue ?',
        //   value: false,
        //   type: 'checkbox',
        //   required: false,
        //   order: 7
        // }));
    //   }  
      
    //   return formfields;
       
    // }

  
  // changeProcessCheckBox (row : any) {
  //   console.log(row);
  //   console.log("1"+row.controls.isprocessed.value);
  //   console.log('step-1');
    
  //   row.controls.isprocessed.value = !row.controls.isprocessed.value; 
  //   console.log("2"+row.controls.isprocessed.value);
  //   console.log(row);
  // }


  // advaApproval()
  // {
  //   const advapproveDialogRef1 = this.dialog.open(ConfirmationDialogComponent, {
  //     data: { heading: 'Confirm', dialogContext: 'Are you sure want to Approve Advance Collection', type: 'Mild' }
  //   });
  //   advapproveDialogRef1.afterClosed().subscribe(response =>{
  //     if(response) {
  //       this.onSubmit();
  //     }
  //     this.advapproveDialogRef1 = null;
  // });
  // } 
  
  
  /**
   * on Submit
   */
  // onSubmit() {
  //   console.log('step-2');
    
  //   console.log( this.collApproveFormArr);
  //   let dataToSubmit : any = [];
  //   this.collApproveFormArr.controls.forEach((eachRow:any) => {
  //     if (eachRow.controls.isprocessed.value){
  //       console.log(eachRow);
  //       console.log("ID ="); console.log(eachRow.controls.tranId.value);
  //       console.log("CreditedAmount ="); console.log(eachRow.controls.amount.value);
        
  //       const rowData = {id : eachRow.value.tranId.value};
        
  //       rowData['tranId'] = eachRow.controls.tranId.value;
  //       rowData['clientId'] = eachRow.controls.clientId.value;
  //       rowData['isprocessed'] = true;
  //       dataToSubmit.push(rowData);
  //     }
  //   })
  //   if (dataToSubmit.length > 0) {
  //     console.log(dataToSubmit);
  //     this.chitgroupService.processAdvance(dataToSubmit).subscribe((response) => {
  //       console.log(response);
  //       if (response && response['status'] === "Success") {
  //         alert ('Advance Collection Approved successfully!');
  //         this.router.navigate(['../'], { relativeTo: this.route });
          
  //       } else {
  //         alert ('Processing failed. !');
  //       }
  //     });
  //   }
   
  // }
 

  
 
}
