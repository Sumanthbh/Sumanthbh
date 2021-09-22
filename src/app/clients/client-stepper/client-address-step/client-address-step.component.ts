/** Angular Imports */
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

/** Custom Models */
import { FormfieldBase } from 'app/shared/form-dialog/formfield/model/formfield-base';
import { InputBase } from 'app/shared/form-dialog/formfield/model/input-base';
import { SelectBase } from 'app/shared/form-dialog/formfield/model/select-base';

/** Custom Dialogs */
import { FormDialogComponent } from 'app/shared/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from 'app/shared/delete-dialog/delete-dialog.component';
import { SystemService } from 'app/system/system.service';

/**
 * Client Address Step Component
 */
@Component({
  selector: 'mifosx-client-address-step',
  templateUrl: './client-address-step.component.html',
  styleUrls: ['./client-address-step.component.scss']
})

export class ClientAddressStepComponent implements OnInit {

  /** Client Address Field Config */
  @Input() clientAddressFieldConfig: any;
  /** Client Template */
  @Input() clientTemplate: any;
  /** Create Client Form */
  createClientAddressForm: FormGroup;

  @Input() createClientForm: any;

  kycClicked = false;

  /** Taluka Options */
  talukaOptions: any;
  /** District Options */
  districtOptions: any;
  /** State Options */
  stateOptions: any;
  
  villageOptions: any;

  kycvillageOptions: any;

  /** Client Address Data */
  clientAddressData: any[] = [];

  /**
   * @param {MatDialog} dialog Mat Dialog
   * @param {FormBuilder} formBuilder Form Builder
   */
  constructor(private dialog: MatDialog, private formBuilder: FormBuilder,
    private systemService: SystemService) { 
    this.setClientAddressForm();
  }

  ngOnInit() {
    this.setOptions();
    this.kycClicked = true; // setting to true as below call to isKycAddSameClicked() will set as false;
    this.isKycAddSameClicked();
  }

  /**
   * Creates the client form.
   */
  setClientAddressForm() {
    this.createClientAddressForm = this.formBuilder.group({
      'c_houseNumber': ['', [Validators.required]],
      'c_streetNumber': ['', [Validators.required]],
      'c_area': ['', [Validators.required]],
      'c_landmark': [''],
      'c_villageTown': ['', [Validators.required]],
      'c_talukaId': ['', [Validators.required]],
      'c_districtId': ['', [Validators.required]],
      'c_stateId': ['', [Validators.required]],
      'c_pincode': ['', [Validators.required, Validators.pattern('(^[0-9]{6})')]],
      'isKycAddSame' : [true],
      'kyc_houseNumber': ['', [Validators.required]],
      'kyc_streetNumber': ['', [Validators.required]],
      'kyc_area': ['', [Validators.required]],
      'kyc_landmark': [''],
      'kyc_villageTown': ['', [Validators.required]],
      'kyc_talukaId': ['', [Validators.required]],
      'kyc_districtId': ['', [Validators.required]],
      'kyc_stateId': ['', [Validators.required]],
      'kyc_pincode': ['', [Validators.pattern('(^[0-9]{6})')]]

    });

  }

  /**
   * Sets select dropdown options.
   */
  setOptions() {
    this.talukaOptions = this.clientTemplate.address.talukaIdOptions.sort((a:any,b:any)=>a.name.localeCompare(b.name));
    this.districtOptions = this.clientTemplate.address.districtIdOptions.sort((a:any,b:any)=>a.name.localeCompare(b.name));
    this.stateOptions = this.clientTemplate.address.stateProvinceIdOptions;

  }

  // Set the Communication address fields as same as Kyc address if true
  isKycAddSameClicked() {
    this.kycClicked =!this.kycClicked;

    if (this.kycClicked){
 
      this.createClientAddressForm.get('c_houseNumber').setValue('');
      this.createClientAddressForm.get('c_streetNumber').setValue('');
      this.createClientAddressForm.get('c_area').setValue('');
      this.createClientAddressForm.get('c_landmark').setValue('');
      this.createClientAddressForm.get('c_villageTown').setValue('');
      this.createClientAddressForm.get('c_talukaId').setValue('');
      this.createClientAddressForm.get('c_districtId').setValue('');
      this.createClientAddressForm.get('c_stateId').setValue('');
      this.createClientAddressForm.get('c_pincode').setValue('');
      // this.createClientAddressForm.get('c_houseNumber').setValue('');
      // this.createClientAddressForm.get('c_houseNumber').setValue('');
    } else {

      this.createClientAddressForm.get('c_houseNumber').setValue(this.createClientAddressForm.get('kyc_houseNumber').value);
      this.createClientAddressForm.get('c_streetNumber').setValue(this.createClientAddressForm.get('kyc_streetNumber').value);
      this.createClientAddressForm.get('c_area').setValue(this.createClientAddressForm.get('kyc_area').value);
      this.createClientAddressForm.get('c_landmark').setValue(this.createClientAddressForm.get('kyc_landmark').value);
      this.createClientAddressForm.get('c_villageTown').setValue(this.createClientAddressForm.get('kyc_villageTown').value);
      this.createClientAddressForm.get('c_talukaId').setValue(this.createClientAddressForm.get('kyc_talukaId').value);
      this.createClientAddressForm.get('c_districtId').setValue(this.createClientAddressForm.get('kyc_districtId').value);
      this.createClientAddressForm.get('c_stateId').setValue(this.createClientAddressForm.get('kyc_stateId').value);
      this.createClientAddressForm.get('c_pincode').setValue(this.createClientAddressForm.get('kyc_pincode').value);
    }
  }

