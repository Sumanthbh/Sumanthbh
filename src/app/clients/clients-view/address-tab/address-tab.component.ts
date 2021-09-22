/** Angular Imports */
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormfieldBase } from 'app/shared/form-dialog/formfield/model/formfield-base';
import { InputBase } from 'app/shared/form-dialog/formfield/model/input-base';
import { SelectBase } from 'app/shared/form-dialog/formfield/model/select-base';

/** Custom Components */
import { FormDialogComponent } from 'app/shared/form-dialog/form-dialog.component';

/** Custom Services */
import { ClientsService } from '../../clients.service';

/**
 * Clients Address Tab Component
 */
@Component({
  selector: 'mifosx-address-tab',
  templateUrl: './address-tab.component.html',
  styleUrls: ['./address-tab.component.scss']
})
export class AddressTabComponent {

  /** Client Address Data */
  clientAddressData: any;
  /** Client Address Field Config */
  clientAddressFieldConfig: any;
  /** Client Address Template */
  clientAddressTemplate: any;
  /** Client Id */
  clientId: string;

  kycAddressExists = false;
  commuAddressExists = false;
  /**
   * @param {ActivatedRoute} route Activated Route
   * @param {ClientsService} clientService Clients Service
   * @param {MatDialog} dialog Mat Dialog
   */
  constructor(private route: ActivatedRoute,
              private clientService: ClientsService,
              private dialog: MatDialog) {
    this.route.data.subscribe((data: {
      clientAddressData: any,
      clientAddressFieldConfig: any,
      clientAddressTemplateData: any
    }) => {
      this.clientAddressData = data.clientAddressData;
      this.clientAddressFieldConfig = data.clientAddressFieldConfig;
      this.clientAddressTemplate = data.clientAddressTemplateData;
      this.clientId = this.route.parent.snapshot.paramMap.get('clientId');
      console.log(data.clientAddressData);
      data.clientAddressData.forEach( (element : any) => {
        if(element.addressType === "KYC Address") {
          this.kycAddressExists = true;
        }
        if(element.addressType === "Communication Address") {
          this.commuAddressExists = true;
        }
      });
    });
  }

  /**
   * Adds a client address.
   */
  addAddress(addType: string) {
    let addTypeObj;
    if (addType === 'KYC') {
      addTypeObj = {id: this.clientAddressTemplate.addressTypeIdOptions.find((fieldObj: any) => fieldObj.name === "KYC Address").id, name: 'KYC Address'}
    } else {
      addTypeObj = {id: this.clientAddressTemplate.addressTypeIdOptions.find((fieldObj: any) => fieldObj.name === "Communication Address").id, name: 'Communication Address'}
    }
    const data = {
      title: 'Add Client Address',
      formfields: this.getAddressFormFields('add', null, addTypeObj)
    };
    const addAddressDialogRef = this.dialog.open(FormDialogComponent, { data });
    addAddressDialogRef.afterClosed().subscribe((response: any) => {
      if (response.data) {
        //console.log(response.data);
        this.clientService.createClientAddress(this.clientId, response.data.value.addressType, response.data.value).subscribe((res: any) => {
          const addressData = response.data.value;
          addressData.addressId = res.resourceId;
          addressData.addressType = this.getSelectedValue('addressTypeIdOptions', addressData.addressType).name;
          addType === 'KYC'? this.kycAddressExists = true : this.commuAddressExists = true;
          addressData.isActive = false;
          this.clientAddressData.push(addressData);
        });

      }
    });
  }

  /**
   * Edits an existing address.
   * @param {any} address Client address
   * @param {number} index address index
   */
  editAddress(address: any, index: number) {
    const data = {
      title: 'Edit Client Address',
      formfields: this.getAddressFormFields('edit', address),
      layout: { addButtonText: 'Submit' }
    };
    const editAddressDialogRef = this.dialog.open(FormDialogComponent, { data });
    editAddressDialogRef.afterClosed().subscribe((response: any) => {
      if (response.data) {
        //console.log(response.data.value);
        const addressData = response.data.value;
        addressData.addressId = address.addressId;
        addressData.isActive = address.isActive;
        this.clientService.editClientAddress(this.clientId, address.addressTypeId, addressData).subscribe((res: any) => {
          addressData.addressTypeId = address.addressTypeId;
          addressData.addressType = address.addressType;
          this.clientAddressData[index] = addressData;
        });
      }
    });
  }

  /**
   * Toggles address activity.
   * @param {any} address Client Address
   */
  toggleAddress(address: any) {
    const addressData = {
      'addressId': address.addressId,
      'isActive': address.isActive ? false : true
    };
    this.clientService.editClientAddress(this.clientId, address.addressTypeId, addressData).subscribe(() => {
      address.isActive = address.isActive ? false : true;
    });
  }

