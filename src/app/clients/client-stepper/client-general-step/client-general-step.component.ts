/** Angular Imports */
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

/** Custom Services */
import { SettingsService } from 'app/settings/settings.service';
import { OrganizationService } from 'app/organization/organization.service';

import {ClientsService} from '../../clients.service';
import { FormfieldBase } from 'app/shared/form-dialog/formfield/model/formfield-base';
import { CheckboxBase } from 'app/shared/form-dialog/formfield/model/checkbox-base';
import { InputBase } from 'app/shared/form-dialog/formfield/model/input-base';
import { FormDialogComponent } from 'app/shared/form-dialog/form-dialog.component';
// import { ok } from 'assert';

/**
 * Create Client Component
 */
@Component({
  selector: 'mifosx-client-general-step',
  templateUrl: './client-general-step.component.html',
  styleUrls: ['./client-general-step.component.scss']
})
export class ClientGeneralStepComponent implements OnInit {

  // /** Minimum date allowed. */
  // minDate = new Date(2000, 0, 1);
  // /** Maximum date allowed. */
  // maxDate = new Date();

  /** Minimum date for DOB. */
  now = new Date();
  minDateDob = new Date(this.now.getFullYear() - 65, this.now.getMonth(), this.now.getDate());
  /** Maximum DOB . */
  maxDateDob = new Date(this.now.getFullYear() - 18, this.now.getMonth(), this.now.getDate());

  /** Client Template */
  @Input() clientTemplate: any;
  @Input() addressStep: any;
  @Input() AmountAppliedData: any;
  /** Create Client Form */
  createClientForm: FormGroup;

  /** Office Options */
  officeOptions: any;
   /** Introduce Options */
  introduceOptions: any;
   /** Title Options */
  titleOptions: any;
  /** Staff Options */
  staffOptions: any;
  /** Father/Spouse Options */
  fatherspouseOptions: any;
  /** AlternateNo Options */
  altMobNumOfOptions: any;
  /** Education Options */
  educationOptions: any;
  /** Profession Options */
  professionOptions: any;
  /** Annual Options */
  annualOptions: any;
  /** IdProof Options */
  idproofOptions: any;
  /** addressProof Options */
  addrproofOptions: any;
  /** maritalStatus Options */
  maritalOptions: any;
  /** Belonging Options */
  belongingOptions: any;
  /** Religion Options */
  religionOptions: any;
  /** Legal Form Options */
  legalFormOptions: any;
  /** Client Type Options */
  clientTypeOptions: any;
  /** Client Classification Options */
  clientClassificationTypeOptions: any;
  /** Business Line Options */
  businessLineOptions: any;
  /** Constitution Options */
  constitutionOptions: any;
  /** Gender Options */
  genderOptions: any;
  /** Saving Product Options */
  savingProductOptions: any;

  AmountAppliedOptions: any;
  
  clientId: number;
  // For Karza verified display
  lastverifiedsecondaryid : string;
  lastverifiedSecondaryidDate : string;
  lastverifiedadhar: string;
  lastverifiedadhardate: string;
  lastverifiedmobileNo: string;
  lastverifiedmobiledate: string;

  // spinner
  loadingAdhar = false;
  loadingMobile = false;
  loadingSecId = false;

  /**
   * @param {FormBuilder} formBuilder Form Builder
   * @param {DatePipe} datePipe Date Pipe
   * @param {MatDialog} dialog Mat Dialog
   * @param {SettingsService} settingsService Setting service
   */
  constructor(private formBuilder: FormBuilder,
              private datePipe: DatePipe,
              private dialog: MatDialog,
              private organizationService: OrganizationService,
              private settingsService: SettingsService,
              private clientService: ClientsService,
              private route: ActivatedRoute){
                this.route.data.subscribe(( data: { product: any}) => {
                  this.AmountAppliedOptions = data.product.Product;
                });
              
    this.setClientForm();
  }

  ngOnInit() {
    this.setOptions();
    console.log(this.AmountAppliedOptions);
    
    this.buildDependencies();
  }

