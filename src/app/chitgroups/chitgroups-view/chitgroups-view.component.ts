/** Angular Imports */
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

/** Custom Dialogs */
//import { UnassignStaffDialogComponent } from './custom-dialogs/unassign-staff-dialog/unassign-staff-dialog.component';
import { DeleteDialogComponent } from 'app/shared/delete-dialog/delete-dialog.component';
import { FormDialogComponent } from 'app/shared/form-dialog/form-dialog.component';
import { ConfirmationDialogComponent } from 'app/shared/confirmation-dialog/confirmation-dialog.component';

/** Custom Services */
import { ChitGroupsService } from '../chitgroups.service';
import { isFunction, sample } from 'lodash';

import { FormfieldBase } from 'app/shared/form-dialog/formfield/model/formfield-base';
import { CheckboxBase } from 'app/shared/form-dialog/formfield/model/checkbox-base';
import { InputBase } from 'app/shared/form-dialog/formfield/model/input-base';
import { DatepickerBase } from 'app/shared/form-dialog/formfield/model/datepicker-base';
import { stringify } from '@angular/compiler/src/util';

/**
 * ChitGroups View Component.
 */
@Component({
  selector: 'mifosx-chitgroups-view',
  templateUrl: './chitgroups-view.component.html',
  styleUrls: ['./chitgroups-view.component.scss']
})
export class ChitGroupsViewComponent {

  /** ChitGroup view data */
  chitgroupViewData: any;
  /** ChitGroup datatables data */
  chitgroupDatatables: any;

  filling:any;

  private name:string;
  private adhar :string;
  private mobileno:string;
  private chitnumber :number;
  private bidAmount :number;
  // private EmiAmount :number;
  movecycleDialogRef1: any;
  closechitDialogRef1: any;
  outStandingData: any;
  /**
   * Fetches chitgroup data from `resolve`
   * @param {ActivatedRoute} route Activated Route
   * @param {ChitGroupsService} chitgroupsService ChitGroups Service
   * @param {Router} router Router
   * @param {MatDialog} dialog Dialog
   */
  constructor(private route: ActivatedRoute,
              private chitgroupsService: ChitGroupsService,
              private router: Router,
              public dialog: MatDialog,
              public datePipe: DatePipe) {
    this.route.data.subscribe((data: { chitgroupViewData: any, chitgroupDatatables: any, filling:any }) => {
      this.chitgroupViewData = data.chitgroupViewData;
      this.chitgroupDatatables = data.chitgroupDatatables;
      this.filling = data.filling;
    });
  }

  /**
   * Performs action button/option action.
   * @param {string} name action name.
   */
  doAction(name: string) {
    switch (name) {
      case 'Activate':
      case 'Manage Subscribers':
        this.router.navigate([`actions/${name}`], { relativeTo: this.route });
        break;
      case 'Delete':
        this.deleteChitGroup();
        break;
      case 'Edit':
        this.router.navigate(['edit'], { relativeTo: this.route });
        break; 
      case 'Enter Bids':
        this.router.navigate([`enterbids/${this.chitgroupViewData.currentcycle}`], { relativeTo: this.route });
        break;

        
        // case 'Allot Prize Money':
        // this.router.navigate([`firstAuctionToCompany/${this.chitgroupViewData.currentcycle}`], { relativeTo: this.route });
        // break;
    }
  }

  openDialog(){
   
    // const allotMoneyDialogRef = this.dialog.open(DialogContentExampleDialog);

    // allotMoneyDialogRef.afterClosed().subscribe(result => {
    //   console.log(`Allot Price Money: ${result}`);
    // });
    console.log('cuuurent cycle '+this.chitgroupViewData.currentcycle );
    if(this.chitgroupViewData.currentcycle == 1){
    const data = {
      title: 'First Auction is always paid to company',
      formfields: this.getPopupDialogFormFields('Dialog1'),
      layout: { addButtonText: 'Proceed' },
    };
    // console.log("auction");
    const auctionDialogRef1 = this.dialog.open(FormDialogComponent, { data });
    
    auctionDialogRef1.afterClosed().subscribe((response: any) => {
      if(response.data)
      {
        this.getdata();
      }
     
    });
  }
  else
  {
    this.bidwinner();
  }  
}


getdata()
{
  this.chitgroupsService.firstauction(this.chitgroupViewData.id).subscribe(response => {
    console.log(response);
    if(response && response['result']== 'success') {
      alert("First auction is paid to company")

    }
  });
}
  // Generate Dialog fields 
  getPopupDialogFormFields(formType?: string) {
    let formfields: FormfieldBase[] = [];
    if (formType === 'Dialog1') {
      formfields.push(new CheckboxBase({
        controlName: "linkedCBox",
        label: 'Has Everyone paid EMIs',
        value: false,
        type: 'checkbox',
        required: false,
        order: 1
        
      }));
    }  
    return formfields;
  }

