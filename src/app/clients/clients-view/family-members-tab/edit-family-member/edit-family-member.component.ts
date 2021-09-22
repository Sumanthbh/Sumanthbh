/** Angular Imports */
import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

/** Custom Services */
import { ClientsService } from '../../../clients.service';
import { SettingsService } from 'app/settings/settings.service';
import { SystemService } from 'app/system/system.service';
import { EventEmitter } from 'events';

/**
 * Edit Family Member Component
 */
@Component({
  selector: 'mifosx-edit-family-member',
  templateUrl: './edit-family-member.component.html',
  styleUrls: ['./edit-family-member.component.scss']
})
export class EditFamilyMemberComponent implements OnInit {

  @Output() change=new EventEmitter()
  plus:number=1;
  
 /** Minimum date for DOB. */
 now = new Date();
 minDateDob = new Date(this.now.getFullYear() - 60, this.now.getMonth(), this.now.getDate());
 /** Maximum DOB . */
 maxDateDob = new Date(this.now.getFullYear() - 18, this.now.getMonth(), this.now.getDate());

  /** Add family member form. */
  editFamilyMemberForm: FormGroup;
  /** Add family member template. */
  addFamilyMemberTemplate: any;
  /** Family Members Details */
  familyMemberDetails: any;

  isNomineeClicked = false;
  nomineeAddressClicked = false;

  /** IdProof Options */
  idproofOptions: any;
  /** District Options */
  districtIdOptions: any;
  /** State Options */
  stateProvinceIdOptions: any;
  /** Taluka Options */
  talukaIdOptions: any;
  data: any;
  villageOptions: any;
  /** Client Template */
  clientTemplate: any;
  clientAddress: any[];
  clientFamilyMembers: any[];
  nomineeExists = false;

  /**
   * @param {FormBuilder} formBuilder Form Builder
   * @param {DatePipe} datePipe DatePipe
   * @param {any} data Dialog Data
   * @param {Router} router Router
   * @param {ActivatedRoute} route Route
   * @param {ClientsService} clientsService Clients Service
   * @param {SettingsService} settingsService Setting service
   */
  constructor(private formBuilder: FormBuilder,
              private datePipe: DatePipe,
              private router: Router,
              private route: ActivatedRoute,
              private clientsService: ClientsService,
              private systemService: SystemService,
              private settingsService: SettingsService) {
    this.route.data.subscribe((data: { clientTemplate: any, editFamilyMember: any, clientAddress: any, clientFamilyMembers: any}) => {
      this.addFamilyMemberTemplate = data.clientTemplate.familyMemberOptions;
      this.familyMemberDetails = data.editFamilyMember;
      this.clientTemplate = data.clientTemplate;
      this.clientAddress = data.clientAddress;
      this.clientFamilyMembers = data.clientFamilyMembers;
      // console.log(data);
      // console.log(this.data);
    });
  }

  ngOnInit() {
    this.isNomineeClicked = true;
    this.nomineeAddressClicked = true;
    this.createEditFamilyMemberForm(this.familyMemberDetails);
    // // if (this.data.context === 'Edit') {
    //   this.editFamilyMemberForm.patchValue({
    //     'firstName': this.data.member.firstName,
    //     'age': this.data.member.age,
    //     'isDependent': this.data.member.isDependent,
    //     'isnominee' : this.data.member.isNominee,
    //     'relationshipId': this.data.member.relationshipId,
    //     'genderId': this.data.member.genderId,
    //     'professionId': this.data.member.professionId,
    //     'qualificationId': this.data.member.qualificationId,
    //     'maritalId': this.data.member.maritalId,
    //     'nomadhar' : this.data.member.nomadhar,
    //     'nomstate' : this.data.member.nomstate && this.data.member.nomstate.id,
    //     'nomdistrict' : this.data.member.nomdistrict && this.data.member.nomdistrict.id,
    //     'nomtaluka' : this.data.member.nomtaluka && this.data.member.nomtaluka.id,
    //     'nomarealocality' : this.data.member.nomarealocality,
    //     'nompincode' : this.data.member.nompincode,
    //     'nomsecondaryid' : this.data.member.nomsecondaryid && this.data.member.nomsecondaryid.id, 
    //     'nomaddr' : this.data.member.nomaddr,
    //     'nomsecondaryidnum' : this.data.member.nomsecondaryidnum,
    //     'dateOfBirth': this.data.member.dateOfBirth && new Date(this.data.member.dateOfBirth),
    //     'mobileNumber': this.data.member.mobileNumber
    //   });

      this.setOptions();
      this.buildDependencies();
      
      this.clientFamilyMembers.forEach(mem => {
        if (mem.isnominee && this.familyMemberDetails.firstName !== mem.firstName ) {
          this.nomineeExists = true;
        } 
      });
  
    }
  

