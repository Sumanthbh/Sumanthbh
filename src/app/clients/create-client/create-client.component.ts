/** Angular Imports */
import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/** Custom Services */
import { ClientsService } from '../clients.service';

/** Custom Components */
import { ClientGeneralStepComponent } from '../client-stepper/client-general-step/client-general-step.component';
import { ClientFamilyMembersStepComponent } from '../client-stepper/client-family-members-step/client-family-members-step.component';
import { ClientAddressStepComponent } from '../client-stepper/client-address-step/client-address-step.component';
// import { ClientNomineeStepComponent } from '../client-stepper/client-nominee-step/client-nominee-step.component';
import { ClientFinDetailStepComponent } from '../client-stepper/client-fin-detail-step/client-fin-detail-step.component';

/** Custom Services */
import { SettingsService } from 'app/settings/settings.service';


/**
 * Create Client Component.
 */
@Component({
  selector: 'mifosx-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent {

  /** Client General Step */
  @ViewChild(ClientGeneralStepComponent, { static: true }) clientGeneralStep: ClientGeneralStepComponent;
  /** Client Family Members Step */
  @ViewChild(ClientFamilyMembersStepComponent, { static: true }) clientFamilyMembersStep: ClientFamilyMembersStepComponent;
  /** Client Address Step */
  @ViewChild(ClientAddressStepComponent, { static: true }) clientAddressStep: ClientAddressStepComponent;

  /** Client Nominee Step */
  // @ViewChild(ClientNomineeStepComponent, { static: true }) clientNomineeStep: ClientNomineeStepComponent;

  /** Client Finance Detail Step */
  @ViewChild(ClientFinDetailStepComponent, { static: true }) clientFinDetailStep: ClientFinDetailStepComponent;

  /** Client Template */
  clientTemplate: any;

  /** Client Address Field Config */
  clientAddressFieldConfig: any;

  /** Chit amount applied */
  AmountAppliedData: any;

  /**
   * Fetches client and address template from `resolve`
   * @param {ActivatedRoute} route Activated Route
   * @param {Router} router Router
   * @param {ClientsService} clientsService Clients Service
   * @param {SettingsService} settingsService Setting service
   */
  constructor(private route: ActivatedRoute,
    private router: Router,
    private clientsService: ClientsService,
    private settingsService: SettingsService) {
    this.route.data.subscribe((data: { clientTemplate: any, clientAddressFieldConfig: any, product: any }) => {
      this.clientTemplate = data.clientTemplate;
      this.clientAddressFieldConfig = data.clientAddressFieldConfig;
      this.AmountAppliedData = data.product;
    });
  }

  /**
   * Retrieves general information about client.
   */
  get clientGeneralForm() {
    return this.clientGeneralStep.createClientForm;
  }

  /**
   * Retrieves Address information about client.
   */
  get clientAddressForm() {
    return this.clientAddressStep.createClientAddressForm;
  }
  

  /**
   * Retrieves Address information about client.
   */
  //  get clientNomineeForm() {
  //   return this.clientNomineeStep.nomineeMemberForm;
  // }
  
  /**
  *   Retrieves the client object
  **/
  get client() {
    return {
      ...this.clientGeneralStep.clientGeneralDetails,
      ...this.clientFamilyMembersStep.familyMembers,
      ...this.clientAddressStep.address,
      // ...this.clientNomineeStep.nominee,
      ...this.clientFinDetailStep.finDetails

    };
  }
  /**
   * Submits the create client form.
   */
  submit() {
    const locale = this.settingsService.language.code;
    const dateFormat = this.settingsService.dateFormat;
    const addrKYC = {
     // "addressTypeId": 151,
     "addressTypeId": this.clientTemplate.address.addressTypeIdOptions.find((fieldObj: any) => fieldObj.name === "KYC Address").id,
      "houseNo": this.client["kyc_houseNumber"],
      "street": this.client["kyc_streetNumber"],
      "addressLine1": this.client["kyc_area"],
      "addressLine2": this.client["kyc_landmark"],
      "townVillage" : this.client["kyc_villageTown"],
      "talukaId": this.client["kyc_talukaId"],
      "districtId" : this.client["kyc_districtId"],
      "stateProvinceId": this.client["kyc_stateId"],
      "postalCode": this.client["kyc_pincode"]
    }
    const addrCommn = {
    //  "addressTypeId": 152,
      "addressTypeId": this.clientTemplate.address.addressTypeIdOptions.find((fieldObj: any) => fieldObj.name === "Communication Address").id,
      "houseNo": this.client["c_houseNumber"],
      "street": this.client["c_streetNumber"],
      "addressLine1": this.client["c_area"],
      "addressLine2": this.client["c_landmark"],
      "townVillage" : this.client["c_villageTown"],
      "talukaId": this.client["c_talukaId"],
      "districtId" : this.client["c_districtId"],
      "stateProvinceId": this.client["c_stateId"],
      "postalCode": this.client["c_pincode"]
    }

    const clientData = {
      ...this.client,
      "address" : [addrKYC, addrCommn],
      dateFormat,
      locale
    };
    // for (const key in this.clientFinDetailStep.finDetails) {
    //   console.log(key); 
    //   console.log(clientData[key]);
    // }
    delete clientData["kyc_area"];
    delete clientData["kyc_districtId"];
    delete clientData["kyc_houseNumber"];
    delete clientData["kyc_landmark"];
    delete clientData["kyc_pincode"];
    delete clientData["kyc_stateId"];
    delete clientData["kyc_streetNumber"];
    delete clientData["kyc_talukaId"];
    delete clientData["kyc_villageTown"];
    
    delete clientData["c_area"];
    delete clientData["c_districtId"];
    delete clientData["c_houseNumber"];
    delete clientData["c_landmark"];
    delete clientData["c_pincode"];
    delete clientData["c_stateId"];
    delete clientData["c_streetNumber"];
    delete clientData["c_talukaId"];
    delete clientData["c_villageTown"];
    delete clientData["isKycAddSame"];

    delete clientData["temp_tot_exp"];
    
    console.log(clientData);
     
    if (clientData.clientId) {
      let updateClientID = clientData.clientId;
      delete clientData['clientId'];
      delete clientData['officeId'];
      // Client would have already been created in Karza Verfication Flow. Call Put.
      this.clientsService.updateClient(updateClientID, clientData).subscribe((response: any) => {
        this.router.navigate(['../', response.resourceId], { relativeTo: this.route });
      });
    } else {
      // Call Post
      this.clientsService.createClient(clientData).subscribe((response: any) => {
        this.router.navigate(['../', response.resourceId], { relativeTo: this.route });
      });
    }
    

  }

}