  // Generate Dialog fields 
  getPopupDialogFormFields2(formType?: string) {
    
  let formfields: FormfieldBase[] = [];
    if (formType === 'Dialog2') {
      formfields.push(new InputBase({
        controlType : "Read-Only",
        controlName: 'name',
        label: 'Name',
        value : this.name,
        order: 1,
        readonly: true
      }));
      formfields.push(new InputBase({
        controlName: 'adhar',
        label: 'Aadhar',
        value: this.adhar,
        type: 'number',
        order: 2,
        readonly: true
      }));
      formfields.push(new InputBase({
        controlName: 'mobileno',
        label: 'Mobile Number',
        value: this.mobileno,
        type:'number',
        order: 3,
        readonly: true
      }));
      formfields.push(new InputBase({
        controlName: 'chitnumber',
        label: 'Chit Number',
        value: this.chitnumber,
        type:'number',
        order: 4,
        readonly: true
      }));
      formfields.push(new InputBase({
        controlName: 'bidAmount',
        label: 'Bid Amount',
        value: this.bidAmount,
        type:'number',
        order: 5,
        readonly: true
      }));
      formfields.push(new InputBase({
        controlName: 'EmiAmount',
        label: 'EMI Amount',
        value: '0.0',
        type: 'number',
        order: 6,
      }));
      formfields.push(new CheckboxBase({
        controlName: "linkedCBox",
        label: 'Do you want to Continue ?',
        value: false,
        type: 'checkbox',
        required: false,
        order: 7
      }));
    }  
    
    return formfields;
     
  }
  

  ValidateCycle(){
    if(this.chitgroupViewData.currentcycle == 1){ 
    return false;
  }
  else
  {
   return true;
  }
}

ValidateLastCycle(){
  if(this.chitgroupViewData.currentcycle == this.chitgroupViewData.chitduration){
    return true;
  }
  else
  {
    return false;
  }
}

ValidateStartCycle(){
  if(this.chitgroupViewData.currentcycle == this.chitgroupViewData.chitduration){
    return true;
  }
  else
  {
    return false;
  }
}

  nextCycle(){

    const movecycleDialogRef1 = this.dialog.open(ConfirmationDialogComponent, {
      data: { heading: 'Confirm', dialogContext: 'Are you sure you want to move to next Cycle', type: 'Mild' }
    });
    movecycleDialogRef1.afterClosed().subscribe(response =>{
      if(response) {
        this.getnextcycle();
      }

      this.movecycleDialogRef1 = null;
    
      // }
     });
     

  }
  
  closeGroup(){

    const data = {
      title: 'Are you sure want to close the chit-group',
      formfields: this.getPopupDialogFormFields4('Dialog4'),
      layout: { addButtonText: 'Confirm' },
    };
    const closeDialogRef3 = this.dialog.open(FormDialogComponent, { data });
    closeDialogRef3.afterClosed().subscribe((dialog2Response: any) => {
      console.log(dialog2Response.data.value);
      dialog2Response.data.value.dateofclosing = this.datePipe.transform(dialog2Response.data.value.dateofclosing,"yyyy-MM-dd");
      
      this.chitgroupsService.closechitcycle(this.chitgroupViewData.id,dialog2Response.data.value).subscribe(response1 => {
        if(response1 && response1['Status'] === 'Success'){
          alert("Chit Group Closed Successfully..!!!")
          window.location.reload();
        }
    
    
      });
    });
    // {
    //   const closechitDialogRef1 = this.dialog.open(ConfirmationDialogComponent, {
    //     data: { heading: 'Confirm', dialogContext: 'Are you sure want to Close Chit Group', type: 'Mild' }
    //   });
    //   closechitDialogRef1.afterClosed().subscribe(response =>{
    //     if(response) {
    //       this.closechitgroup();
    //     }
    //     this.closechitDialogRef1 = null;
    // });
    // }
  }



  // closechitgroup(){
  //   this.chitgroupsService.closechitcycle(this.chitgroupViewData.id).subscribe(response1 => {
  //     console.log(response1);
  //     if(response1 && response1['Status'] === 'Success'){
  //       alert("Chit Group Closed Successfully..!!!")
  //       window.location.reload();
  //     }
  
  
  //   });
  // }
    
  getnextcycle()
  {

    this.chitgroupsService.movetonextcycle(this.chitgroupViewData.id).subscribe(response1 => {
      console.log(response1);
      if(response1 && response1['result'] === 'Success'){
        alert("Chit Moved to Next Cycle Successfully..!!!")
        window.location.reload();
      }
  
  
    });

  }  

  getPopupDialogFormFields4(formType?: string) {
    
    let formfields: FormfieldBase[] = [];
      if (formType === 'Dialog4') {
        formfields.push(new DatepickerBase ({
          // controlType : 'datepicker',
          controlName: 'dateofclosing',
          label: 'Date of Closing',
          //  value : new Date(),
          // order: 1,
        }));
      }
      return formfields;
    }

  // Generate Dialog fields 
  // getPopupDialogFormFields3(formType?: string) {
    
