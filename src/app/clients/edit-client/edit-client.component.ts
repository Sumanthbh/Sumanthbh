/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

/** Custom Services */
import { ClientsService } from '../clients.service';
import { SettingsService } from 'app/settings/settings.service';

import { FormfieldBase } from 'app/shared/form-dialog/formfield/model/formfield-base';
import { CheckboxBase } from 'app/shared/form-dialog/formfield/model/checkbox-base';
import { InputBase } from 'app/shared/form-dialog/formfield/model/input-base';
import { FormDialogComponent } from 'app/shared/form-dialog/form-dialog.component';

/**
 * Edit Client Component
 */
@Component({
  selector: 'mifosx-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  // /** Minimum date allowed. */
  // minDate = new Date(2000, 0, 1);
  // /** Maximum date allowed. */
  // maxDate = new Date();

  /** Minimum date for DOB. */
  now = new Date();
  minDateDob = new Date(this.now.getFullYear() - 65, this.now.getMonth(), this.now.getDate());
  /** Maximum DOB . */
  maxDateDob = new Date(this.now.getFullYear() - 18, this.now.getMonth(), this.now.getDate());

  /** Client Data and Template */
  clientDataAndTemplate: any;
  /** Edit Client Form */
  editClientForm: FormGroup;

  /** Office Options */
  officeOptions: any;
   /** Title Options */
  titleOptions: any;
  /** AlternateNo Options */
  altMobNumOfOptions: any;
  /** Father/Spouse Options */
  fatherspouseOptions: any;
  /** maritalStatus Options */
  maritalOptions: any;
  /** Education Options */
  educationOptions: any;
  /** Profession Options */
  professionOptions: any;
  /** Annual Options */
  annualOptions: any;
  /** Belonging Options */
  belongingOptions: any;
  /** Religion Options */
  religionOptions: any;
  /** IdProof Options */
  idproofOptions: any;
  /** addressProof Options */
  addrproofOptions: any;
  /** Staff Options */
  staffOptions: any;
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

  // AmountAppliedOptions: any;

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
  clientTemplate : any;
  clientAddress: any;
  /**
   * Fetches client template data from `resolve`
   * @param {FormBuilder} formBuilder Form Builder
   * @param {ActivatedRoute} route ActivatedRoute
   * @param {Router} router Router
   * @param {ClientsService} clientsService Clients Service
   * @param {DatePipe} datePipe Date Pipe
   * @param {MatDialog} dialog Mat Dialog
   * @param {SettingsService} settingsService Settings Service
   */
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private clientsService: ClientsService,
              private datePipe: DatePipe,
              private dialog: MatDialog,
              private settingsService: SettingsService) {
    this.route.data.subscribe((data: { clientDataAndTemplate: any, clientAddress: any, clientTemplate: any }) => {
      this.clientDataAndTemplate = data.clientDataAndTemplate;
      this.clientTemplate = data.clientTemplate;
      this.clientAddress = data.clientAddress;
      // this.AmountAppliedOptions = data.product;
      console.log(this.clientDataAndTemplate);
      
    });
  }

  ngOnInit() {
    this.createEditClientForm();
    this.setOptions();
    this.buildDependencies();
    this.editClientForm.patchValue({
      'officeId': this.clientDataAndTemplate.officeId,
      'staffId': this.clientDataAndTemplate.staffId,
      //'legalFormId': this.clientDataAndTemplate.legalForm && this.clientDataAndTemplate.legalForm.id,
      'accountNo': this.clientDataAndTemplate.accountNo,
      //'externalId': this.clientDataAndTemplate.externalId,
      'genderId': this.clientDataAndTemplate.gender && this.clientDataAndTemplate.gender.id,
      'isStaff': this.clientDataAndTemplate.isStaff,
      'active': this.clientDataAndTemplate.active,
      'alternateNoId': this.clientDataAndTemplate.alternateNo && this.clientDataAndTemplate.alternateNo.id,
      'firstname': this.clientDataAndTemplate.displayName,
      'fsfirstname': this.clientDataAndTemplate.fsFirstName,
      'fatherspouseId': this.clientDataAndTemplate.fatherspouse && this.clientDataAndTemplate.fatherspouse.id,
      'maritalId': this.clientDataAndTemplate.marital && this.clientDataAndTemplate.marital.id,
      'emailAddress': this.clientDataAndTemplate.emailAddress,
      // 'qualificationId': this.clientDataAndTemplate.qualificationId,
      'professionId': this.clientDataAndTemplate.profession && this.clientDataAndTemplate.profession.id,
      'annualId': this.clientDataAndTemplate.annual && this.clientDataAndTemplate.annual.id,
      'gstNo': this.clientDataAndTemplate.gstNo,
      'educationId': this.clientDataAndTemplate.education && this.clientDataAndTemplate.education.id,
      'titleId': this.clientDataAndTemplate.title && this.clientDataAndTemplate.title.id,
      'nrega': this.clientDataAndTemplate.nrega,
      'belongingId': this.clientDataAndTemplate.belonging && this.clientDataAndTemplate.belonging.id,
      'religionId': this.clientDataAndTemplate.religion && this.clientDataAndTemplate.religion.id,
      'idproofId': this.clientDataAndTemplate.idproof && this.clientDataAndTemplate.idproof.id,
      // 'addressTypeId': this.clientDataAndTemplate.addressTypeId && this.clientDataAndTemplate.addressTypeId.id,
      'secIdProofNo': this.clientDataAndTemplate.secIdProofNo,
      // 'AmountApplied': this.clientDataAndTemplate.AmountApplied && this.clientDataAndTemplate.AmountApplied.id,
      'addrproofId': this.clientDataAndTemplate.addrproof && this.clientDataAndTemplate.addrproof.id,
      'secaddressproofno': this.clientDataAndTemplate.secaddressproofno,
      'maidenname': this.clientDataAndTemplate.maidenName,
      'adhar': this.clientDataAndTemplate.adhar,
      'custmothername': this.clientDataAndTemplate.custmotherName,
      'alternateMobileNo': this.clientDataAndTemplate.alternateMobileNo,
      'mobileNo': this.clientDataAndTemplate.mobileNo,
      'dateOfBirth': this.clientDataAndTemplate.dateOfBirth && new Date(this.clientDataAndTemplate.dateOfBirth),
      'clientTypeId': this.clientDataAndTemplate.clientType && this.clientDataAndTemplate.clientType.id,
      'clientClassificationId': this.clientDataAndTemplate.clientClassification && this.clientDataAndTemplate.clientClassification.id,
      'submittedOnDate': this.clientDataAndTemplate.submittedOnDate && this.datePipe.transform(this.clientDataAndTemplate.submittedOnDate, 'dd/MM/yyyy'),
      'activationDate': this.clientDataAndTemplate.activationDate && this.datePipe.transform(this.clientDataAndTemplate.activationDate, 'dd/MM/yyyy'),
    });

    // For Karza verified display
    this.lastverifiedsecondaryid = this.clientDataAndTemplate.lastverifiedsecondaryid;
    this.lastverifiedSecondaryidDate = this.clientDataAndTemplate.lastverifiedSecondaryidDate?this.clientDataAndTemplate.lastverifiedSecondaryidDate[2]+"-"+this.clientDataAndTemplate.lastverifiedSecondaryidDate[1]+"-"+this.clientDataAndTemplate.lastverifiedSecondaryidDate[0]:'';
    this.lastverifiedadhar = this.clientDataAndTemplate.lastverifiedadhar;
    this.lastverifiedadhardate = this.clientDataAndTemplate.lastverifiedadhardate?this.clientDataAndTemplate.lastverifiedadhardate[2]+"-"+this.clientDataAndTemplate.lastverifiedadhardate[1]+"-"+this.clientDataAndTemplate.lastverifiedadhardate[0]:'';
    this.lastverifiedmobileNo = this.clientDataAndTemplate.lastverifiedmobile;
    this.lastverifiedmobiledate = this.clientDataAndTemplate.lastverifiedmobiledate?this.clientDataAndTemplate.lastverifiedmobiledate[2]+"-"+this.clientDataAndTemplate.lastverifiedmobiledate[1]+"-"+this.clientDataAndTemplate.lastverifiedmobiledate[0]:'';
    
  }

  /**
   * Creates the edit client form.
   */
  createEditClientForm() {
    this.editClientForm = this.formBuilder.group({
      'officeId': [{ value: '', disabled: true }],
      'staffId': [''],
      'legalFormId': [''],
      'firstname': ['', Validators.pattern('(^[A-z]).*') ],
      'maritalId': [''],
      'fatherspouseId':['', Validators.required],
      'addrproofId': [''],
      'secaddressproofno': ['', Validators.pattern('^[a-zA-Z0-9._-]+$')],
      'idproofId': [''],
      // 'addressTypeId': [''],
      'alternateNoId': [''],
      // 'qualificationId': [''],
      'professionId': [''],
      'annualId': [''],
      'belongingId': [''],
      'gstNo': ['', Validators.pattern('^[a-zA-Z0-9._-]+$')],
      'educationId': [''],
      'custmothername': ['', Validators.required],
      'maidenname': ['', Validators.required],
      'nrega': ['', Validators.pattern('^[a-zA-Z0-9._-]+$')],
      'fsfirstname': [''],
      'religionId': [''],
      'secIdProofNo': ['', Validators.pattern('^[a-zA-Z0-9._-]+$')],
      'titleId': [''],
      'isStaff': [false],
      'active': [false],
      'accountNo': [{ value: '', disabled: true }],
      'externalId': [''],
      'genderId': [''],
      'adhar': ['', Validators.pattern('^((\\+91-?)|0)?[0-9]{12}$')],
      'mobileNo': ['',  Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      'alternateMobileNo': ['',  Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      'dateOfBirth': ['', Validators.required],
      'emailAddress': ['', Validators.pattern('^[A-z0-9._%+-]+@[A-z0-9.-]+\\.[A-z]{2,4}$')],
      'clientTypeId': [''],
      'clientClassificationId': [''],
      'submittedOnDate': [''],
      'activationDate': [''],
      // 'AmountApplied': ['']
    });
  }

  /**
   * Sets select dropdown options.
   */
  setOptions() {
    this.officeOptions = this.clientDataAndTemplate.officeOptions;
    this.staffOptions = this.clientDataAndTemplate.staffOptions;
    this.legalFormOptions = this.clientDataAndTemplate.clientLegalFormOptions;
    this.clientTypeOptions = this.clientDataAndTemplate.clientTypeOptions;
    this.clientClassificationTypeOptions = this.clientDataAndTemplate.clientClassificationOptions;
    this.businessLineOptions = this.clientDataAndTemplate.clientNonPersonMainBusinessLineOptions;
    this.constitutionOptions = this.clientDataAndTemplate.clientNonPersonConstitutionOptions;
    this.genderOptions = this.clientDataAndTemplate.genderOptions;
    this.maritalOptions = this.clientDataAndTemplate.maritalOptions;
    this.titleOptions = this.clientDataAndTemplate.titleOptions;
    this.fatherspouseOptions = this.clientDataAndTemplate.fatherspouseOptions;
    this.educationOptions = this.clientDataAndTemplate.educationOptions;
    this.altMobNumOfOptions = this.clientDataAndTemplate.altMobNumOfOptions;
    this.professionOptions = this.clientDataAndTemplate.professionOptions;
    this.annualOptions = this.clientDataAndTemplate.annualOptions;
    this.belongingOptions = this.clientDataAndTemplate.belongingOptions;
    this.religionOptions = this.clientDataAndTemplate.religionOptions;
    this.idproofOptions = this.clientDataAndTemplate.idproofOptions;
    this.addrproofOptions = this.clientDataAndTemplate.addrproofOptions;
  }

  /**
   * Adds controls conditionally.
   */
  buildDependencies() {
       if (this.clientDataAndTemplate.active) {
          this.editClientForm.addControl('active', new FormControl(this.clientDataAndTemplate.active));
    //     this.editClientForm.removeControl('clientNonPersonDetails');
    //     this.editClientForm.addControl('firstname', new FormControl(this.clientDataAndTemplate.firstname, Validators.required));
    //     // this.editClientForm.addControl('middlename', new FormControl(this.clientDataAndTemplate.middlename));
    //     // this.editClientForm.addControl('lastname', new FormControl(this.clientDataAndTemplate.lastname, Validators.required));
       } else {
         this.editClientForm.removeControl('active');
    //     // this.editClientForm.removeControl('middlename');
    //     // this.editClientForm.removeControl('lastname');
    //     // this.editClientForm.addControl('fullname', new FormControl(this.clientDataAndTemplate.fullname, Validators.required));
    //     this.editClientForm.addControl('clientNonPersonDetails', this.formBuilder.group({
    //       'constitutionId': [this.clientDataAndTemplate.clientNonPersonDetails.constitution && this.clientDataAndTemplate.clientNonPersonDetails.constitution.id],
    //       'incorpValidityTillDate': [this.clientDataAndTemplate.clientNonPersonDetails.incorpValidityTillDate && new Date(this.clientDataAndTemplate.clientNonPersonDetails.incorpValidityTillDate)],
    //       'incorpNumber': [this.clientDataAndTemplate.clientNonPersonDetails.incorpNumber],
    //       'mainBusinessLineId': [this.clientDataAndTemplate.clientNonPersonDetails.mainBusinessLine && this.clientDataAndTemplate.clientNonPersonDetails.mainBusinessLine.id],
    //       'remarks': [this.clientDataAndTemplate.clientNonPersonDetails.remarks]
         }
  }

  /**
   * Submits the edit client form.
   */
  submit() {
    const controls = this.editClientForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            console.log(name);
        }
    }


    const locale = this.settingsService.language.code;
    const dateFormat = this.settingsService.dateFormat;
    // TODO: Update once language and date settings are setup
    const editClientFormValue: any = this.editClientForm.getRawValue();
    const clientData = {
      ...editClientFormValue,
      dateOfBirth: editClientFormValue.dateOfBirth && this.datePipe.transform(editClientFormValue.dateOfBirth, dateFormat),
      // submittedOnDate: editClientFormValue.submittedOnDate && this.datePipe.transform(editClientFormValue.submittedOnDate, dateFormat),
      // activationDate: editClientFormValue.activationDate && this.datePipe.transform(editClientFormValue.activationDate, dateFormat),
      dateFormat,
      locale
    };
    delete clientData.officeId;
    delete clientData.activationDate;
    delete clientData.active;
    delete clientData.submittedOnDate;
    // delete clientData.addrproofId;
    // delete clientData.gstNo;
    // delete clientData.custmotherName;
    // delete clientData.maidenName;
    // delete clientData.fsFirstName;


    // clientData['fsfirstname'] = 'temp';


    if (editClientFormValue.clientNonPersonDetails) {
      clientData.clientNonPersonDetails = {
        ...editClientFormValue.clientNonPersonDetails,
        incorpValidityTillDate: editClientFormValue.clientNonPersonDetails.incorpValidityTillDate && this.datePipe.transform(editClientFormValue.clientNonPersonDetails.incorpValidityTillDate, dateFormat),
        dateFormat,
        locale
      };
    } else {
      clientData.clientNonPersonDetails = {};
    }
    this.clientsService.updateClient(this.clientDataAndTemplate.id, clientData).subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

  // Function that calls karza backend api and verifies adaar number 
  verifyAadhaar() {
    let name = this.editClientForm.get('firstname').value;

    const data = {
      title: 'Aadhaar Verification',
      formfields: this.getPopupDialogFormFields('adharDialog1'),
      layout: { addButtonText: 'Verify Aadhaar' },
    };
    const adhaarVerifyDialogRef1 = this.dialog.open(FormDialogComponent, { data });
    adhaarVerifyDialogRef1.afterClosed().subscribe((dialog1Response: any) => {
      console.log(dialog1Response);
      console.log('Adhar is linked='+dialog1Response.data.value.linkedCBox);
      let adharGiven = this.editClientForm.get('adhar').value;
      const body = {'aadhaarNo':adharGiven, "name": name, "clientData": {"caseId":Math.floor(Math.random()*90000) + 10000}};

      body['clientid'] = this.clientDataAndTemplate.id;
      console.log(body);  
      if(dialog1Response.data.value.linkedCBox){
        // OTP API to be invoked

        this.loadingAdhar = true;
        setTimeout(() => {
          this.loadingAdhar = false;
        }, 122000);
        this.clientsService.verifyAadhaarWithOtpStep1(body).subscribe(response => {
          console.log(response);
          if(response && response['karzaresult'] === 'success') {
            // Ask user to enter OTP in dialog.
            const data = {
              title: 'Aadhaar Verification - Enter OTP',
              formfields: this.getPopupDialogFormFields('adharDialog2'),
              layout: { addButtonText: 'Validate OTP' },
            };
            const adhaarVerifyDialogRef2 = this.dialog.open(FormDialogComponent, { data });
            adhaarVerifyDialogRef2.afterClosed().subscribe((dialog2Response: any) => {
            console.log(dialog2Response);
            
            const body2 = {'adharnumber':adharGiven, "firstname": name, "otp": dialog2Response.data.value.enterOtp,
              "accessKey": response['result']['accessKey'], "clientData": {"caseId": response['clientData']['caseId']}, "shareCode" :Math.floor(Math.random()*9000) + 1000       
              };
              body2['clientid'] = this.clientDataAndTemplate.id;
              this.loadingAdhar = true;
              setTimeout(() => {
                this.loadingAdhar = false;
              }, 122000);
              console.log('body 2' + body2);
              this.clientsService.verifyAadhaarWithOtpStep2(body2).subscribe(response2 => {
                console.log(response2);
                if(response2 && response2['result'] === 'success') {
                  // Set KYC Address and Last Verified fields
                  let addrType = this.clientAddress.find((fieldObj: any) => fieldObj.addressType === "KYC Address").addressTypeId;
                  let addrId = this.clientAddress.find((fieldObj: any) => fieldObj.addressType === "KYC Address").addressId;
                  let kycAddr = {"addressId": addrId,
                          "houseNo": response2['split-address']['houseNumber'],
                          "street": response2['split-address']['street'],
                          "addressLine1": response2['split-address']['location'],
                          "addressLine2": response2['split-address']['landmark'],
                          "townVillage": response2['split-address']['postOffice'],
                          "talukaId": this.clientTemplate.address.talukaIdOptions.find((Obj: any) => Obj.name === response2['split-address']['subdistrict'])?.id,
                          "districtId": this.clientTemplate.address.districtIdOptions.find((Obj: any) => Obj.name === response2['split-address']['district'])?.id,
                          "stateProvinceId": this.clientTemplate.address.stateProvinceIdOptions.find((Obj: any) => Obj.name === response2['split-address']['state'])?.id,
                          "postalCode": response2['split-address']['pincode']};

                  this.clientsService.editClientAddress(this.clientDataAndTemplate.id, addrType, kycAddr).subscribe(result1 => {
                    //console.log(result1);
                  });

                  this.lastverifiedadhar = response2['lastverifiedadhar'];
                  this.lastverifiedadhardate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
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
        this.clientsService.verifyAadhaarWithoutOtp(body).subscribe(response => {
          console.log(response);
          if(response && response['result'] === 'success') {
            this.lastverifiedadhar = response['lastverifiedadhar'];
            this.lastverifiedadhardate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
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
        value: this.editClientForm.controls.adhar.value,
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
        value: this.editClientForm.controls.adhar.value,
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
        value: this.editClientForm.controls.mobileNo.value,
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
    let name = this.editClientForm.get('firstname').value;
    let mobNumGiven = this.editClientForm.get('mobileNo').value;
    const body = { 'mobile':mobNumGiven};
    body['clientid'] = this.clientDataAndTemplate.id;

    console.log('body =');  console.log(body);  
    this.loadingMobile = true;
    setTimeout(() => {
      this.loadingMobile = false;
    }, 122000);
    this.clientsService.verifyMobileOtp(body).subscribe(response => {
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
        
          body2['clientid'] = this.clientDataAndTemplate.id;

          this.loadingMobile = true;
          setTimeout(() => {
            this.loadingMobile = false;
          }, 122000);
          console.log('body2 = '); console.log(body2);
          this.clientsService.verifyMobileStatus(body2).subscribe(response2 => {
            console.log(response2);
            this.loadingMobile = false;
            if(response2 && response2['result'] === 'success') {
              this.lastverifiedmobileNo = mobNumGiven;
              this.lastverifiedmobiledate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
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
     let dob = this.editClientForm.get('dateOfBirth').value;
     let name = this.editClientForm.get('firstname').value;
    let idProofSelected = (this.idproofOptions.find( (obj:any) => obj.id === this.editClientForm.get('idproofId').value))?.name;
    let idProofNoEntered = this.editClientForm.get('secIdProofNo').value;
    console.log('dob='+dob);
    console.log('idProof='+idProofSelected);

    const body = { 'consent': 'Y', "firstname": name,};
    body['clientid'] = this.clientDataAndTemplate.id;

    // SecondaryId = Pan Card
    if (idProofSelected === 'Pan Card') {
      body['pan'] = idProofNoEntered;
      console.log(body);
      this.loadingSecId = true;
      setTimeout(() => {
        this.loadingSecId = false;
      }, 122000);

      this.clientsService.verifyPan(body).subscribe(response => {
        this.loadingSecId = false;
        console.log(response);
        // If return value has response has "result": "success", its successful
        if(response && response['result'] === 'success') {
          this.lastverifiedsecondaryid = response['lastverifiedsecondaryid'];
          this.lastverifiedSecondaryidDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
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
      this.clientsService.verifyVoterId(body).subscribe(response => {
        console.log(response);
        this.loadingSecId = false;
        if(response && response['result'] === 'success') {
          this.lastverifiedsecondaryid = response['lastverifiedsecondaryid'];
          this.lastverifiedSecondaryidDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
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
      this.clientsService.verifyDl(body).subscribe(response => {
        console.log(response);
        if(response && response['result'] === 'success') {
          this.lastverifiedsecondaryid = response['lastverifiedsecondaryid'];
          this.lastverifiedSecondaryidDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
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
        this.clientsService.verifyPassport(body).subscribe(response => {
          console.log(response);
          this.loadingSecId = false;
          if(response && response['result'] === 'success') {
            this.lastverifiedsecondaryid = response['lastverifiedsecondaryid'];
            this.lastverifiedSecondaryidDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
          } else {
            alert ("Passport verification failed. Please recheck and try again.");
          }
          this.loadingSecId = false;
        });      
      })  

    }
  }  
}
