import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ClientsService } from 'app/clients/clients.service';

@Component({
  selector: 'mifosx-add-guarantor',
  templateUrl: './add-guarantor.component.html',
  styleUrls: ['./add-guarantor.component.scss']
})
export class AddGuarantorComponent implements OnInit {
  /**Add Guarantor FormGroup */
  addGuarantorForm: FormGroup
  /** for Dropdown */
  clientTemplateDropdown : any;
  /** Maximum Date allowed. */
  maxDate = new Date();
  clientId : number;

  constructor(private route : ActivatedRoute,
              private formBuilder : FormBuilder,
              private datePipe : DatePipe,
              private cientServices : ClientsService,
              private router : Router) { 
    this.route.data.subscribe((data:{clientTemplate : any}) =>{
      this.clientTemplateDropdown = data.clientTemplate;
    })
    this.clientId = Number(this.route.parent.parent.snapshot.params['clientId']);
  }

  ngOnInit(): void {
    this.createGuarantorForm();
  }
  createGuarantorForm(){
    this.addGuarantorForm = this.formBuilder.group({
      'ClientRelationshipId':[''],
      'firstName':[''],
      'typeEnum':[''],
      'dob':[''],
      'Phone':['',Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      'qualification':[''],
      'profession':[''],
      'Address1':[''],
      'Address2':[''],
      'city':[''],
      'state':[''],
      'country':[''],
      'isActive':[''],
      'zip':[''],
      'clientId': this.clientId
    })
  }

  enumTypeOption =[
    {value : "PRIMARY"},
    {value : "SECONDARY"},
    {value : "COAPPLICANT"}
  ]

  submit(){
    var guarantorData = this.addGuarantorForm.value;
    guarantorData.dob = this.datePipe.transform(guarantorData.dob, "yyyy-MM-dd")
    console.log(guarantorData);
    this.cientServices.addGuarantor(guarantorData).subscribe((response:any) => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
    
  }
}
