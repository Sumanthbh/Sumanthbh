/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {formatNumber} from '@angular/common';
import "@angular/common/locales/global/en-IN";

/** Custom Services */
import { ClientsService } from '../../clients.service';

/**
 * Edit Financial Details Component
 */
@Component({
  selector: 'mifosx-edit-client-fin-detail',
  templateUrl: './fin-detail-tab.component.html',
  styleUrls: ['./fin-detail-tab.component.scss']
})
export class EditClientFinDetailsComponent implements OnInit {

  /** Client Data and Template */
  clientDataAndTemplate: any;
  /** Client Fin Details Form */
  clientFinDetailForm: FormGroup;

  /**
   * Fetches client template data from `resolve`
   * @param {FormBuilder} formBuilder Form Builder
   * @param {ActivatedRoute} route ActivatedRoute
   * @param {Router} router Router
   * @param {ClientsService} clientsService Clients Service
   */
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private clientsService: ClientsService){
      this.route.data.subscribe((data: { clientDataAndTemplate: any }) => {
      this.clientDataAndTemplate = data.clientDataAndTemplate;
    });
  }

  ngOnInit() {
    this.setClientFinDetailForm();
    this.clientFinDetailForm.patchValue({
      'incdailysales': this.clientDataAndTemplate.incdailysales?this.clientDataAndTemplate.incdailysales:'',
      'exprawmaterial': this.clientDataAndTemplate.exprawmaterial?this.clientDataAndTemplate.exprawmaterial:'',
      'expstaffsal': this.clientDataAndTemplate.expstaffsal?this.clientDataAndTemplate.expstaffsal:'',
      'exppowertelephone': this.clientDataAndTemplate.exppowertelephone?this.clientDataAndTemplate.exppowertelephone:'',
      'exprepairsmaintainance': this.clientDataAndTemplate.exprepairsmaintainance?this.clientDataAndTemplate.exprepairsmaintainance:'',
      'expcommbrokerage': this.clientDataAndTemplate.expcommbrokerage?this.clientDataAndTemplate.expcommbrokerage:'',
      'expinterest': this.clientDataAndTemplate.expinterest?this.clientDataAndTemplate.expinterest:'',
      'expofficerent': this.clientDataAndTemplate.expofficerent?this.clientDataAndTemplate.expofficerent:'',
      'exptravel': this.clientDataAndTemplate.exptravel?this.clientDataAndTemplate.exptravel:'',
      'expothers': this.clientDataAndTemplate.expothers?this.clientDataAndTemplate.expothers:'',
      'totbusinessprofit': this.clientDataAndTemplate.totbusinessprofit?this.clientDataAndTemplate.totbusinessprofit:'',
      'incspouse': this.clientDataAndTemplate.incspouse?this.clientDataAndTemplate.incspouse:'',
      'incrent': this.clientDataAndTemplate.incrent?this.clientDataAndTemplate.incrent:'',
      'incinterest': this.clientDataAndTemplate.incinterest?this.clientDataAndTemplate.incinterest:'',
      'incothers': this.clientDataAndTemplate.incothers?this.clientDataAndTemplate.incothers:'',
      'tothouseholdinc': this.clientDataAndTemplate.tothouseholdinc?this.clientDataAndTemplate.tothouseholdinc:'',
      'exphousehold': this.clientDataAndTemplate.exphousehold?this.clientDataAndTemplate.exphousehold:'',
      'expotherloans': this.clientDataAndTemplate.expotherloans?this.clientDataAndTemplate.expotherloans:'',
      'totnetdispfamily': this.clientDataAndTemplate.totnetdispfamily?this.clientDataAndTemplate.totnetdispfamily:'',
      'otherexpensestf': this.clientDataAndTemplate.otherexpensestf?this.clientDataAndTemplate.otherexpensestf:'',
      'othersrcinctf': this.clientDataAndTemplate.othersrcinctf?this.clientDataAndTemplate.othersrcinctf:'',
      'otherobligations': this.clientDataAndTemplate.otherobligations?this.clientDataAndTemplate.otherobligations:'',
      'temp_tot_exp': this.clientDataAndTemplate.incdailysales && this.clientDataAndTemplate.totbusinessprofit ? (this.clientDataAndTemplate.incdailysales - this.clientDataAndTemplate.totbusinessprofit): '',
          });
    this.reCalculate();
  }

  /**
   * Creates the client form.
   */
   setClientFinDetailForm() {
    this.clientFinDetailForm = this.formBuilder.group({
       'incdailysales': [''],
       'exprawmaterial': [''],
       'expstaffsal': [''],
       'exppowertelephone': [''],
       'exprepairsmaintainance': [''],
       'expcommbrokerage': [''],
       'expinterest': [''],
       'expofficerent': [''],
       'exptravel': [''],
       'expothers': [''],
       'totbusinessprofit': [''],
       'incspouse': [''],
       'incrent': [''],
       'incinterest': [''],
       'incothers': [''],
       'tothouseholdinc': [''],
       'exphousehold': [''],
       'expotherloans': [''],
       'totnetdispfamily': [''],
       'otherexpensestf' : [''],
       'othersrcinctf' : [''],
       'otherobligations' : [''],
       'temp_tot_exp': [''],
    }); 
  }

  reCalculate() {
    
    let incdailysales = parseInt(this.clientFinDetailForm.get('incdailysales').value.replace(/,/g, ''));
    let exprawmaterial = parseInt(this.clientFinDetailForm.get('exprawmaterial').value.replace(/,/g, ''));
    let expstaffsal = parseInt(this.clientFinDetailForm.get('expstaffsal').value.replace(/,/g, ''));
    let exppowertelephone = parseInt(this.clientFinDetailForm.get('exppowertelephone').value.replace(/,/g, ''));
    let exprepairsmaintainance = parseInt(this.clientFinDetailForm.get('exprepairsmaintainance').value.replace(/,/g, ''));
    let expcommbrokerage = parseInt(this.clientFinDetailForm.get('expcommbrokerage').value.replace(/,/g, ''));
    let expinterest = parseInt(this.clientFinDetailForm.get('expinterest').value.replace(/,/g, ''));
    let expofficerent = parseInt(this.clientFinDetailForm.get('expofficerent').value.replace(/,/g, ''));
    let exptravel = parseInt(this.clientFinDetailForm.get('exptravel').value.replace(/,/g, ''));
    let expothers = parseInt(this.clientFinDetailForm.get('expothers').value.replace(/,/g, ''));
    let incspouse = parseInt(this.clientFinDetailForm.get('incspouse').value.replace(/,/g, ''));
    let incrent = parseInt(this.clientFinDetailForm.get('incrent').value.replace(/,/g, ''));
    let incinterest = parseInt(this.clientFinDetailForm.get('incinterest').value.replace(/,/g, ''));
    let incothers = parseInt(this.clientFinDetailForm.get('incothers').value.replace(/,/g, ''));
    let expotherloans = parseInt(this.clientFinDetailForm.get('expotherloans').value.replace(/,/g, ''));

    isNaN(incdailysales) ? incdailysales = 0 : '';
    isNaN(exprawmaterial) ? exprawmaterial = 0 : '';
    isNaN(expstaffsal) ? expstaffsal = 0 : '';
    isNaN(exppowertelephone) ? exppowertelephone = 0 : '';
    isNaN(exprepairsmaintainance) ? exprepairsmaintainance = 0 : '';
    isNaN(expcommbrokerage) ? expcommbrokerage = 0 : '';
    isNaN(expinterest) ? expinterest = 0 : '';
    isNaN(expofficerent) ? expofficerent = 0 : '';
    isNaN(exptravel) ? exptravel = 0 : '';
    isNaN(expothers) ? expothers = 0 : '';
    isNaN(incspouse) ? incspouse = 0 : '';
    isNaN(incrent) ? incrent = 0 : '';
    isNaN(incinterest) ? incinterest = 0 : '';
    isNaN(incothers) ? incothers = 0 : '';
    isNaN(expotherloans) ? expotherloans = 0 : '';
    
    let totalExpenses =  exprawmaterial + expstaffsal + exppowertelephone + exprepairsmaintainance + expcommbrokerage + expinterest + expofficerent + exptravel + expothers;
    console.log("expenses = "+ totalExpenses);
    
    let tot_bus_Profit = incdailysales - totalExpenses;
    console.log("bus profit = "+ tot_bus_Profit);

    let totalIncom = incspouse + incrent + incinterest + incothers;
    console.log("Income = "+ totalIncom);

    let tot_house_inc = tot_bus_Profit + totalIncom;
    let netIncomeAfterExpense = tot_house_inc / 2;
    let netIncome = netIncomeAfterExpense -  expotherloans;
    
    this.clientFinDetailForm.get('incdailysales').setValue( isNaN(incdailysales) ? '' : formatNumber(incdailysales, 'en-IN', '1.0-0'));
    this.clientFinDetailForm.get('exprawmaterial').setValue(isNaN(exprawmaterial) ? '' : formatNumber(exprawmaterial, 'en-IN', '1.0-0'));
    this.clientFinDetailForm.get('expstaffsal').setValue(isNaN(expstaffsal) ? '' : formatNumber(expstaffsal, 'en-IN', '1.0-0'));
    this.clientFinDetailForm.get('exppowertelephone').setValue(isNaN(exppowertelephone) ? '' : formatNumber(exppowertelephone, 'en-IN', '1.0-0'));
    this.clientFinDetailForm.get('exprepairsmaintainance').setValue(isNaN(exprepairsmaintainance) ? '' : formatNumber(exprepairsmaintainance, 'en-IN', '1.0-0'));
    this.clientFinDetailForm.get('expcommbrokerage').setValue(isNaN(expcommbrokerage) ? '' : formatNumber(expcommbrokerage, 'en-IN', '1.0-0'));
    this.clientFinDetailForm.get('expinterest').setValue(isNaN(expinterest) ? '' : formatNumber(expinterest, 'en-IN', '1.0-0'));
    this.clientFinDetailForm.get('expofficerent').setValue(isNaN(expofficerent) ? '' : formatNumber(expofficerent, 'en-IN', '1.0-0'));
    this.clientFinDetailForm.get('exptravel').setValue(isNaN(exptravel) ? '' : formatNumber(exptravel, 'en-IN', '1.0-0'));
    this.clientFinDetailForm.get('expothers').setValue(isNaN(expothers) ? '' : formatNumber(expothers, 'en-IN', '1.0-0'));
    this.clientFinDetailForm.get('incspouse').setValue(isNaN(incspouse) ? '' : formatNumber(incspouse, 'en-IN', '1.0-0'));
    this.clientFinDetailForm.get('incrent').setValue(isNaN(incrent) ? '' : formatNumber(incrent, 'en-IN', '1.0-0'));
    this.clientFinDetailForm.get('incinterest').setValue(isNaN(incinterest) ? '' : formatNumber(incinterest, 'en-IN', '1.0-0'));
    this.clientFinDetailForm.get('incothers').setValue(isNaN(incothers) ? '' : formatNumber(incothers, 'en-IN', '1.0-0'));

    this.clientFinDetailForm.get('temp_tot_exp').setValue(isNaN(totalExpenses) ? '' : formatNumber(totalExpenses, 'en-IN', '1.0-0'));
    this.clientFinDetailForm.get('totbusinessprofit').setValue(isNaN(tot_bus_Profit) ? '' : formatNumber(tot_bus_Profit, 'en-IN', '1.0-0'));
    this.clientFinDetailForm.get('tothouseholdinc').setValue(isNaN(tot_house_inc) ? '' : formatNumber(tot_house_inc, 'en-IN', '1.0-0'));
    this.clientFinDetailForm.get('exphousehold').setValue(isNaN(netIncomeAfterExpense) ? '' : formatNumber(netIncomeAfterExpense, 'en-IN', '1.0-0'));
    this.clientFinDetailForm.get('expotherloans').setValue(isNaN(expotherloans) ? '' : formatNumber(expotherloans, 'en-IN', '1.0-0'));
    this.clientFinDetailForm.get('totnetdispfamily').setValue(isNaN(netIncome) ? '' : formatNumber(netIncome, 'en-IN', '1.0-0'));

  }

  /**
   * Submits the edit client form.
   */
  submit() {
    const clientFinDetailForm: any = this.clientFinDetailForm.getRawValue();
    const clientData = {
      ...clientFinDetailForm,
    };
    delete clientData["temp_tot_exp"];

    this.clientsService.updateClient(this.clientDataAndTemplate.id, clientData).subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

}