  copyAddress(){
    // Copy address values into communication address from kyc fields when address is same.
    if (!this.kycClicked){
      this.createClientAddressForm.get('c_houseNumber').setValue(this.createClientAddressForm.get('kyc_houseNumber').value);
      this.createClientAddressForm.get('c_streetNumber').setValue(this.createClientAddressForm.get('kyc_streetNumber').value);
      this.createClientAddressForm.get('c_area').setValue(this.createClientAddressForm.get('kyc_area').value);
      this.createClientAddressForm.get('c_landmark').setValue(this.createClientAddressForm.get('kyc_landmark').value);
      this.createClientAddressForm.get('c_villageTown').setValue(this.createClientAddressForm.get('kyc_villageTown').value);
      this.createClientAddressForm.get('c_talukaId').setValue(this.createClientAddressForm.get('kyc_talukaId').value);
      this.createClientAddressForm.get('c_districtId').setValue(this.createClientAddressForm.get('kyc_districtId').value);
      this.createClientAddressForm.get('c_stateId').setValue(this.createClientAddressForm.get('kyc_stateId').value);
      this.createClientAddressForm.get('c_pincode').setValue(this.createClientAddressForm.get('kyc_pincode').value);
    }
  }


  /**
   * Adds a client address
   */
/*  addAddress() {
    const data = {
      title: 'Add Client Address',
      formfields: this.getAddressFormFields()
    };
    const addAddressDialogRef = this.dialog.open(FormDialogComponent, { data });
    addAddressDialogRef.afterClosed().subscribe((response: any) => {
      if (response.data) {
        const addressData = response.data.value;
        addressData.isActive = false;
        for (const key in addressData) {
          if (addressData[key] === '' || addressData[key] === undefined) {
            delete addressData[key];
          }
        }
        this.clientAddressData.push(addressData);
      }
    });
  }
*/

  /**
   * Edit Address
   * @param {any} address Address
   * @param {number} index Address index
   */
/*  editAddress(address: any, index: number) {
    const data = {
      title: 'Edit Client Address',
      formfields: this.getAddressFormFields(address),
      layout: { addButtonText: 'Edit' }
    };
    const editAddressDialogRef = this.dialog.open(FormDialogComponent, { data });
    editAddressDialogRef.afterClosed().subscribe((response: any) => {
      if (response.data) {
        const addressData = response.data.value;
        addressData.isActive = address.isActive;
        for (const key in addressData) {
          if (addressData[key] === '' || addressData[key] === undefined) {
            delete addressData[key];
          }
        }
        this.clientAddressData[index] = addressData;
      }
    });
  }
*/
  /**
   * @param {any} address Client Address
   * @param {number} index Address index
   */
/*  deleteAddress(address: any, index: number) {
    const deleteAddressDialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { deleteContext: `address type : ${address.addressType} ${index}` }
    });
    deleteAddressDialogRef.afterClosed().subscribe((response: any) => {
      if (response.delete) {
        this.clientAddressData.splice(index, 1);
      }
    });
  }
*/
  /**
   * Toggles address activity
   * @param {any} address Address
   */
  toggleAddress(address: any) {
    address.isActive = address.isActive ? false : true;
  }

  /**
   * Checks if field is enabled in address configuration
   * @param {any} address Address
   */
  isFieldEnabled(fieldName: any) {
    return (this.clientAddressFieldConfig.find((fieldObj: any) => fieldObj.field === fieldName))?.isEnabled;
  }

  /**
   * Retrieves field Id from name.
   * Find pipe doesn't work with accordian.
   * @param {any} address Address
   */
  getSelectedValue(fieldName: any, fieldId: any) {
    //console.log('fieldName =' + fieldName + ", fieldId = "+ fieldId);
    //console.log (this.clientTemplate);
    //console.log (this.clientTemplate.address[fieldName]);

    if (this.clientTemplate.address[fieldName] && fieldId) {
      const ret = this.clientTemplate.address[fieldName].find((fieldObj: any) => fieldObj.id === fieldId);
      //console.log(ret);
      return ret;
    } else {
      return '';
    }
  }

