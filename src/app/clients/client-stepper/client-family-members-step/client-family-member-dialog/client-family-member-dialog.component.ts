/** Angular Imports */
import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

/** Custom Services */
import { SettingsService } from 'app/settings/settings.service';
import { SystemService } from 'app/system/system.service';
import { FormDialogComponent } from 'app/shared/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from 'app/shared/delete-dialog/delete-dialog.component';

/**
 * Client Family Members Dialog
 */
@Component({
  selector: 'mifosx-client-family-member-dialog',
  templateUrl: './client-family-member-dialog.component.html',
  styleUrls: ['./client-family-member-dialog.component.scss']
})
export class ClientFamilyMemberDialogComponent implements OnInit {

   /** Minimum date for DOB. */
   now = new Date();
   minDateDob = new Date(this.now.getFullYear() - 60, this.now.getMonth(), this.now.getDate());
   /** Maximum DOB . */
   maxDateDob = new Date(this.now.getFullYear() - 18, this.now.getMonth(), this.now.getDate());

  /** Add/Edit family member form. */
  familyMemberForm: FormGroup;

  // /** Client Data and Template */
  // clientDataAndTemplate: any;

  /** Client Template */
  @Input() clientTemplate: any;

  @Input() clientAddressFieldConfig: any;

  @Input() createClientAddress: any;

  /** Create Client Form */
  createClientAddressForm: FormGroup;


  isNomineeClicked = false;
  nomineeAddressClicked = false;
  hideNominee = false;

  /** IdProof Options */
  idproofOptions: any;
  /** District Options */
  districtIdOptions: any;
  /** State Options */
  stateProvinceIdOptions: any;
  /** Taluka Options */
  talukaIdOptions: any;
  villageOptions: any;

  /**
   * @param {MatDialogRef} dialogRef Client Family Member Dialog Reference
   * @param {FormBuilder} formBuilder Form Builder
   * @param {DatePipe} datePipe Date Pipe
   * @param {any} data Dialog Data
   * @param {SettingsService} settingsService Setting service
   */
  constructor(public dialogRef: MatDialogRef<ClientFamilyMemberDialogComponent>,
              private formBuilder: FormBuilder,
              private datePipe: DatePipe,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private settingsService: SettingsService, private systemService: SystemService) {

                console.log(data);
               }

  ngOnInit() {
    this.createFamilyMemberForm();
    if (this.data.context === 'Edit') {
      this.familyMemberForm.patchValue({
        'firstName': this.data.member.firstName,
        'age': this.data.member.age,
        'isDependent': this.data.member.isDependent,
        'isnominee' : this.data.member.isnominee,
        'isnomineeaddr': this.data.member.isnomineeaddr,
        'relationshipId': this.data.member.relationshipId,
        'genderId': this.data.member.genderId,
        'professionId': this.data.member.professionId,
        'qualificationId': this.data.member.qualificationId,
        'nomadhar' : this.data.member.nomadhar,
        'nomstate' : this.data.member.nomstate,
        'nomdistrict' : this.data.member.nomdistrict,
        'nomtaluka' : this.data.member.nomtaluka,
        'nomvillage': this.data.member.nomvillage,
        'nompincode' : this.data.member.nompincode,
        'nomarealocality' : this.data.member.nomarealocality,
        'nomhouseno' : this.data.member.nomhouseno,
        'nomstreetno' : this.data.member.nomstreetno,
        'nomsecondaryid' : this.data.member.nomsecondaryid,
        'nomsecondaryidnum' : this.data.member.nomsecondaryidnum,
        'dateOfBirth': this.data.member.dateOfBirth && new Date(this.data.member.dateOfBirth),
        'mobileNumber': this.data.member.mobileNumber
      });
      this.isNomineeClicked = this.data.member.isnominee;
      this.nomineeAddressClicked = this.data.member.isnomineeaddr;

      // this.setOptions();
      // this.populateAddrFields();

    }
     if (this.data.nomineeExists)
      this.hideNominee = true; 
  }  

  
  /**
   * Sets select dropdown options.
   */
   setOptions() {
     console.log(this.clientTemplate.address.talukaIdOptions);
    this.idproofOptions = this.clientTemplate.idproofOptions;
    this.districtIdOptions = this.clientTemplate.address.districtIdOptions;
    this.talukaIdOptions = this.clientTemplate.address.talukaIdOptions;
    this.stateProvinceIdOptions = this.clientTemplate.address.stateProvinceIdOptions;
  
  }

