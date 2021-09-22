/** Angular Imports */
import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

/** Custom Services */
import { ClientsService } from '../../../clients.service';
import { SettingsService } from 'app/settings/settings.service';
import { SystemService } from 'app/system/system.service';
import { EventEmitter } from 'events';

/**
 * Add Family Member Component
 */
@Component({
  selector: 'mifosx-add-family-member',
  templateUrl: './add-family-member.component.html',
  styleUrls: ['./add-family-member.component.scss']
})
export class AddFamilyMemberComponent implements OnInit {

  @Output() change=new EventEmitter()
  plus:number=1;

   /** Minimum date for DOB. */
   now = new Date();
   minDateDob = new Date(this.now.getFullYear() - 60, this.now.getMonth(), this.now.getDate());
   /** Maximum DOB . */
   maxDateDob = new Date(this.now.getFullYear() - 18, this.now.getMonth(), this.now.getDate());
   
  /** Add family member form. */
  addFamilyMemberForm: FormGroup;
  /** Add family member template. */
  addFamilyMemberTemplate: any;
  /** Client ID */
  clientId: any;

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
  villageOptions: any;
  data: any;
  
  clientTemplate: any;
  clientAddress: any[];
  clientFamilyMembers: any[];
  nomineeExists = false;

  /**
   * @param {FormBuilder} formBuilder FormBuilder
   * @param {DatePipe} datePipe Date Pipe
   * @param {Router} router Router
   * @param {Route} route Route
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
    this.route.data.subscribe((data: { clientTemplate: any, clientAddress: any, clientFamilyMembers: any }) => {
      this.addFamilyMemberTemplate = data.clientTemplate.familyMemberOptions;
      this.clientTemplate = data.clientTemplate;
      this.clientAddress = data.clientAddress;
      this.clientFamilyMembers = data.clientFamilyMembers;
    });
    this.clientId = this.route.parent.parent.snapshot.params['clientId'];

  }

  ngOnInit() {
    this.createAddFamilyMemberForm();
  
    this.clientFamilyMembers.forEach(mem => {
      if (mem.isnominee) {
        this.nomineeExists = true;
      } 
    });
    this.setOptions();


  }

  /**
   * Sets select dropdown options.
   */
   setOptions() {
    this.idproofOptions = this.clientTemplate.idproofOptions;
    this.districtIdOptions = this.clientTemplate.address.districtIdOptions.sort((a:any,b:any)=>a.name.localeCompare(b.name));
    this.talukaIdOptions = this.clientTemplate.address.talukaIdOptions.sort((a:any,b:any)=>a.name.localeCompare(b.name));
    this.stateProvinceIdOptions = this.clientTemplate.address.stateProvinceIdOptions;
  
  }

  /**
   * Creates the add family member form
   */
  createAddFamilyMemberForm() {
    this.addFamilyMemberForm = this.formBuilder.group({
      'firstName': ['', Validators.required],
      'qualificationId': [''],
      'isnominee': [''],
      'isnomineeaddr': [''],
      'age': ['', [Validators.pattern('(^[0-9]{2})')]],
      'isDependent': [''],
      'relationshipId': ['', Validators.required],
      'genderId': [''],
      'professionId': [''],
      'mobileNumber' : [''],
      'nomadhar': ['', Validators.pattern('^((\\+91-?)|0)?[0-9]{12}$')],
      'nomsecondaryidnum': ['', [Validators.required]],
      'nomsecondaryid': ['', [Validators.required]],
      'dateOfBirth': ['', [Validators.required]],
      'nomhouseno': ['', [Validators.required]],
      'nomstreetno': ['', [Validators.required]],
      'nomarealocality': ['', [Validators.required]],
      'nomtaluka': ['', [Validators.required]],
      'nomvillage': ['',[Validators.required]],
      'nomdistrict': ['', [Validators.required]],
      'nomstate': ['', [Validators.required]],
      'nompincode': ['', [Validators.required, Validators.pattern('(^[0-9]{6})')]]
    });
  }
  queryPincode() {
    var pincode = this.addFamilyMemberForm.get('nompincode').value;
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
        this.addFamilyMemberForm.get('nomtaluka').setValue(this.talukaIdOptions.find((Obj: any) => Obj.name === data.pageItems[0].taluk)?.id);
        this.addFamilyMemberForm.get('nomdistrict').setValue(this.districtIdOptions.find((Obj: any) => Obj.name === data.pageItems[0].district)?.id);
        this.addFamilyMemberForm.get('nomstate').setValue(this.stateProvinceIdOptions.find((Obj: any) => Obj.name === data.pageItems[0].state)?.id);

      }
    })
  }

  /**
   * Submits the form and adds the family member
   */
  submit() {
    const prevDateOfBirth: Date = this.addFamilyMemberForm.value.dateOfBirth;
    // TODO: Update once language and date settings are setup
    const dateFormat = this.settingsService.dateFormat;
    this.addFamilyMemberForm.patchValue({
      dateOfBirth: this.datePipe.transform(prevDateOfBirth, dateFormat)
    });
    const familyMemberData = this.addFamilyMemberForm.value;
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
      delete familyMemberData['isnomineeaddr'];
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

    this.clientsService.addFamilyMember(this.clientId, familyMemberData).subscribe(res => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

  submitBtnDisable() {
    let disable = this.addFamilyMemberForm.controls['firstName'].valid && this.addFamilyMemberForm.controls['relationshipId'].valid 
      && (this.isNomineeClicked ?  this.addFamilyMemberForm.controls['dateOfBirth'].valid && this.addFamilyMemberForm.controls['nomadhar'].valid && 
      this.addFamilyMemberForm.controls['nomsecondaryid'].valid && this.addFamilyMemberForm.controls['nomsecondaryidnum'].valid : true ) &&
      (this.isNomineeClicked && this.nomineeAddressClicked ? this.addFamilyMemberForm.controls['nomhouseno'].valid && this.addFamilyMemberForm.controls['nomstreetno'].valid && 
      this.addFamilyMemberForm.controls['nomarealocality'].valid && this.addFamilyMemberForm.controls['nomvillage'].valid &&  this.addFamilyMemberForm.controls['nomtaluka'].valid && this.addFamilyMemberForm.controls['nomdistrict'].valid 
      && this.addFamilyMemberForm.controls['nomstate'].valid && this.addFamilyMemberForm.controls['nompincode'].valid  : true );
    return !disable;
    
  }  
}