  /**
   * Sets select dropdown options.
   */
   setOptions() {
    console.log(this.clientTemplate.address.talukaIdOptions);
    this.idproofOptions = this.clientTemplate.idproofOptions;
    this.districtIdOptions = this.clientTemplate.address.districtIdOptions.sort((a:any,b:any)=>a.name.localeCompare(b.name));
    this.talukaIdOptions = this.clientTemplate.address.talukaIdOptions.sort((a:any,b:any)=>a.name.localeCompare(b.name));
    this.stateProvinceIdOptions = this.clientTemplate.address.stateProvinceIdOptions;
  
  }

  /**
   * Adds controls conditionally.
   */
   buildDependencies() {
    if (this.clientTemplate.active) {
       this.editFamilyMemberForm.addControl('active', new FormControl(this.clientTemplate.active));
    } else {
      this.editFamilyMemberForm.removeControl('active');
      }
}

  /**
   * Creates Edit Family Member Form
   * @param {any} familyMember Family Member
   */
  createEditFamilyMemberForm(familyMember: any) {
    this.editFamilyMemberForm = this.formBuilder.group({
      'firstName': [familyMember.firstName, Validators.required],
      'qualificationId': [familyMember.qualificationId && familyMember.qualificationId > 0? familyMember.qualificationId : ''],
      'age': [familyMember.age],
      'isDependent': [familyMember.isDependent],
      'relationshipId': [familyMember.relationshipId, Validators.required],
      'genderId': [familyMember.genderId && familyMember.genderId > 0? familyMember.genderId : ''],
      'professionId': [familyMember.professionId && familyMember.professionId > 0? familyMember.professionId : ''],
      'mobileNumber' : [familyMember.mobileNumber],
      'nomadhar': [familyMember.nomadhar, Validators.required],
      'isnominee': [familyMember.isnominee, Validators.required],
      'isnomineeaddr': [familyMember.isnomineeaddr, Validators.required],
      'nomsecondaryidnum': [familyMember.nomsecondaryidnum, Validators.required],
      'nomsecondaryid': [familyMember.nomsecondaryid? familyMember.nomsecondaryid : '', Validators.required],
      'nomtaluka': [familyMember.nomtaluka? familyMember.nomtaluka: '', Validators.required],
      'nomvillage': [familyMember.nomvillage? familyMember.nomvillage: '', Validators.required],
      'nomdistrict': [familyMember.nomdistrict? familyMember.nomdistrict:'', Validators.required],
      'nomstate': [familyMember.nomstate? familyMember.nomstate:'', Validators.required],
      'nompincode': [familyMember.nompincode, Validators.required],
      'nomhouseno': [familyMember.nomhouseno, Validators.required],
      'nomstreetno': [familyMember.nomstreetno, Validators.required],
      'nomarealocality': [familyMember.nomarealocality, Validators.required],
      'dateOfBirth': [this.datePipe.transform(familyMember.dateOfBirth, 'yyyy-MM-dd'), Validators.required]
    });
    this.isNomineeClicked = familyMember.isnominee;
    this.nomineeAddressClicked = familyMember.isnomineeaddr;
  }