  //   let formfields: FormfieldBase[] = [];
  //   if (formType === 'Dialog3') {
  //     formfields.push(new InputBase({
  //       controlType : "Read-Only",
  //       controlName: 'ClientId',
  //       label: 'Client ID',
  //       value : this.outStandingData.ClientId,
  //       order: 1,
  //       readonly: true,
  //       required: false
  //     }));
  //     formfields.push(new InputBase({
  //       controlName: 'ClientName',
  //       label: 'Client Name',
  //       value: this.outStandingData.ClientName,
  //       order: 2,
  //       readonly: true,
  //       required: false,
  //     }));
  //     formfields.push(new InputBase({
  //       controlName: 'ChitId',
  //       label: 'Chit ID',
  //       value: this.outStandingData.ChitId,
  //       type:'number',
  //       order: 3,
  //       readonly: true,
  //       required: false
  //     }));
  //     formfields.push(new InputBase({
  //       controlName: 'ChitNumber',
  //       label: 'Chit Number',
  //       value: this.outStandingData.ChitNumber,
  //       type:'number',
  //       order: 4,
  //       readonly: true,
  //       required: false
  //     }));
  //     formfields.push(new InputBase({
  //       controlName: 'ChitName',
  //       label: 'Chit Name',
  //       value: this.outStandingData.ChitName,
  //       order: 5,
  //       readonly: true,
  //       required: false
  //     }));
  //     formfields.push(new InputBase({
  //       controlName: 'DemandId',
  //       label: 'Demand ID',
  //       value: this.outStandingData.DemandId,
  //       type: 'number',
  //       order: 6,
  //       readonly: true,
  //       required: false
  //     }));
  //     formfields.push(new InputBase({
  //       controlName: 'DemandDate',
  //       label: 'Demand Date',
  //       value: this.outStandingData.DemandDate,
  //       order: 7,
  //       type: 'date',
  //       readonly: true,
  //       required: false
  //     }));
  //     formfields.push(new InputBase({
  //       controlName: 'PayableAmount',
  //       label: 'Payable Amount',
  //       value: this.outStandingData.PayableAmount,
  //       type: 'number',
  //       order: 8,
  //       readonly: true,
  //       required: false
  //     }));
  //     formfields.push(new CheckboxBase({
  //       controlName: "linkedCBox",
  //       label: 'Do you want to Paynow ?',
  //       value: false,
  //       type: 'checkbox',
  //       order: 9
  //     }));
         
  //   }
  //   return formfields;
  //   }
        

  // openDialog3(){
    
  
    
  //   this.chitgroupsService.getoutstanding(this.chitgroupViewData.id).subscribe((res: any) => {
  //     console.log(res);
  //     this.outStandingData = res.Result[0];
  //     console.log(this.outStandingData)
  //     const data = {
  //       title: 'Outstanding Balance Details',
  //       formfields: this.getPopupDialogFormFields3('Dialog3'),
  //       layout: { addButtonText: 'PayNow' },
  //     };
  //     const closeDialogRef3 = this.dialog.open(FormDialogComponent, { data });
  //     closeDialogRef3.afterClosed().subscribe((response: any) => {
  //     console.log("dialogueres"+response);
  //     this.router.navigate(['/chitgroups/demand-sheet'], { relativeTo: this.route });
      
  //     });
  //   });
    
  // }

  openDialog3(){
    this.router.navigate([`/chitgroups/${this.chitgroupViewData.id}/outview`], {relativeTo: this.route});
  }
    

  bidwinner()
  {
    let id = this.chitgroupViewData.id;
    let cuurentCycle = this.chitgroupViewData.currentcycle;
    console.log(id);
    console.log(cuurentCycle);
    this.chitgroupsService.getbidderwon(id,cuurentCycle).subscribe(response => {
      this.name  = response['name'];
      this.adhar = response['adhar'];
      this.mobileno= response['mobileno'];
      this.bidAmount= response['bidAmount'];
      this.chitnumber = response['chitNumber'];
      const data = {
        title: 'Auction has been won by',
        formfields: this.getPopupDialogFormFields2('Dialog2'),
        layout: { addButtonText: 'Ok' },
      };
      // console.log("auction");
      const auctionDialogRef2 = this.dialog.open(FormDialogComponent, { data });
      auctionDialogRef2.afterClosed().subscribe((dialog2Response: any) => {

        this.chitgroupsService.allotPrize(id,cuurentCycle,dialog2Response.data.value).subscribe((res: any) => {

          if(res === 'success'){
            alert("Successfully Alotted Prize Money to " +this.name)
            window.location.reload();
          }
          

        });
      });
    }
    );
  }


  /**
   * Refetches data for the component
   * TODO: Replace by a custom reload component instead of hard-coded back-routing.
   */
  reload() {
    const url: string = this.router.url;
    this.router.navigateByUrl(`/chitgroups`, {skipLocationChange: true})
      .then(() => this.router.navigate([url]));
  }

  /**
   * Deletes the chitgroup
   */
  private deleteChitGroup() {
    const deleteChitGroupDialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { deleteContext: `Chit Group with Name: ${this.chitgroupViewData.name}` }
    });
    deleteChitGroupDialogRef.afterClosed().subscribe((response: any) => {
      if (response.delete) {
        this.chitgroupsService.deleteChitGroup(this.chitgroupViewData.id).subscribe(() => {
          this.router.navigate(['/chitgroups'], { relativeTo: this.route });
        });
      }
    });
  }

}