  /**
   * Gets formfields for form dialog.
   * @param {any} address Address
   */
  /*getAddressFormFields(address?: any) {
    let formfields: FormfieldBase[] = [];
    formfields.push(this.isFieldEnabled('addressType') ? new SelectBase({
      controlName: 'addressTypeId',
      label: 'Address Type',
      value: address ? address.addressTypeId : '',
      options: { label: 'name', value: 'id', data: [{'id': '1', 'displayName': 'permanent'}]}, //this.clientTemplate.address[0].addressTypeIdOptions },
      order: 1,
      required: true
    }) : null);
    formfields.push(this.isFieldEnabled('street') ? new InputBase({
      controlName: 'street',
      label: 'Street',
      value: address ? address.street : '',
      type: 'text',
      required: true,
      order: 2
    }) : null);
    formfields.push(this.isFieldEnabled('addressLine1') ? new InputBase({
      controlName: 'addressLine1',
      label: 'Address Line 1',
      value: address ? address.addressLine1 : '',
      type: 'text',
      order: 3
    }) : null);
    formfields.push(this.isFieldEnabled('addressLine2') ? new InputBase({
      controlName: 'addressLine2',
      label: 'Address Line 2',
      value: address ? address.addressLine2 : '',
      type: 'text',
      order: 4
    }) : null);
    formfields.push(this.isFieldEnabled('addressLine3') ? new InputBase({
      controlName: 'addressLine3',
      label: 'Address Line 3',
      value: address ? address.addressLine3 : '',
      type: 'text',
      order: 5
    }) : null);
    formfields.push(this.isFieldEnabled('townVillage') ? new InputBase({
      controlName: 'townVillage',
      label: 'Town / Village',
      value: address ? address.townVillage : '',
      type: 'text',
      order: 6
    }) : null);
    formfields.push(this.isFieldEnabled('city') ? new InputBase({
      controlName: 'city',
      label: 'City',
      value: address ? address.city : '',
      type: 'text',
      order: 7
    }) : null);
    formfields.push(this.isFieldEnabled('stateProvinceId') ? new SelectBase({
      controlName: 'stateProvinceId',
      label: 'State / Province',
      value: address ? address.stateProvinceId : '',
      options: { label: 'name', value: 'id', data: [{'id': '1', 'displayName': 'permanent'}]}, //this.clientTemplate.address[0].stateProvinceIdOptions },
      order: 8
    }) : null);
    formfields.push(this.isFieldEnabled('countyDistrict') ? new InputBase({
      controlName: 'countryDistrict',
      label: 'Country District',
      value: address ? address.countyDistrict : '',
      type: 'text',
      order: 11
    }) : null);
    formfields.push(this.isFieldEnabled('countryId') ? new SelectBase({
      controlName: 'countryId',
      label: 'Country',
      value: address ? address.countryId : '',
      options: { label: 'name', value: 'id', data: [{'id': '1', 'displayName': 'permanent'}]}, //this.clientTemplate.address[0].countryIdOptions },
      order: 10
    }) : null);
    formfields.push(this.isFieldEnabled('postalCode') ? new InputBase({
      controlName: 'postalCode',
      label: 'Postal Code',
      value: address ? address.postalCode : '',
      type: 'text',
      order: 11
    }) : null);
    formfields = formfields.filter(field => field !== null);
    return formfields;
  }
*/
  /**
   * Returns the array of client addresses
   */
  get address() {
    return this.createClientAddressForm.value;
  }

  // Fetch details associated with given pincode 
  queryPincode() {
    var pincode = this.createClientAddressForm.get('kyc_pincode').value;
    // console.log(pincode);console.log(pincode.length());
    // if (pincode.length !== 6) {
    //   alert ('Pincode is invalid');
    //   return;
    // }
    this.systemService.getPincodeDtls(pincode).subscribe(data => {
      if (data === undefined || data.length === 0 || data.totalFilteredRecords === 0) {
        alert ('Pincode not found');
      } else {
        this.kycvillageOptions = data.pageItems;
        this.createClientAddressForm.get('kyc_talukaId').setValue(this.talukaOptions.find((Obj: any) => Obj.name === data.pageItems[0].taluk)?.id);
        this.createClientAddressForm.get('kyc_districtId').setValue(this.districtOptions.find((Obj: any) => Obj.name === data.pageItems[0].district)?.id);
        this.createClientAddressForm.get('kyc_stateId').setValue(this.stateOptions.find((Obj: any) => Obj.name === data.pageItems[0].state)?.id);
      }
    })
  }

  queryPincodeCorres() {
    var pincode = this.createClientAddressForm.get('c_pincode').value;
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
        this.createClientAddressForm.get('c_talukaId').setValue(this.talukaOptions.find((Obj: any) => Obj.name === data.pageItems[0].taluk)?.id);
        this.createClientAddressForm.get('c_districtId').setValue(this.districtOptions.find((Obj: any) => Obj.name === data.pageItems[0].district)?.id);
        this.createClientAddressForm.get('c_stateId').setValue(this.stateOptions.find((Obj: any) => Obj.name === data.pageItems[0].state)?.id);
      }
    })
  }

  // console out control name which is invalid. 
  findInvalidControl() {
    const controls = this.createClientAddressForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            console.log(name);
        }
    }
  }

}


