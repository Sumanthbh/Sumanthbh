/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import {formatNumber} from '@angular/common';
import "@angular/common/locales/global/en-IN";

/** Custom Components */
import { DeleteDialogComponent } from 'app/shared/delete-dialog/delete-dialog.component';
import { ChitGroupsService } from 'app/chitgroups/chitgroups.service';

import { SettingsService } from 'app/settings/settings.service';

/**
 * Chit Bids Component.
 */
@Component({
  selector: 'mifosx-enter-bids',
  templateUrl: './enter-bids.component.html',
  styleUrls: ['./enter-bids.component.scss']
})
export class EnterBidsComponent implements OnInit {


  /** Minimum date allowed. */
  minDateDob = new Date(2021, 0, 1);
  /** Maximum date allowed. */
  maxDateDob = new Date();

  /** Chit Group Data */
  chitgroupData: any;
  /** Bids Data */
  bids: any[];
  
  /** Code Values Form */
  biddingForm: FormGroup;
  
  // Chit Groups Subscribers
  subscribers: any[];

  /** Code Value Row Status */
  bidRowStatus: string[] = [];
  // date: Date;
  // datepipe: any;

  currentDate = new Date();

  //Bid Data
  bidder: any;

  /** Client Template */
//  clientTemplate: any;
// biddate: any;

  /** bidder Options  */
  bidderOptions: any;
  

  
  
  /**
   * @param {ActivatedRoute} route Activated Route.
   * @param {ChitGroupsService} chitgroupService ChitGroupsService.
   * @param {Router} router Router for navigation.
   * @param {DatePipe} datePipe Date Pipe.
   * @param {FormBuilder} formBuilder Form Builder.
   * @param {MatDialog} dialog Dialog reference.
   */
  constructor(private route: ActivatedRoute,
              private chitgroupService: ChitGroupsService,
              private datePipe: DatePipe,
              private router: Router,
              private formBuilder: FormBuilder,
              private settingsService: SettingsService,
              private dialog: MatDialog) {
    this.route.data.subscribe((data: { chitgroupViewData: any, bids: any, subscribers: any, bidder:any }) => {
      this.chitgroupData = data.chitgroupViewData;
      this.bids = data.bids;
      this.subscribers = data.subscribers;
      this.bidderOptions = data.bidder

      console.log(data);
    });
  }

  /**
   * Creates and initializes the form.
   */
  ngOnInit() {
    // this.setOptions();
    this.createBidsForm();
    this.initChitBidsForm();
  }

  /**
   * Creates the code values form.
   */
  createBidsForm() {
    this.biddingForm = this.formBuilder.group({
      'chitBidsFormArr': this.formBuilder.array([])
    });
  }

  // setOptions() {
  //   this.bidderOptions = this.clientTemplate.bidderOptions;
  // }


  /**
   * Initializes the chit bids form.
   */
   initChitBidsForm() {
    this.bids.forEach((bid: any) => {
      this.chitBidsFormArr.push(this.createChitBidsRow(bid));
      this.bidRowStatus.push('disabled');
    });
  }

  /**
   * Gets the Bids form array.
   * @returns {FormArray} Bids form array.
   */
   get chitBidsFormArr(): FormArray {
    return this.biddingForm.get('chitBidsFormArr') as FormArray;
  }

  /**
   * Adds a row to the Bid form.
   */
  addBidRow() {
    this.chitBidsFormArr.push(this.createChitBidsRow());
    this.chitBidsFormArr.at(this.chitBidsFormArr.length - 1).enable();
    this.bidRowStatus.push('new');
  }

  /**
   * Creates a Bid row in Bid form.
   * @param {any} bid Chit Bid value.
   */
  createChitBidsRow(bid?: any): FormGroup {
    return this.formBuilder.group({
      'bidId': [{ value: bid ? bid.id : '', disabled: true }],
      'chitCycleId': [{ value: bid ? bid.chitCycleId : '', disabled: true }],

      'subscriberId': [{ value: bid ? bid.subscriberId : '', disabled: true }, Validators.required],
      //'ChitNumber': [{ value: bid ? bid.name : '', disabled: true }, Validators.required],
      //'ClientName': [{ value: bid ? bid.description : '', disabled: true }, Validators.required],
      'bidAmount': [{ value: bid ? bid.bidAmount : '', disabled: true }, Validators.required],
      'bidDate': [{ value: bid ? bid.biddate : ''} && new Date()],
      'bidderparticipation': [{ value: bid ? bid.bidderparticipation : '', disabled: true }, Validators.required],
      'bidWon': [{ value: bid ? bid.bidWon : false, disabled: true }]
    });
  }