  /**
   * Creates Family Member Form
   */
  createFamilyMemberForm() {
    this.familyMemberForm = this.formBuilder.group({
      'firstName': ['', [Validators.required, Validators.pattern('(^[A-z]).*')]],
      'age': ['', [Validators.pattern('(^[0-9]{2})')]],
      'isDependent': [''],
      'isnominee': [''],
      'isnomineeaddr': [''],
      'relationshipId': ['', Validators.required],
      'genderId': [''],
      'professionId': [''],
      'qualificationId': [''],
      'nomadhar': ['', Validators.pattern('^((\\+91-?)|0)?[0-9]{12}$')],
      'nomsecondaryidnum': [''],
      'nomsecondaryid': [''],
      'dateOfBirth': [''],
      'nomhouseno': ['', [Validators.required]],
      'nomstreetno': ['', [Validators.required]],
      'nomarealocality': ['', [Validators.required]],
      'nomtaluka': ['', [Validators.required]],
      'nomvillage': ['', [Validators.required]],
      'nomdistrict': ['', [Validators.required]],
      'nomstate': ['', [Validators.required]],
      'nompincode': ['', [Validators.required, Validators.pattern('(^[0-9]{6})')]],
      'mobileNumber': ['', Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
    });
  }


  // toggle(){
  //   this.isNomineeClicked = this.familyMemberForm.controls['isnominee'].value ? true : false;
  //   //this.isNomineeClicked=!this.isNomineeClicked;
  // }

  /*toggleAddress(){
    this.nomineeAddressClicked=!this.nomineeAddressClicked;
    this.populateAddrFields();
  }*/

  /*populateAddrFields() {

    if(this.nomineeAddressClicked) {
      // Copy from client communication address

    } else {
      // Clear all fields
      //this.createClientAddressForm.patchValue(null);

    }
  }*/
  // Fetch details associated with given pincode
  queryPincode() {
    var pincode = this.familyMemberForm.get('nompincode').value;
    // console.log(pincode);console.log(pincode.length());
    // if (pincode.length !== 6) {
    //   alert ('Pincode is invalid');
    //   return;
    // }
    this.systemService.getPincodeDtls(pincode).subscribe(data => {
      if (data === undefined || data.length === 0 || data.totalFilteredRecords === 0) {
        alert ('Pincode not found');
      } else {
        this.villageOptions = data.pageItems;
        //console.log(this.data.address.districtIdOptions);
        //console.log(this.data.address.talukaIdOptions);
        this.familyMemberForm.get('nomtaluka').setValue(this.data.address.talukaIdOptions.find((Obj: any) => Obj.name === data.pageItems[0].taluk)?.id);
        this.familyMemberForm.get('nomdistrict').setValue(this.data.address.districtIdOptions.find((Obj: any) => Obj.name === data.pageItems[0].district)?.id);
        this.familyMemberForm.get('nomstate').setValue(this.data.address.stateProvinceIdOptions.find((Obj: any) => Obj.name === data.pageItems[0].state)?.id);
        //console.log(this.stateOptions.find((stateObj: any) => stateObj.name === 'KA'));
        //console.log(this.stateOptions.find((stateObj: any) => stateObj.name === 'KA')?.id);
        // console.log( data.pageItems[0].taluk);
        // console.log( data.pageItems[0].district);
        // console.log( data.pageItems[0].state);
        // console.log(data.pageItems);
      }
    })
  }

  confirmBtnDisable() {
    let disable = this.familyMemberForm.controls['firstName'].valid && this.familyMemberForm.controls['relationshipId'].valid 
      && (this.isNomineeClicked ?  this.familyMemberForm.controls['dateOfBirth'].valid && this.familyMemberForm.controls['nomadhar'].valid && 
      this.familyMemberForm.controls['nomsecondaryid'].valid && this.familyMemberForm.controls['nomsecondaryidnum'].valid : true ) &&
      (this.isNomineeClicked && this.nomineeAddressClicked ? this.familyMemberForm.controls['nomhouseno'].valid && this.familyMemberForm.controls['nomstreetno'].valid && 
      this.familyMemberForm.controls['nomarealocality'].valid && this.familyMemberForm.controls['nomtaluka'].valid && this.familyMemberForm.controls['nomvillage'].valid && this.familyMemberForm.controls['nomdistrict'].valid 
      && this.familyMemberForm.controls['nomstate'].valid && this.familyMemberForm.controls['nompincode'].valid  : true );
    return !disable;

  }
  
  /**
   * Returns Formatted Family Member
   */
  get familyMember() {
    const locale = this.settingsService.language.code;
    const dateFormat = this.settingsService.dateFormat;
    // TODO: Update once language and date settings are setup
    const familyMember = {
      ...this.familyMemberForm.value,
      dateFormat,
      locale
    };
    for (const key in familyMember) {
      if (familyMember[key] === '' || familyMember[key] === undefined) {
        delete familyMember[key];
      }
    }
    if (familyMember.dateOfBirth) {
      familyMember.dateOfBirth = this.datePipe.transform(familyMember.dateOfBirth, dateFormat);
    }
    return familyMember;
  }

}