  /**
   * Creates the client form.
   */
  setClientForm() {
    this.createClientForm = this.formBuilder.group({
      'officeId': ['', Validators.required],
      'introduceId': [''],
      'staffId': [''],
      'adhar': ['', Validators.pattern('^((\\+91-?)|0)?[0-9]{12}$')],
      'maritalId': [''],
      'fatherspouseId':['', Validators.required],
      'addrproofId': [''],
      'idproofId': [''],
      'alternateNoId': [''],
      'educationId': [''],
      'professionId': [''],
      'annualId': [''],
      'titleId': [''],
      'belongingId': [''],
      'religionId': [''],
      'legalFormId': [''],
      'isStaff': [false],
      'active': [false],
      'addSavings': [false],
      'accountNo': [''],
      'externalId': [''],
      'genderId': [''],
      'dateOfBirth': ['', Validators.required],
      'clientTypeId': [''],
      'clientClassificationId': [''],
      'submittedOnDate': [Date.now],
      'nrega': ['', Validators.pattern('^[a-zA-Z0-9._-]+$')],
      'mobileNo': ['',  Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      'alternateMobileNo': ['',  Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      'gstNo': ['', Validators.pattern('^[a-zA-Z0-9._-]+$')],
      'emailAddress': ['', Validators.pattern('^[A-z0-9._%+-]+@[A-z0-9.-]+\\.[A-z]{2,4}$')],
      'secIdProofNo': ['', Validators.pattern('^[a-zA-Z0-9._-]+$')],
      'AmountApplied': [''],
      'secaddressproofno': ['', Validators.pattern('^[a-zA-Z0-9._-]+$')],

    });
  }

  /**
   * Sets select dropdown options.
   */
  setOptions() {
    this.officeOptions = this.clientTemplate.officeOptions;
    this.staffOptions = this.clientTemplate.staffOptions;
    this.altMobNumOfOptions = this.clientTemplate.altMobNumOfOptions;
    this.religionOptions = this.clientTemplate.religionOptions;
    this.addrproofOptions = this.clientTemplate.addrproofOptions;
    this.idproofOptions = this.clientTemplate.idproofOptions;
    this.fatherspouseOptions = this.clientTemplate.fatherspouseOptions;
    this.belongingOptions = this.clientTemplate.belongingOptions;
    this.annualOptions = this.clientTemplate.annualOptions;
    this.professionOptions = this.clientTemplate.professionOptions;
    this.educationOptions = this.clientTemplate.educationOptions;
    this.maritalOptions = this.clientTemplate.maritalOptions;
    this.titleOptions = this.clientTemplate.titleOptions;
    this.introduceOptions = this.clientTemplate.introduceOptions;
    this.legalFormOptions = this.clientTemplate.clientLegalFormOptions;
    this.clientTypeOptions = this.clientTemplate.clientTypeOptions;
    this.clientClassificationTypeOptions = this.clientTemplate.clientClassificationOptions;
    this.businessLineOptions = this.clientTemplate.clientNonPersonMainBusinessLineOptions;
    this.constitutionOptions = this.clientTemplate.clientNonPersonConstitutionOptions;
    this.genderOptions = this.clientTemplate.genderOptions;
    this.savingProductOptions = this.clientTemplate.savingProductOptions;
    // this.AmountAppliedOptions = this.AmountAppliedData;
  }

  /**
   * Adds controls conditionally.
   */
  buildDependencies() {
    this.createClientForm.get('legalFormId').valueChanges.subscribe((legalFormId: any) => {
      if (legalFormId === 1) {
        this.createClientForm.removeControl('fullname');
        this.createClientForm.removeControl('clientNonPersonDetails');
        // this.createClientForm.addControl('mobileNo', new FormControl('', [Validators.required, Validators.pattern('(^[0-9]{10}).*')]));
        // this.createClientForm.addControl('alternateMobileNo', new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]));
        // this.createClientForm.addControl('adhar', new FormControl('', [Validators.required, Validators.pattern('(^[0-9]{12}).*')]));
        this.createClientForm.addControl('firstname', new FormControl('', [Validators.required, Validators.pattern('(^[A-z]).*')]));
        this.createClientForm.addControl('fsfirstname', new FormControl('', Validators.pattern('(^[A-z]).*')));
        // this.createClientForm.addControl('emailAddress', new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]));
        this.createClientForm.addControl('maidenname', new FormControl('', [Validators.required, Validators.pattern('(^[A-z]).*')]));
        this.createClientForm.addControl('custmothername', new FormControl('', [Validators.required, Validators.pattern('(^[A-z]).*')]));
        this.createClientForm.addControl('spousename', new FormControl(''));
      } else {
        this.createClientForm.removeControl('firstname');
        this.createClientForm.removeControl('fsfirstname');
        this.createClientForm.removeControl('maidenname');
        this.createClientForm.removeControl('custmothername');
        this.createClientForm.removeControl('spousename');
        // this.createClientForm.removeControl('emailAddress',);
        this.createClientForm.addControl('fullname', new FormControl('', [Validators.required, Validators.pattern('(^[A-z]).*')]));
        this.createClientForm.addControl('clientNonPersonDetails', this.formBuilder.group({
          'constitutionId': [''],
          'incorpValidityTillDate': [''],
          'incorpNumber': [''],
          'mainBusinessLineId': [''],
          'remarks': ['']
        }));
      }
    });
    
    this.createClientForm.get('legalFormId').patchValue(1);
    this.createClientForm.get('officeId').valueChanges.subscribe((option: any) => {
      this.organizationService.getStaff(option).subscribe(data => {
        this.staffOptions = data;
        if (data === undefined || data.length === 0) {
          this.createClientForm.controls['staffId'].disable();
        } else {
          this.createClientForm.controls['staffId'].enable();
        }
      });
    });

    // this.createClientForm.get('active').valueChanges.subscribe((active: boolean) => {
    //   if (active) {
    //     this.createClientForm.addControl('activationDate', new FormControl('', Validators.required));
    //   } else {
    //     this.createClientForm.removeControl('activationDate');
    //   }
    // });
    this.createClientForm.get('addSavings').valueChanges.subscribe((active: boolean) => {
      if (active) {
        this.createClientForm.addControl('savingsProductId', new FormControl('', Validators.required));
      } else {
        this.createClientForm.removeControl('savingsProductId');
      }
    });
  }

  /**
   * Client General Details
   */
  get clientGeneralDetails() {
    const generalDetails = this.createClientForm.value;
    if (this.clientId)
      generalDetails['clientId'] = this.clientId;
    const dateFormat = this.settingsService.dateFormat;
    const locale = this.settingsService.language.code;
    // TODO: Update once language and date settings are setup
    for (const key in generalDetails) {
      if (generalDetails[key] === '' || key === 'addSavings') {
        delete generalDetails[key];
      }
    }
    // if (generalDetails.submittedOnDate) {
    //   generalDetails.submittedOnDate = this.datePipe.transform(generalDetails.submittedOnDate, dateFormat);
    // }
    // if (generalDetails.activationDate) {
    //   generalDetails.activationDate = this.datePipe.transform(generalDetails.activationDate, dateFormat);
    // }
    if (generalDetails.dateOfBirth) {
      generalDetails.dateOfBirth = this.datePipe.transform(generalDetails.dateOfBirth, dateFormat);
    }

    if (generalDetails.clientNonPersonDetails && generalDetails.clientNonPersonDetails.incorpValidityTillDate) {
      generalDetails.clientNonPersonDetails = {
        ...generalDetails.clientNonPersonDetails,
        incorpValidityTillDate: this.datePipe.transform(generalDetails.dateOfBirth, dateFormat),
        dateFormat,
        locale
      };
    }
    return generalDetails;
  }

  // Function that calls karza backend api and verifies adaar number 
  verifyAadhaar() {
    let office = this.createClientForm.get('officeId').value;
    let name = this.createClientForm.get('firstname').value;

    const data = {
      title: 'Aadhaar Verification',
      formfields: this.getPopupDialogFormFields('adharDialog1'),
      layout: { addButtonText: 'Verify Aadhaar' },
    };
    const adhaarVerifyDialogRef1 = this.dialog.open(FormDialogComponent, { data });
    adhaarVerifyDialogRef1.afterClosed().subscribe((dialog1Response: any) => {
      console.log(dialog1Response);
      console.log('Adhar is linked='+dialog1Response.data.value.linkedCBox);
      let adharGiven = this.createClientForm.get('adhar').value;
      const body = {'aadhaarNo':adharGiven, "name": name, "clientData": {"caseId":Math.floor(Math.random()*90000) + 10000}};

      if (this.clientId)
        body['clientid'] = this.clientId;
      else
        body['officeId'] = office;

      console.log(body);  
      if(dialog1Response.data.value.linkedCBox){
        // OTP API to be invoked

        this.loadingAdhar = true;
        setTimeout(() => {
          this.loadingAdhar = false;
        }, 122000);
        this.clientService.verifyAadhaarWithOtpStep1(body).subscribe(response => {
          console.log(response);
          if(response && response['karzaresult'] === 'success') {
            // Ask user to enter OTP in dialog.
            const data = {
              title: 'Aadhaar OTP Verification - Please enter the OTP sent to registered mobile number',
              formfields: this.getPopupDialogFormFields('adharDialog2'),
              layout: { addButtonText: 'Validate OTP' },
            };
            const adhaarVerifyDialogRef2 = this.dialog.open(FormDialogComponent, { data });
            adhaarVerifyDialogRef2.afterClosed().subscribe((dialog2Response: any) => {
            console.log(dialog2Response);
            
            const body2 = {'adharnumber':adharGiven, "firstname": name, "otp": dialog2Response.data.value.enterOtp,
              "accessKey": response['result']['accessKey'], "clientData": {"caseId": response['clientData']['caseId']}, "shareCode" :Math.floor(Math.random()*9000) + 1000       
            };
            if (this.clientId)
              body2['clientid'] = this.clientId;
            else
              body2['officeId'] = office;
              this.loadingAdhar = true;
              setTimeout(() => {
                this.loadingAdhar = false;
              }, 122000);
              console.log('body 2' + body2);
              this.clientService.verifyAadhaarWithOtpStep2(body2).subscribe(response2 => {
                console.log(response2);
                if(response2 && response2['result'] === 'success') {
                  // Set KYC Address and Last Verified fields
                  this.addressStep.get('kyc_houseNumber').setValue(response2['split-address']['houseNumber']);
                  this.addressStep.get('kyc_streetNumber').setValue(response2['split-address']['street']);
                  this.addressStep.get('kyc_area').setValue(response2['split-address']['location']);
                  this.addressStep.get('kyc_landmark').setValue(response2['split-address']['landmark']);
                  this.addressStep.get('kyc_villageTown').setValue(response2['split-address']['postOffice']);
                  this.addressStep.get('kyc_talukaId').setValue(this.clientTemplate.address.talukaIdOptions.find((Obj: any) => Obj.name === response2['split-address']['subdistrict'])?.id);
                  this.addressStep.get('kyc_districtId').setValue(this.clientTemplate.address.districtIdOptions.find((Obj: any) => Obj.name === response2['split-address']['district'])?.id);
                  this.addressStep.get('kyc_stateId').setValue(this.clientTemplate.address.stateProvinceIdOptions.find((Obj: any) => Obj.name === response2['split-address']['state'])?.id);
                  this.addressStep.get('kyc_pincode').setValue(response2['split-address']['pincode']);

                  this.lastverifiedadhar = response2['lastverifiedadhar'];
                  this.lastverifiedadhardate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
                  if(!this.clientId)
                    this.clientId = response2['clientid'];
                } else {
                  alert ("Aadhaar Number verification failed. Please recheck and try again.");
                }
                this.loadingAdhar = false;
              });      
            });
          } else {
            alert ("Aadhaar Number verification failed. Please recheck and try again.");
          }
          this.loadingAdhar = false;
        });
  
      } else {
        // Non-OTP flow
        this.loadingAdhar = true;
        setTimeout(() => {
          this.loadingAdhar = false;
        }, 122000);
        this.clientService.verifyAadhaarWithoutOtp(body).subscribe(response => {
          console.log(response);
          if(response && response['result'] === 'success') {
            this.lastverifiedadhar = response['lastverifiedadhar'];
            this.lastverifiedadhardate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
            if(!this.clientId)
              this.clientId = response['clientid'];
          } else {
            alert ("Aadhaar Number verification failed. Please recheck and try again.");
          }
          this.loadingAdhar = false;
        });

      }

    });
  }

  // Generate Dialog fields for Adhaar
  getPopupDialogFormFields(formType?: string) {
    let formfields: FormfieldBase[] = [];
    if (formType === 'adharDialog1') {
      formfields.push(new CheckboxBase({
        controlName: "linkedCBox",
        label: 'Is Aadhaar & Mobile number of client are linked?',
        value: false,
        type: 'checkbox',
        required: false,
        order: 1
      }));  
      formfields.push(new InputBase({
        controlName: 'aadhaarEntered',
        label: 'Aadhaar to Verify',
        value: this.createClientForm.controls.adhar.value,
        readonly: true,
        required: true,
        order: 2
      }));
      formfields.push(new CheckboxBase({
        controlName: "consentYes",
        label: 'Has client given permission to verify Aadhaar?',
        value: false,
        type: 'checkbox',
        required: true,
        order: 3
      }));  

    }    

    if (formType === 'adharDialog2') {
      formfields.push(new InputBase({
        controlName: 'aadhaarEntered',
        label: 'Aadhaar to Verify',
        value: this.createClientForm.controls.adhar.value,
        readonly: true,
        required: true,
        order: 1
      }));

      formfields.push(new InputBase({
        controlName: 'enterOtp',
        label: 'Enter OTP',
        value: '',
        type: 'number',
        required: true,
        order: 2
      }));
    }    

    if (formType === 'mobileDialog') {
      formfields.push(new InputBase({
        controlName: 'MobileNumEntered',
        label: 'Mobile Number to Verify',
        value: this.createClientForm.controls.mobileNo.value,
        disabled: true,
        required: true,
        order: 1
      }));

      formfields.push(new InputBase({
        controlName: 'enterOtp',
        label: 'Enter OTP',
        value: '',
        type: 'number',
        required: true,
        order: 2
      }));
    }    

    if (formType === 'passportDialog') {
      formfields.push(new InputBase({
        controlName: 'fileNum',
        label: 'Passport File Number',
        value: '',
        type: 'text',
        required: true,
        order: 1
      }));
    }    
    
    formfields = formfields.filter(field => field !== null);
    return formfields;
  }
  
  // Function to verify the mobile number through Karza
  verifyMobileNumber() {
    let office = this.createClientForm.get('officeId').value;
    let name = this.createClientForm.get('firstname').value;
    let mobNumGiven = this.createClientForm.get('mobileNo').value;
    const body = { 'mobile':mobNumGiven};
    if (this.clientId)
      body['clientid'] = this.clientId;
    else
      body['officeId'] = office;

    console.log('body =');  console.log(body);  
    this.loadingMobile = true;
    setTimeout(() => {
      this.loadingMobile = false;
    }, 122000);
    this.clientService.verifyMobileOtp(body).subscribe(response => {
      console.log(response);
      if(response && response['result'] === 'success') {
        this.loadingMobile = false;
        // Ask user to enter OTP in dialog.
        const data = {
          title: 'Mobile Number Verification - Enter OTP',
          formfields: this.getPopupDialogFormFields('mobileDialog'),
          layout: { addButtonText: 'Validate OTP' },
        };
        const mobileVerifyDialogRef1 = this.dialog.open(FormDialogComponent, { data });
        mobileVerifyDialogRef1.afterClosed().subscribe((dialog1Response: any) => {
          console.log(dialog1Response);
          const body2 = { 'mobile':mobNumGiven, "firstname": name, "otp": dialog1Response.data.value.enterOtp,
            "request_id": response['request_id'] };
        
          if (this.clientId)
            body2['clientid'] = this.clientId;
          else
            body2['officeId'] = office;

          this.loadingMobile = true;
          setTimeout(() => {
            this.loadingMobile = false;
          }, 122000);
          console.log('body2 = '); console.log(body2);
          this.clientService.verifyMobileStatus(body2).subscribe(response2 => {
            console.log(response2);
            this.loadingMobile = false;
            if(response2 && response2['result'] === 'success') {
              this.lastverifiedmobileNo = mobNumGiven;
              this.lastverifiedmobiledate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
              if(!this.clientId)
                this.clientId = response2['clientid'];
            } else {
              alert ("Mobile Number verification failed. Please recheck and try again.");
            }
          });
        });
      } else {
        alert ("Mobile Number verification failed. Please recheck and try again.");
      }

    });
  }

  // Function that verifies the Secondary Id Numbers by calling Karza API
   verifySecId() {
     let dob = this.createClientForm.get('dateOfBirth').value;
     let office = this.createClientForm.get('officeId').value;
     let name = this.createClientForm.get('firstname').value;
    let idProofSelected = (this.idproofOptions.find( (obj:any) => obj.id === this.createClientForm.get('idproofId').value))?.name;
    let idProofNoEntered = this.createClientForm.get('secIdProofNo').value;
    console.log('dob='+dob);
    console.log('idProof='+idProofSelected);

    const body = { 'consent': 'Y', "firstname": name,};
    if (this.clientId)
      body['clientid'] = this.clientId;
    else
      body['officeId'] = office;

    // SecondaryId = Pan Card
    if (idProofSelected === 'Pan Card') {
      body['pan'] = idProofNoEntered;
      console.log(body);
      this.loadingSecId = true;
      setTimeout(() => {
        this.loadingSecId = false;
      }, 122000);

      this.clientService.verifyPan(body).subscribe(response => {
        this.loadingSecId = false;
        console.log(response);
        // If return value has response has "result": "success", its successful
        if(response && response['result'] === 'success') {
          this.lastverifiedsecondaryid = response['lastverifiedsecondaryid'];
          this.lastverifiedSecondaryidDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
          if(!this.clientId)
            this.clientId = response['clientid'];
        } else {
          alert ("PAN Number verification failed. Please recheck and try again.");
        }
        this.loadingSecId = false;
      });
    }
    // SecondaryId = Voter ID
    else if (idProofSelected === 'Voter ID') {
      body['epic_no'] = idProofNoEntered;
      console.log(body);

      this.loadingSecId = true;
      setTimeout(() => {
        this.loadingSecId = false;
      }, 122000);
      this.clientService.verifyVoterId(body).subscribe(response => {
        console.log(response);
        this.loadingSecId = false;
        if(response && response['result'] === 'success') {
          this.lastverifiedsecondaryid = response['lastverifiedsecondaryid'];
          this.lastverifiedSecondaryidDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
          if(!this.clientId)
            this.clientId = response['clientid'];
        } else {
          alert ("Voter ID verification failed. Please recheck and try again.");
        }
        this.loadingSecId = false;
      });
    }
     // SecondaryId = Driving License 
    else if (idProofSelected == 'Driving License') {
      body['dlNo'] = idProofNoEntered;
      if (!dob || dob === "") {
        alert ("Please enter Date of Birth");
        return;
      }
      let dobDDMMYYY = ('0' + new Date(dob).getDate()).slice(-2) + "-" + ('0' + (new Date(dob).getMonth()+1)).slice(-2)  + "-" +  new Date(dob).getFullYear();
      body['dob'] = dobDDMMYYY;
      console.log(body);
      this.loadingSecId = true;
      setTimeout(() => {
        this.loadingSecId = false;
      }, 122000);
      this.clientService.verifyDl(body).subscribe(response => {
        console.log(response);
        if(response && response['result'] === 'success') {
          this.lastverifiedsecondaryid = response['lastverifiedsecondaryid'];
          this.lastverifiedSecondaryidDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
          if(!this.clientId)
            this.clientId = response['clientid'];
        } else {
          alert ("Driving License verification failed. Please recheck and try again.");
        }
        this.loadingSecId = false;
      });
    }
    // SecondaryId = Passport
    else if (idProofSelected == 'Passport') {
      if (!dob || dob === "") {
        alert ("Please enter Date of Birth");
        return;
      }
      let dobDDMMYYY = ('0' + new Date(dob).getDate()).slice(-2) + "/" + ('0' + (new Date(dob).getMonth()+1)).slice(-2)  + "/" +  new Date(dob).getFullYear();
      body['dob'] = dobDDMMYYY;
      body['name'] = name;
      const data = {
        title: 'Passport Verification - Enter File Number',
        formfields: this.getPopupDialogFormFields('passportDialog'),
        layout: { addButtonText: 'Verify Passport' },
      };
      const passportVerifyDialogRef1 = this.dialog.open(FormDialogComponent, { data });
      passportVerifyDialogRef1.afterClosed().subscribe((dialog1Response: any) => {
        body['passportNo'] = idProofNoEntered;
        body['fileNo'] = dialog1Response.data.value.fileNum;
        delete body['firstname'];
        console.log(body);
        this.loadingSecId = true;
        setTimeout(() => {
          this.loadingSecId = false;
        }, 122000);
        this.clientService.verifyPassport(body).subscribe(response => {
          console.log(response);
          this.loadingSecId = false;
          if(response && response['result'] === 'success') {
            this.lastverifiedsecondaryid = response['lastverifiedsecondaryid'];
            this.lastverifiedSecondaryidDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
            if(!this.clientId)
              this.clientId = response['clientid'];
          } else {
            alert ("Passport verification failed. Please recheck and try again.");
          }
          this.loadingSecId = false;
        });      
      })  

    }
  }

  
}