  queryPincode() {
    var pincode = this.editFamilyMemberForm.get('nompincode').value;
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
        //console.log(this.data.address.talukaIdOptions);
        this.editFamilyMemberForm.get('nomtaluka').setValue(this.talukaIdOptions.find((Obj: any) => Obj.name === data.pageItems[0].taluk)?.id);
        this.editFamilyMemberForm.get('nomdistrict').setValue(this.districtIdOptions.find((Obj: any) => Obj.name === data.pageItems[0].district)?.id);
        this.editFamilyMemberForm.get('nomstate').setValue(this.stateProvinceIdOptions.find((Obj: any) => Obj.name === data.pageItems[0].state)?.id);

        //console.log(this.stateOptions.find((stateObj: any) => stateObj.name === 'KA'));
        //console.log(this.stateOptions.find((stateObj: any) => stateObj.name === 'KA')?.id);
        // console.log( data.pageItems[0].taluk);
        // console.log( data.pageItems[0].district);
        // console.log( data.pageItems[0].state);
        // console.log(data.pageItems);
      }
    })
  }

  submitBtnDisable() {
    let disable = this.editFamilyMemberForm.controls['firstName'].valid && this.editFamilyMemberForm.controls['relationshipId'].valid 
      && (this.isNomineeClicked ?  this.editFamilyMemberForm.controls['dateOfBirth'].valid && this.editFamilyMemberForm.controls['nomadhar'].valid && 
      this.editFamilyMemberForm.controls['nomsecondaryid'].valid && this.editFamilyMemberForm.controls['nomsecondaryidnum'].valid : true ) &&
      (this.isNomineeClicked && this.nomineeAddressClicked ? this.editFamilyMemberForm.controls['nomhouseno'].valid && this.editFamilyMemberForm.controls['nomstreetno'].valid && 
      this.editFamilyMemberForm.controls['nomarealocality'].valid && this.editFamilyMemberForm.controls['nomtaluka'].valid && this.editFamilyMemberForm.controls['nomvillage'].valid && this.editFamilyMemberForm.controls['nomdistrict'].valid 
      && this.editFamilyMemberForm.controls['nomstate'].valid && this.editFamilyMemberForm.controls['nompincode'].valid  : true );
    return !disable;

  }  

  /**
   * Submits the form and updates the client family member.
   */
  submit() {
    const prevDateOfBirth: Date = this.editFamilyMemberForm.value.dateOfBirth;
    // TODO: Update once language and date settings are setup
    const dateFormat = this.settingsService.dateFormat;
    this.editFamilyMemberForm.patchValue({
      dateOfBirth: this.datePipe.transform(prevDateOfBirth, dateFormat)
    });
    const familyMemberData = this.editFamilyMemberForm.value;
    familyMemberData.locale = this.settingsService.language.code;
    familyMemberData.dateFormat = dateFormat;

    if (familyMemberData.isnominee) {
      if (familyMemberData.isnomineeaddr) {
        // Different Address was given than Client. OK.
      } else {
        // Same Address as Client. Hence copy from client.
        const clientCommAddr : any = this.clientAddress.find((addr: any) => addr.addressType === "Communication Address");
        familyMemberData.nompincode = clientCommAddr.postalCode;
        familyMemberData.nomstate = clientCommAddr.stateProvinceId
        familyMemberData.nomdistrict = clientCommAddr.districtId
        familyMemberData.nomtaluka = clientCommAddr.talukaId
        familyMemberData.nomvillage = clientCommAddr.village
        familyMemberData.nomarealocality = clientCommAddr.addressLine1
        familyMemberData.nomstreetno = clientCommAddr.street
        familyMemberData.nomhouseno =clientCommAddr.houseNo
      }
    } else {
      // Family member not a nominee. Clear nominee fields if any
      delete familyMemberData['nomadhar'];
      delete familyMemberData['nomsecondaryidnum'];
      delete familyMemberData['nomsecondaryid'];
      delete familyMemberData['dateOfBirth'];
      delete familyMemberData['nomhouseno'];
      delete familyMemberData['nomstreetno'];
      delete familyMemberData['nomarealocality'];
      delete familyMemberData['nomvillage'];
      delete familyMemberData['nomtaluka'];
      delete familyMemberData['nomdistrict'];
      delete familyMemberData['nomstate'];
      delete familyMemberData['nompincode'];
    } 

    this.clientsService.editFamilyMember(this.familyMemberDetails.clientId, this.familyMemberDetails.id, familyMemberData).subscribe(res => {
      this.router.navigate(['../../'], { relativeTo: this.route });
    });
  }

}
