/** Angular Imports */
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {formatNumber} from '@angular/common';
import "@angular/common/locales/global/en-IN";

/**
 * Client Fin Details Step Component
 */
@Component({
  selector: 'mifosx-client-fin-details-step',
  templateUrl: './client-fin-detail-step.component.html',
  styleUrls: ['./client-fin-detail-step.component.scss']
})

export class ClientFinDetailStepComponent implements OnInit {

  /** Client Fin Details Form */
  clientFinDetailForm: FormGroup;

  /**
   * @param {FormBuilder} formBuilder Form Builder
   */
   constructor(private formBuilder: FormBuilder) {
    this.setClientFinDetailForm();
  };

  ngOnInit() {
    
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
       'temp_tot_exp': [''],
       'otherobligations': [''],
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
     * Returns the financial details form values.
     */
  get finDetails() {
    return this.clientFinDetailForm.value;
  }
}


