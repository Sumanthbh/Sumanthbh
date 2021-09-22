/** Angular Imports */
import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import {formatNumber} from '@angular/common';
import "@angular/common/locales/global/en-IN";

/** Custom Services */
import { ChitGroupsService } from '../chitgroups.service';
import { ClientsService } from '../../clients/clients.service';
import { SettingsService } from 'app/settings/settings.service';
import { AlertService } from '../../core/alert/alert.service';
import { DeleteDialogComponent } from '../../shared/delete-dialog/delete-dialog.component';

/**
 * Edit ChitGroup component.
 */
@Component({
  selector: 'mifosx-edit-chitgroup',
  templateUrl: './edit-chitgroup.component.html',
  styleUrls: ['./edit-chitgroup.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditChitGroupComponent implements OnInit, AfterViewInit {

  /** Minimum date allowed. */
  now = new Date();
  startminDate = new Date(this.now.getFullYear(), this.now.getMonth() -6, this.now.getDate());
  /** Maximum date allowed. */
  startmaxDate = new Date(this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate());
  fdrIssueMinDate = new Date(this.now.getFullYear(), this.now.getMonth()-6, this.now.getDate());
  fdrIssueMaxDate = new Date();
  fdrMatuMinDate = new Date();
  fdrMatuMaxDate = new Date(this.now.getFullYear()+5, this.now.getMonth(), this.now.getDate());
  /** ChitGroup form. */
  chitgroupForm: FormGroup;
  /** Office data. */
  officeData: any;
  // FDR/PSO/CC certificate documents
  documents: any[];
  cyclefrequencyOptions: any;
  collectionfrequencyOptions: any;
  intPayableCycleOptions: any;
  /** Client data. */
  clientsData: any = [];
  /** Staff data. */
  staffData: any;
  /** Client Members. */
  clientMembers: any[] = [];
  chitgroupData : any;
  monContribution : Number = 0;
  //auctionDaySelection?: string;
  calendarDaysArry : number[] = [1,2,3,4,5,6,7,8,9,10,
                                  11,12,13,14,15,16,17,18,19,20,
                                  21,22,23,24,25,26,27,28];
  dayTypeArry : string[] = ["First", "Second", "Third", "Fourth","Last"];
  weekDayArry : string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  auctionDayTypes: string[] = ["Calendar Day", "Flexible Day"];
  
  fdrDocFile: File;
  fdrFileName: any = '';
  fdrFileSize: Number;
  psoDocFile: File;
  psoFileName: any = '';
  psoFileSize: Number;
  ccDocFile: File;
  ccFileName: any = '';
  ccFileSize: Number;
  fdrFileExists: boolean;
  psoFileExists: boolean;
  ccFileExists: boolean;

  /**
   * Retrieves the offices data from `resolve`.
   * @param {FormBuilder} formBuilder Form Builder.
   * @param {ActivatedRoute} route Activated Route.
   * @param {Router} router Router for navigation.
   * @param {ClientsService} clientsService CentersService.
   * @param {ChitGroupsService} chitgroupService ChitGroupsService.
   * @param {DatePipe} datePipe Date Pipe to format date.
   * @param {SettingsService} settingsService SettingsService
   */
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private clientsService: ClientsService,
              private chitgroupService: ChitGroupsService,
              public dialog: MatDialog,
              private datePipe: DatePipe,
              private settingsService: SettingsService,
              private alertService: AlertService) {
    this.route.data.subscribe( (data: {offices: any, chitgroupViewData: any, documents: any} ) => {
      this.officeData = data.offices;
      this.chitgroupData = data.chitgroupViewData;
      this.documents = data.documents;
console.log(this.documents);      
    });
  }

  /**
   * Edits and sets the chitgroup form.
   */
  ngOnInit() {
    this.editChitGroupForm();
    console.log('this.chitgroupData');
    console.log(this.chitgroupData);
    this.chitgroupForm.patchValue({
      
      'name': this.chitgroupData.name,
      'officeId': this.chitgroupData.officeId,
      'chitcyclefrequency': this.chitgroupData.chitcyclefrequency,
      'chitcollectionfrequency': this.chitgroupData.chitcollectionfrequency,
      'startdate': this.chitgroupData.startdate && new Date(this.chitgroupData.startdate),
      'auctionday': this.chitgroupData.auctionday,
      'auctiondayValue': this.chitgroupData.auctiondayValue,
      'auctiondayType': this.chitgroupData.auctiondayType,
      'auctionweekValue': this.chitgroupData.auctionweekValue,
      'auctiontime': this.chitgroupData.auctiontime? this.twoDigitConversion(this.chitgroupData.auctiontime.hour)+":"+this.twoDigitConversion(this.chitgroupData.auctiontime.minute) : '',
      'chitduration': this.chitgroupData.chitduration,
      'chitvalue': this.chitgroupData.chitvalue+"",
      'enrollmentFees': this.chitgroupData.enrollmentFees,
      'minBidPerct': this.chitgroupData.minBidPerct,
      'maxBidPerct': this.chitgroupData.maxBidPerct,
      'prizMemPenPerct': this.chitgroupData.prizMemPenPerct,
      'nonPrizMemPenPerct': this.chitgroupData.nonPrizMemPenPerct,
      'fdrAcNumber': this.chitgroupData.fdrAcNumber,
      'fdrIssueDate': this.chitgroupData.fdrIssueDate  && new Date(this.chitgroupData.fdrIssueDate),
      'fdrDepAmount': this.chitgroupData.fdrDepAmount+"",
      'fdrDuration': this.chitgroupData.fdrDuration,
      'fdrRatIntPerct': this.chitgroupData.fdrRatIntPerct,
      'fdrRateIntAmt': this.chitgroupData.fdrRateIntAmt+"",
      'fdrIntPayCycle': this.chitgroupData.fdrIntPayCycle,
      'fdrMatuDate': this.chitgroupData.fdrMatuDate  && new Date(this.chitgroupData.fdrMatuDate),
      'fdrMatuAmount': this.chitgroupData.fdrMatuAmount+"",
      'fdrBankName': this.chitgroupData.fdrBankName,
      'fdrBankBranchName': this.chitgroupData.fdrBankBranchName,
      'fdrCertFile': this.chitgroupData.fdrCertFile,
      'psoAppDate': this.chitgroupData.psoAppDate  && new Date(this.chitgroupData.psoAppDate),
      'psoIssueDate': this.chitgroupData.psoIssueDate  && new Date(this.chitgroupData.psoIssueDate),
      'psoNumber': this.chitgroupData.psoNumber,
      'psoCertFile': this.chitgroupData.psoCertFile,
      'ccAppDate': this.chitgroupData.ccAppDate  && new Date(this.chitgroupData.ccAppDate),
      'ccIssueDate': this.chitgroupData.ccIssueDate  && new Date(this.chitgroupData.ccIssueDate),
      'ccNumber': this.chitgroupData.ccNumber,
      'ccCertFile': this.chitgroupData.ccCertFile,
      
    });
    this.formatDepAmount();
    this.formatIntAmount()
    this.reCalcMatuAmt();
    
    this.documents.forEach(eachDoc => {
      console.log(eachDoc);
      if (eachDoc.name === "FDR_Certificate"){
        this.fdrFileName =  eachDoc.fileName;
        this.fdrFileExists = true;
      }
      if (eachDoc.name === "PSO_Certificate"){
        this.psoFileName =  eachDoc.fileName;
        this.psoFileExists = true;
      }
      if (eachDoc.name === "CC_Certificate"){
        this.ccFileName =  eachDoc.fileName;
        this.ccFileExists = true;
      }
    });
  }

  ngAfterViewInit() {
  }

  /**
   * Edits the chitgroup form.
   */
  editChitGroupForm() {
    this.chitgroupForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'officeId': ['', Validators.required],
      'staffid': [''],
      'chitcyclefrequency': [''],
      'chitcollectionfrequency': [''],
      'startdate':[''],
      'auctionday':[''],
      'auctiondayValue':[''],
      'auctiondayType':[''],
      'auctionweekValue':[''],
      'auctiontime':[''],
      'chitduration':['',  Validators.pattern('^[0-9]{0,2}$')],
      'chitvalue':[''],
      'enrollmentFees':['',  Validators.pattern('^[0-9]{0,10}$')],
      'minBidPerct':['',  Validators.pattern('^[0-9]{0,2}([.][0-9]{0,2})?$')],
      'maxBidPerct':['',  Validators.pattern('^[0-9]{0,2}([.][0-9]{0,2})?$')],
      'prizMemPenPerct':['',  Validators.pattern('^[0-9]{0,2}([.][0-9]{0,2})?$')],
      'nonPrizMemPenPerct':['',  Validators.pattern('^[0-9]{0,2}([.][0-9]{0,2})?$')],
      
      'fdrAcNumber':[''],
      'fdrIssueDate':[''],
      'fdrDepAmount':[''],
      'fdrDuration':['',  Validators.pattern('^[0-9]{0,2}$')],
      'fdrRatIntPerct':['',  Validators.pattern('^[0-9]{0,2}([.][0-9]{0,2})?$')],
      'fdrRateIntAmt':[''],
      'fdrIntPayCycle':[''],
      'fdrMatuDate':[''],
      'fdrMatuAmount':[''],
      'fdrBankName':[''],
      'fdrBankBranchName':[''],
      'fdrCertFile':[''],
      'psoAppDate':[''],
      'psoIssueDate':[''],
      'psoNumber':[''],
      'psoCertFile':[''],
      'ccAppDate':[''],
      'ccIssueDate':[''],
      'ccNumber':[''],
      'ccCertFile':[''],


    });
    this.buildDependencies();
    this.setOptions();

  }

  /**
   * Sets the staff and clients data each time the user selects a new office.
   * Adds form control Activation Date if active.
   */
  buildDependencies() {
    // this.chitgroupForm.get('officeId').valueChanges.subscribe((option: any) => {
    //   this.chitgroupService.getStaff(option).subscribe(data => {
    //     this.staffData = data;
    //     if (data === undefined || data.length === 0) {
    //       this.chitgroupForm.controls['staffid'].disable();
    //     } else {
    //       this.chitgroupForm.controls['staffid'].enable();
    //     }
    //   });
    // });

  }

  /**
     * Sets select dropdown options.
     */
  setOptions() {
    this.cyclefrequencyOptions = [{id:"Monthly", name: 'Monthly'}];
    this.collectionfrequencyOptions = [{id:"Daily", name: 'Daily'}, {id:"Monthly", name: 'Monthly'}];
    this.intPayableCycleOptions = [{id:"Monthly", name: 'Monthly'}, {id:"Quarterly", name: 'Quarterly'},{id:"Half Yearly", name: 'Half Yearly'},{id:"At Maturity", name: 'At Maturity'}];
  }

  twoDigitConversion(num : number){
    return num > 9 ? "" + num : "0" + num;
  }

  getMonthlyContribution() {
    let chitvalue = 0;
    if (this.chitgroupForm.controls.chitvalue != null) {
      chitvalue = parseInt(this.chitgroupForm.get('chitvalue').value.replace(/,/g, ''));
    }
    //console.log(chitvalue);
    isNaN(chitvalue) ? chitvalue = 0 : '';
    if (chitvalue == 0) {
      this.chitgroupForm.get('chitvalue').setValue('');
      this.monContribution = 0;
      return 0;
    }

    if (this.chitgroupForm.controls.chitduration.value && !isNaN(this.chitgroupForm.controls.chitduration.value)) {
      this.chitgroupForm.get('chitvalue').setValue( isNaN(chitvalue) ? '' : formatNumber(chitvalue, 'en-IN', '1.0-0'));
      this.monContribution = chitvalue/this.chitgroupForm.controls.chitduration.value;
      return formatNumber(chitvalue/this.chitgroupForm.controls.chitduration.value, 'en-IN', '1.0-0');
      
    }
    else {
      this.monContribution = 0;
      return 0;
    }
    //return this.monContribution = !isNaN(this.chitgroupForm.controls.chitvalue.value) && !isNaN(this.chitgroupForm.controls.chitduration.value) ? (this.chitgroupForm.controls.chitvalue.value/this.chitgroupForm.controls.chitduration.value).valueOf() : 0;
  }

  validForm() {
    if(this.chitgroupForm.value.auctionday === 'CalDay') {
      if(this.chitgroupForm.get('auctiondayValue').value == ''){
        return false;
      } else {
        return true;
      }
    } else if (this.chitgroupForm.value.auctionday === 'FlexDay') {
      if(this.chitgroupForm.get('auctiondayType').value == '' || this.chitgroupForm.get('auctionweekValue').value == ''){
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  // FDR file select event 
  onFDRFileSelect($event: any) {
    console.log($event.target.files[0]);
    this.fdrDocFile = $event.target.files[0];
    this.fdrFileName = this.fdrDocFile.name;
    this.fdrFileSize = this.fdrDocFile.size;
  }
  
  // PSO file select event 
  onPSOFileSelect($event: any) {
    this.psoDocFile = $event.target.files[0];
    this.psoFileName = this.psoDocFile.name;
    this.psoFileSize = this.psoDocFile.size;
  }

  // CC file select event 
  onCCFileSelect($event: any) {
    this.ccDocFile = $event.target.files[0];
    this.ccFileName = this.ccDocFile.name;
    this.ccFileSize = this.ccDocFile.size;
  }

  // Format the FDR Deposit Amount
  formatDepAmount(){
    let fdrDepAmount = 0;
    if (this.chitgroupForm.controls.fdrDepAmount != null) {
      fdrDepAmount = parseInt(this.chitgroupForm.get('fdrDepAmount').value.replace(/,/g, ''));
    }
    isNaN(fdrDepAmount) ? fdrDepAmount = 0 : '';
    if (fdrDepAmount == 0) {
      this.chitgroupForm.get('fdrDepAmount').setValue('');
    } else {
      this.chitgroupForm.get('fdrDepAmount').setValue(formatNumber(fdrDepAmount, 'en-IN', '1.0-0'));
    }

    this.reCalcMatuAmt();
  }

  // Format the FDR Deposit Interest Amount
  formatIntAmount() {
    let fdrRateIntAmt = 0;
    if (this.chitgroupForm.controls.fdrRateIntAmt != null) {
      fdrRateIntAmt = parseInt(this.chitgroupForm.get('fdrRateIntAmt').value.replace(/,/g, ''));
    }
    isNaN(fdrRateIntAmt) ? fdrRateIntAmt = 0 : '';
    if (fdrRateIntAmt == 0) {
      this.chitgroupForm.get('fdrRateIntAmt').setValue('');
    } else {
      this.chitgroupForm.get('fdrRateIntAmt').setValue(formatNumber(fdrRateIntAmt, 'en-IN', '1.0-0'));
    }
    this.reCalcMatuAmt();
  }

  // Re-Calculate the Maturity Amount
  reCalcMatuAmt() {
    let fdrDepAmount = 0;
    if (this.chitgroupForm.controls.fdrDepAmount != null) {
      fdrDepAmount = parseInt(this.chitgroupForm.get('fdrDepAmount').value.replace(/,/g, ''));
    }

    let fdrRateIntAmt = 0;
    if (this.chitgroupForm.controls.fdrRateIntAmt != null) {
      fdrRateIntAmt = parseInt(this.chitgroupForm.get('fdrRateIntAmt').value.replace(/,/g, ''));
    }
    let fdrMatuAmount = fdrDepAmount + fdrRateIntAmt;
    if (fdrMatuAmount > 0) {
      this.chitgroupForm.get('fdrMatuAmount').setValue(formatNumber(fdrMatuAmount, 'en-IN', '1.0-0'));
    } else {
      this.chitgroupForm.get('fdrMatuAmount').setValue('');
    }
  }

  // Calculate FDR Maturity Date
  calcFDRMatuDate() {
    if ( this.chitgroupForm.get('fdrIssueDate').value && this.chitgroupForm.get('fdrDuration').value) {
      let dtIssue : Date = this.chitgroupForm.get('fdrIssueDate').value;
      this.chitgroupForm.get('fdrMatuDate').setValue(new Date (dtIssue.getFullYear(), dtIssue.getMonth() + this.chitgroupForm.get('fdrDuration').value, dtIssue.getDate()));
    }
  }
  
  // Download existing FDR/PSO/CC docs
  download(docType: string) {
    const parentEntityId = this.chitgroupData.id;
    let documentId = '';
    if (docType === 'FDR')
      documentId = this.documents.find(doc => doc.name === "FDR_Certificate").id;
    else if (docType === 'PSO')
      documentId = this.documents.find(doc => doc.name === "PSO_Certificate").id;
    else if (docType === 'CC')
      documentId = this.documents.find(doc => doc.name === "CC_Certificate").id;

    this.chitgroupService.downloadChitgroupDocument(parentEntityId, documentId).subscribe(res => {
      const url = window.URL.createObjectURL(res);
      window.open(url);
    });
  }

  // Delete document attached
  deleteDocument(docType: string) {
    const parentEntityId = this.chitgroupData.id;
    let documentId = '';
    if (docType === 'FDR')
      documentId = this.documents.find(doc => doc.name === "FDR_Certificate").id;
    else if (docType === 'PSO')
      documentId = this.documents.find(doc => doc.name === "PSO_Certificate").id;
    else if (docType === 'CC')
      documentId = this.documents.find(doc => doc.name === "CC_Certificate").id;

    const deleteDocumentDialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { deleteContext: `document id:${documentId}` }
    });
    deleteDocumentDialogRef.afterClosed().subscribe((response: any) => {
      if (response.delete) {
        this.chitgroupService.deleteClientDocument(parentEntityId, documentId).subscribe(res => {
          this.documents.forEach((eachDoc, index) => {
            console.log(eachDoc);
            if (eachDoc.name === "FDR_Certificate" && docType === "FDR"){
              this.fdrFileName =  '';
              this.fdrFileExists = false;
            }
            if (eachDoc.name === "PSO_Certificate" && docType === "PSO"){
              this.psoFileName =  '';
              this.psoFileExists = false;
            }
            if (eachDoc.name === "CC_Certificate" && docType === "CC"){
              this.ccFileName =  '';
              this.ccFileExists = false;
            }
          });
        });
      }
    });
  }

  /**
   * Submits the chitgroup form and edits chitgroup,
   * if successful redirects to chitgroups.
   */
  submit() {
    
    const controls = this.chitgroupForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            console.log(name);
        }
    }

    const dateFormat = this.settingsService.dateFormat;
    // const submittedOnDate: Date = this.chitgroupForm.value.submittedOnDate;
    // this.chitgroupForm.patchValue({
    //   submittedOnDate: this.datePipe.transform(submittedOnDate, dateFormat),
    // });
    const chitgroup = this.chitgroupForm.value;

    // If FDR/PSO/CC account number provided but certificate files not uploaded, then make it mandatory
    if (chitgroup['fdrAcNumber'] && this.fdrFileName === '') {
      alert("FDR certificate copy field is required when FDR account number is provided");
      return;
    }
    if (chitgroup['psoNumber'] && this.psoFileName === '') {
      alert("PSO certificate copy field is required when PSO number is provided");
      return;
    }
    if (chitgroup['ccNumber'] && this.ccFileName === '') {
      alert("CC certificate copy field is required when CC number is provided");
      return;
    }

    if(this.chitgroupForm.value.auctionday === 'CalDay') {
      delete chitgroup['auctiondayType'];
      delete chitgroup['auctionweekValue'];
    }
    if(this.chitgroupForm.value.auctionday === 'FlexDay') {
      delete chitgroup['auctiondayValue'];
    }

    //chitgroup['status'] = 10;
    chitgroup.locale = this.settingsService.language.code;
    chitgroup.dateFormat = dateFormat;

    chitgroup.startdate =  this.datePipe.transform(chitgroup['startdate'] , dateFormat),
    chitgroup.fdrIssueDate =  this.datePipe.transform(chitgroup['fdrIssueDate'] , dateFormat),
    chitgroup.fdrMatuDate =  this.datePipe.transform(chitgroup['fdrMatuDate'] , dateFormat),
    chitgroup.psoAppDate =  this.datePipe.transform(chitgroup['psoAppDate'] , dateFormat),
    chitgroup.psoIssueDate =  this.datePipe.transform(chitgroup['psoIssueDate'] , dateFormat),
    chitgroup.ccAppDate =  this.datePipe.transform(chitgroup['ccAppDate'] , dateFormat),
    chitgroup.ccIssueDate =  this.datePipe.transform(chitgroup['ccIssueDate'] , dateFormat),

    chitgroup.chitvalue = parseInt(chitgroup['chitvalue'].replace(/,/g, ''));
    chitgroup.fdrMatuAmount = parseInt(chitgroup['fdrMatuAmount'].replace(/,/g, ''));
    chitgroup.fdrDepAmount = parseInt(chitgroup['fdrDepAmount'].replace(/,/g, ''));
    chitgroup.fdrRateIntAmt = parseInt(chitgroup['fdrRateIntAmt'].replace(/,/g, ''));

    chitgroup.chitduration = parseInt(chitgroup['chitduration']);
    chitgroup.enrollmentFees = parseInt(chitgroup['enrollmentFees']);
    chitgroup.monthlycontribution  = parseInt(this.monContribution.toString());

    delete chitgroup['fdrCertFile'];
    delete chitgroup['psoCertFile'];
    delete chitgroup['ccCertFile'];
    ;
    
    // Validations...
    // FDR Fixed Deposit amount, should be equivalent to chit value
    if (chitgroup.fdrDepAmount && chitgroup.chitvalue !== chitgroup.fdrDepAmount) {
      this.alertService.alert({ type: 'ChitGroup-Validation-DepAmt-ChitVal', message: 'FDR Deposit Amount should be equal to Chit Value' });
      return;
    }
    // FDR Fixed Deposit period - equivalent to the Chit Duration.
    if (chitgroup['fdrDuration']  && chitgroup['fdrDuration'] !== chitgroup['chitduration']) {
      this.alertService.alert({ type: 'ChitGroup-Validation-fdrDuration-ChitDuration', message: 'FDR Duration should be equal to Chit Duration' });
      return;
    }
    
    const formData: FormData = new FormData;
    formData.append('chitgroup', JSON.stringify(chitgroup).toString());
    if (this.fdrDocFile) {
      formData.append('fdrfile', this.fdrDocFile);
      formData.append('fdrfileSize', this.fdrFileSize.toString());      
    }

    if (this.psoDocFile) {
      formData.append('psofile', this.psoDocFile);
      formData.append('psofileSize', this.psoFileSize.toString());
    }

    if (this.ccDocFile) {
      formData.append('ccfile', this.ccDocFile);
      formData.append('ccfileSize', this.ccFileSize.toString());
    }

console.log('Fields to be submitted')
console.log(chitgroup);
console.log(formData.get('fdrfile'));
console.log(formData.get('psofile'));
console.log(formData.get('ccfile'));

    this.chitgroupService.updateChitGroup(formData, this.chitgroupData.id).subscribe((response: any) => {
      //this.router.navigate(['../chitgroups']);
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

}
