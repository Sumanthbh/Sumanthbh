/** Angular Imports */
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

/** Custom Components */
import { DeleteDialogComponent } from 'app/shared/delete-dialog/delete-dialog.component';
import { ClientFamilyMemberDialogComponent } from './client-family-member-dialog/client-family-member-dialog.component';

/**
 * Client Family Members Step
 */
@Component({
  selector: 'mifosx-client-family-members-step',
  templateUrl: './client-family-members-step.component.html',
  styleUrls: ['./client-family-members-step.component.scss']
})
export class ClientFamilyMembersStepComponent {

  /** Cient Template */
  @Input() clientTemplate: any;

  @Input() addressStep: any;

  /** Client Family Members */
  clientFamilyMembers: any[] = [];

  /**
   * @param {MatDialog} dialog Mat Dialog
   */
  constructor(public dialog: MatDialog) {
    //console.log( this.addressStep);
   }

  /**
   * Adds a family member.
   */
  addFamilyMember() {
    //console.log( 'this.addressStep');
    //console.log( this.addressStep);

    let nomineeExists = false;
    this.clientFamilyMembers.forEach(mem => {
      // console.log(mem);
      if (mem.isnominee) {
        // console.log("OLAGE");
        nomineeExists = true;
      } 
    })
    const addFamilyMemberDialogRef = this.dialog.open(ClientFamilyMemberDialogComponent, {
      data: {
        context: 'Add',
        nomineeExists: nomineeExists,
        options: this.clientTemplate.familyMemberOptions,
        address: this.clientTemplate.address,
        idProofOptions: this.clientTemplate.idproofOptions,
      },
      width: '70rem'
    });
    addFamilyMemberDialogRef.afterClosed().subscribe((response: any) => {
      if (response.member) {
        //console.log('response.member');console.log(response.member);
        let newMember = response.member;
        if (newMember.isnominee) {
          if (newMember.isnomineeaddr) {
            // Different Address was given than Client. OK.
          } else {
            // Same Address as Client. Hence copy from client.
            newMember.nompincode = this.addressStep.c_pincode
            newMember.nomstate = this.addressStep.c_stateId
            newMember.nomdistrict = this.addressStep.c_districtId
            newMember.nomtaluka = this.addressStep.c_talukaId
            newMember.nomarealocality = this.addressStep.c_area
            newMember.nomstreetno = this.addressStep.c_streetNumber
            newMember.nomhouseno =this.addressStep.c_houseNumber
          }
        } else {
          // Family member not a nominee. Clear nominee fields if any
          delete newMember['isnomineeaddr'];
          delete newMember['nomadhar'];
          delete newMember['nomsecondaryidnum'];
          delete newMember['nomsecondaryid'];
          delete newMember['dateOfBirth'];
          delete newMember['nomhouseno'];
          delete newMember['nomstreetno'];
          delete newMember['nomarealocality'];
          delete newMember['nomtaluka'];
          delete newMember['nomdistrict'];
          delete newMember['nomstate'];
          delete newMember['nompincode'];
        } 
        console.log('newMember to add'); console.log(newMember);
        this.clientFamilyMembers.push(newMember);
      }
    });
  }

  /**
   * Edits the family member.
   * @param {any} member Family Member
   * @param {any} index Tree Index
   */
  editFamilyMember(member: any, index: any) {
    let nomineeExists = false;
    // console.log(member);
    this.clientFamilyMembers.forEach(mem => {
      // console.log(mem);
      if (member.firstName !== mem.firstName &&  mem.isnominee) {
        nomineeExists = true;
      }
    })

    const editFamilyMemberDialogRef = this.dialog.open(ClientFamilyMemberDialogComponent, {
      data: {
        context: 'Edit',
        nomineeExists: nomineeExists,
        member: member,
        options: this.clientTemplate.familyMemberOptions,
        address: this.clientTemplate.address,
        idProofOptions: this.clientTemplate.idproofOptions,
      },
      width: '70rem'
    });
    editFamilyMemberDialogRef.afterClosed().subscribe((response: any) => {
      if (response.member) {
        //console.log('response.member');console.log(response.member);
        let editedMem = response.member;
        if (editedMem.isnominee) {
          if (editedMem.isnomineeaddr) {
            // Different Address was given than Client. OK.
          } else {
            // Same Address as Client. Hence copy from client.
            editedMem.nompincode = this.addressStep.c_pincode
            editedMem.nomstate = this.addressStep.c_stateId
            editedMem.nomdistrict = this.addressStep.c_districtId
            editedMem.nomtaluka = this.addressStep.c_talukaId
            editedMem.nomarealocality = this.addressStep.c_area
            editedMem.nomstreetno = this.addressStep.c_streetNumber
            editedMem.nomhouseno =this.addressStep.c_houseNumber
          }
        } else {
          // Family member not a nominee. Clear nominee fields if any
          delete editedMem['isnomineeaddr'];
          delete editedMem['nomadhar'];
          delete editedMem['nomsecondaryidnum'];
          delete editedMem['nomsecondaryid'];
          delete editedMem['dateOfBirth'];
          delete editedMem['nomhouseno'];
          delete editedMem['nomstreetno'];
          delete editedMem['nomarealocality'];
          delete editedMem['nomtaluka'];
          delete editedMem['nomdistrict'];
          delete editedMem['nomstate'];
          delete editedMem['nompincode'];
        } 
        console.log('editedMem to add'); console.log(editedMem);        
        this.clientFamilyMembers.splice(index, 1, editedMem);
      }
    });
  }

  /**
   * Deletes the family member
   */
  deleteFamilyMember(name: string, index: number) {
    const deleteFamilyMemberDialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { deleteContext: `Family member name : ${name} ${index}` }
    });
    deleteFamilyMemberDialogRef.afterClosed().subscribe((response: any) => {
      if (response.delete) {
        this.clientFamilyMembers.splice(index, 1);
      }
    });
  }

  /**
   * Returns the array of client family members.
   */
  get familyMembers() {
    return { familyMembers: this.clientFamilyMembers };
  }

}