  /**
   * Deletes the particular Bid row
   * @param {number} index Index of the row.
   */
  deleteBid(index: number) {
    const bidId = this.bids[index].id;

    const subs = this.subscribers.find(subs => subs.id === this.bids[index].subscriberId);
    const chitNumName =  subs? subs.chitNumber + "-" + subs.name : '';
    const deleteBidDialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { deleteContext: `Bid from -- ${chitNumName}` }
    });
    deleteBidDialogRef.afterClosed().subscribe((response: any) => {
      if (response.delete) {
        this.chitgroupService.deleteBidForChitGroup(this.chitgroupData.id, bidId)
          .subscribe(() => {
          this.bids.splice(index, 1);
          this.chitBidsFormArr.removeAt(index);
          this.bidRowStatus.splice(index, 1);
          });
      }
    });
  }

  /**
   * Removes/Deletes the particular Bid Row which has not been intialised.
   * @param {number} index Index of the row.
   */
  removeNewBid(index: number) {
    this.chitBidsFormArr.removeAt(index);
    this.bidRowStatus.splice(index, 1);
  }

  /**
   * Updates the particular Bid.
   * @param {number} index Index of the row.
   */
  updateBid(index: number) {
    if(!this.dataValidation(index)) {
      return;
    }
    const updateBid = {
      "chitSubscriberId":  this.chitBidsFormArr.at(index).value.subscriberId,
      "bidAmount":  this.chitBidsFormArr.at(index).value.bidAmount,
      "bidDate":  this.chitBidsFormArr.at(index).value.biddate,
      "bidderparticipationId": this.chitBidsFormArr.at(index).value.bidderparticipation,
      "bidWon": this.chitBidsFormArr.at(index).value.bidWon };
      
      this.chitgroupService.updateBidForChitGroup(this.chitgroupData.id,this.chitBidsFormArr.at(index).value.bidId, updateBid)
      .subscribe((response: any) => {
        this.bids[index].bidAmount = this.chitBidsFormArr.at(index).value.bidAmount;
        this.bids[index].bidWon = this.chitBidsFormArr.at(index).value.bidWon;
        this.chitBidsFormArr.at(index).disable();
        this.bidRowStatus[index] = 'disabled';
        this.chitBidsFormArr.at(index).markAsPristine();
      });
  }

  /**
   * Disables the particular row.
   * @param {number} index Index of the row.
   */
  disableRow(index: number) {
    //this.chitBidsFormArr.at(index).get('bidId').setValue(this.bids[index].bidId);
    this.chitBidsFormArr.at(index).get('subscriberId').setValue(this.bids[index].subscriberId);
    this.chitBidsFormArr.at(index).get('bidAmount').setValue(this.bids[index].bidAmount);
    this.chitBidsFormArr.at(index).get('bidDate').setValue(this.bids[index].biddate);
    this.chitBidsFormArr.at(index).get('bidWon').setValue(this.bids[index].bidWon);
    this.chitBidsFormArr.at(index).disable();
    this.bidRowStatus[index] = 'disabled';
    this.chitBidsFormArr.at(index).markAsPristine();
  }

  /**
   * Saves the new Bid.
   * @param {number} index Index of the row.
   */
  addBid(index: number) {
      
    if(!this.dataValidation(index)) {
      return;
    }
    const locale = this.settingsService.language.code;
    const dateFormat = this.settingsService.dateFormat;
        // const prevbiddate: Date = this.biddingForm.value.biddate;
    // const dateFormat = this.settingsService.dateFormat;
    // this.biddingForm.patchValue({
    //   biddate: this.datePipe.transform(prevbiddate, dateFormat)
    // });
    // const biddingData = this.biddingForm.value;
    // biddingData.locale = this.settingsService.language.code;
    // biddingData.dateFormat = dateFormat;

    // const locale = this.settingsService.language.code;
    //   const dateFormat = this.settingsService.dateFormat;

  const newBid = {      
    "chitSubscriberId":  this.chitBidsFormArr.at(index).value.subscriberId,
    "bidAmount":  this.chitBidsFormArr.at(index).value.bidAmount,
    "bidDate":  this.datePipe.transform(new Date(), dateFormat),
    "bidderparticipationId":  this.chitBidsFormArr.at(index).value.bidderparticipation,
    "bidWon": this.chitBidsFormArr.at(index).value.bidWon,
      dateFormat,
      locale
   };

    this.chitgroupService.createBidForChitGroupCycle(this.chitgroupData.id, this.chitgroupData.currentcycle, newBid)
      .subscribe((response: any) => {
        this.chitBidsFormArr.at(index).get('bidId').setValue(response.resourceId);
        this.chitBidsFormArr.at(index).disable();
        this.bidRowStatus[index] = 'disabled';
        this.bids.push({
          id: response.resourceId,
          subscriberId: this.chitBidsFormArr.at(index).get('subscriberId').value,
          bidAmount: this.chitBidsFormArr.at(index).get('bidAmount').value,
          biddate: this.chitBidsFormArr.at(index).get('bidDate').value,
          bidWon: this.chitBidsFormArr.at(index).get('bidWon').value,
          bidderparticipation: this.chitBidsFormArr.at(index).get('bidderparticipation').value,
        });
        this.chitBidsFormArr.at(index).markAsPristine();
      });


  }

  /**
   * Enables the given row.
   * @param {number} index Index of the row.
   */
  enableRow(index: number) {
    this.chitBidsFormArr.at(index).enable();
    this.bidRowStatus[index] = 'edit';
  }

  calcDiscount(index: number) {
//    let bidAmount = parseInt(this.chitBidsFormArr.at(index).get('bidAmount').value.replace(/,/g, ''));
      let bidAmount = this.chitBidsFormArr.at(index).get('bidAmount').value;
      if (isNaN(this.chitgroupData.chitvalue) || isNaN(bidAmount)) {
      return '';
    }
    if (this.chitBidsFormArr.at(index).get('bidAmount').value !== null) {
      if (bidAmount > this.chitgroupData.chitvalue) {
        return "Incorrect Bid Amount";
      }

      // return "₹ "+ formatNumber(this.chitgroupData.chitvalue - bidAmount, 'en-IN', '1.0-0') + " (" + 
      // formatNumber((this.chitgroupData.chitvalue - bidAmount)/this.chitgroupData.chitvalue*100,'en-IN', '1.0-0')
      //   + "%)";
      return formatNumber(bidAmount/this.chitgroupData.chitvalue*100,'en-IN', '1.0-1') + "%";
    }
  }

  // currentdate(){
  //   this.date=new Date();
  //   let latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
  //  }

  // Formats the number parameter with commas
  formatMyNumber(num : number) {
    return formatNumber(num,'en-IN', '1.0-0');
  }
  
  // Perform Validations and return true/false
  dataValidation(index: number) {
    let bidAmt = this.chitBidsFormArr.at(index).get('bidAmount').value;
    let chitVal = this.chitgroupData.chitvalue;

    // Bid Amount can't be greater than Chit Value
    if (bidAmt > chitVal) {
      alert("Bid Amount can't be greater than Chit Value");
      return false;
    }

    // >= Minimum Bid and <= Maximum Bid %
    let minBid = this.chitgroupData.minBidPerct*chitVal/100;
    let maxBid = this.chitgroupData.maxBidPerct*chitVal/100;
    if (bidAmt < minBid || bidAmt > maxBid) {
      alert("Bid Discount should be between " + this.chitgroupData.minBidPerct + "% and " + this.chitgroupData.maxBidPerct + "%");
      return false;
    }

    // Only 1 can be a winning Bid...
    let winningIndex = -1;
    if(this.chitBidsFormArr.at(index).get('bidWon').value) {
      //alert("current row is marked won");      
      this.bids.forEach((bid,index1) => {
        if(bid.bidWon)
        winningIndex = index1;
      })
      console.log('winningIndex='+winningIndex + " , index="+index);
      if (winningIndex !== -1 && (winningIndex !== index)){
        alert("Only one Bid can be a Winning Bid");
        return false;
      }
    }

    return true;
  }
}