  /**
   * Checks if field is enabled in address config.
   * @param {any} fieldName Field Name
   */
  isFieldEnabled(fieldName: any) {
    return (this.clientAddressFieldConfig.find((fieldObj: any) => fieldObj.field === fieldName))?.isEnabled;
  }

  /**
   * Find Pipe doesn't work with accordian
   * @param {any} fieldName Field Name
   * @param {any} fieldId Field Id
   */
  getSelectedValue(fieldName: any, fieldId: Number) {
    //console.log(this.clientAddressTemplate[fieldName]);
    //console.log("get name for " + fieldId);
    return (this.clientAddressTemplate[fieldName].find((fieldObj: any) => fieldObj.id === fieldId));
  }

  /**
   * Returns address form fields for form dialog.
   * @param {string} formType Form Type
   * @param {any} address Address
   */
  getAddressFormFields(formType?: string, address?: any, addressTypeObj?: any) {
    let formfields: FormfieldBase[] = [];
    if (formType === 'add') {
      //console.log(addressTypeObj);
      formfields.push(this.isFieldEnabled('addressType') ? new SelectBase({
        controlName: 'addressType',
        label: 'Address Type',
        //value: address ? address.addressType : '',
        options: { label: 'name', value: 'id', data: [addressTypeObj] },
        order: 0
      }) : null);
    }
    formfields.push(this.isFieldEnabled('houseNo') ? new InputBase({
      controlName: 'houseNo',
      label: 'House No',
      value: address ? address.houseNo : '',
      type: 'text',
      required: true,
      order: 1
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
      label: 'Area',
      required: true,
      value: address ? address.addressLine1 : '',
      type: 'text',
      order: 3
    }) : null);
    formfields.push(this.isFieldEnabled('addressLine2') ? new InputBase({
      controlName: 'addressLine2',
      label: 'Landmark',
      value: address ? address.addressLine2 : '',
      type: 'text',
      required: false,
      order: 4
    }) : null);
    // formfields.push(this.isFieldEnabled('addressLine3') ? new InputBase({
    //   controlName: 'addressLine3',
    //   label: 'Address Line 3',
    //   value: address ? address.addressLine3 : '',
    //   type: 'text',
    //   order: 5
    // }) : null);
    formfields.push(this.isFieldEnabled('townVillage') ? new InputBase({
      controlName: 'townVillage',
      label: 'Town / Village',
      value: address ? address.townVillage : '',
      type: 'text',
      required: true,
      order: 5
    }) : null);
    // formfields.push(this.isFieldEnabled('city') ? new InputBase({
    //   controlName: 'city',
    //   label: 'City',
    //   value: address ? address.city : '',
    //   type: 'text',
    //   order: 7
    // }) : null);
    formfields.push(this.isFieldEnabled('talukaId') ? new SelectBase({
      controlName: 'talukaId',
      label: 'Taluka',
      required: true,
      value: address ? address.talukaId : '',
      options: { label: 'name', value: 'id', data: this.clientAddressTemplate.talukaIdOptions.sort((a:any,b:any)=>a.name.localeCompare(b.name)) },
      order: 6
    }) : null);
    formfields.push(this.isFieldEnabled('districtId') ? new SelectBase({
      controlName: 'districtId',
      label: 'District',
      required: true,
      value: address ? address.districtId : '',
      options: { label: 'name', value: 'id', data: this.clientAddressTemplate.districtIdOptions.sort((a:any,b:any)=>a.name.localeCompare(b.name)) },
      order: 7
    }) : null);
    formfields.push(this.isFieldEnabled('stateProvinceId') ? new SelectBase({
      controlName: 'stateProvinceId',
      label: 'State / Province',
      required: true,
      value: address ? address.stateProvinceId : '',
      options: { label: 'name', value: 'id', data: this.clientAddressTemplate.stateProvinceIdOptions },
      order: 8
    }) : null);
    // formfields.push(this.isFieldEnabled('countyDistrict') ? new InputBase({
    //   controlName: 'countryDistrict',
    //   label: 'Country District',
    //   value: address ? address.countyDistrict : '',
    //   type: 'text',
    //   order: 11
    // }) : null);
    // formfields.push(this.isFieldEnabled('countryId') ? new SelectBase({
    //   controlName: 'countryId',
    //   label: 'Country',
    //   value: address ? address.countryId : '',
    //   options: { label: 'name', value: 'id', data: this.clientAddressTemplate.countryIdOptions },
    //   order: 10
    // }) : null);
    formfields.push(this.isFieldEnabled('postalCode') ? new InputBase({
      controlName: 'postalCode',
      label: 'Postal Code',
      required: true,
      value: address ? address.postalCode : '',
      type: 'text',
      order: 11
    }) : null);
    formfields = formfields.filter(field => field !== null);
    return formfields;
  }

}
