/** Angular Imports */
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

/** Custom Dialogs */
import { DeleteDialogComponent } from 'app/shared/delete-dialog/delete-dialog.component';

/** Custom Services */
import { ChitGroupsService } from 'app/chitgroups/chitgroups.service';
import { ClientsService } from 'app/clients/clients.service';
import { MatDialog } from '@angular/material/dialog';

/**
 * Manage ChitGroup Members Component
 */
@Component({
  selector: 'mifosx-manage-chitgroup-members',
  templateUrl: './manage-chitgroup-members.component.html',
  styleUrls: ['./manage-chitgroup-members.component.scss']
})
export class ManageChitGroupMembersComponent implements AfterViewInit {

  /** ChitGroup Data */
  chitgroupData: any;
  /** Client data. */
  clientsData: any = [];
  /** Client Members. */
  clientMembers: any[] = [];
  /** Client Choice. */
  clientChoice = new FormControl('');
  chitnumberchoice = new FormControl('');
  // New client Image
  clientImage: any;
  // Chit Numbers not taken
  chitNumberOptions: Number[];
  /**
   * Fetches chitgroup action data from `resolve`
   * @param {ActivatedRoute} route Activated Route
   * @param {ChitGroupsService} chitgroupsService ChitGroups Service
   * @param {ClientsService} clientsService Clients Service
   * @param {MatDialog} dialog Mat Dialog
   */
  constructor(private route: ActivatedRoute,
              private chitgroupsService: ChitGroupsService,
              private clientsService: ClientsService,
              private _sanitizer: DomSanitizer,
              public dialog: MatDialog) {
    this.route.data.subscribe((data: { chitgroupActionData: any }) => {
      this.chitgroupData = data.chitgroupActionData;
      this.chitgroupsService.getAllSubscribersOfChitGroup(this.chitgroupData.id).subscribe((subscribersList :any) => {
        //console.log( subscribersList);        
        this.clientMembers = subscribersList ? subscribersList : [];
      })
    });
  }

  /**
   * Subscribes to Clients search filter:
   */
  ngAfterViewInit() {
    this.clientChoice.valueChanges.subscribe( (value: string) => {

      if (value.length >= 2) {
        this.clientsService.getFilteredActiveClients('displayName', 'ASC', false, value, '300', this.chitgroupData.officeId)
          .subscribe((data: any) => {
        // console.log("clients searched = ");            console.log(data);            
            this.clientsData = data.pageItems;
          });
      }
    });
  }

  /**
   * Add client.
   */
  addClient() {
    console.log('chose chit number = '+this.chitnumberchoice.value);
    if (!this.chitnumberchoice.value) {
      alert ('Please select a Chit Number');
      return;
    }
    this.chitgroupsService.addSubscriber2ChitGroup (this.chitgroupData.id, this.clientChoice.value.id, this.chitnumberchoice.value)
    .subscribe(() => { 
      this.clientChoice.setValue('');
      this.chitnumberchoice.setValue('');
      this.chitgroupsService.getAllSubscribersOfChitGroup(this.chitgroupData.id).subscribe((subscribersList :any) => {
        //console.log( "subscribersList"); console.log( subscribersList);
        this.clientMembers = subscribersList ? subscribersList : [];
      })
    });      
  }

  /**
   * Remove client.
   * @param {number} index Client's array index.
   * @param {any} client Client
   */
  removeClient(index: number, client: any) {
    if (client.chitNumber === 1){
      alert("Company will be first Subscriber. Can't remove");
      return;
    }
    const removeMemberDialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { deleteContext: `Subscriber: ${client.name}` }
    });
    removeMemberDialogRef.afterClosed().subscribe((response: any) => {
      if (response.delete) {
        this.chitgroupsService.removeSubscriberOfChitGroup(this.chitgroupData.id, client.id)
          .subscribe(() => { this.clientMembers.splice(index, 1); });
      }
    });
  }

  /**
   * Displays Client name in form control input.
   * @param {any} client Client data.
   * @returns {string} Client name if valid otherwise undefined.
   */
  displayClient(client: any): string | undefined {
    return client ? client.displayName : undefined;
  }

  loadDetails() {
    // Get unused chit numbers 
    let chitNumTaken = new Array(this.chitgroupData.chitduration);
    let chitNumEmpty = [];
    this.clientMembers.forEach(eachMember => {
      console.log('didnt come here');
      chitNumTaken[eachMember.chitNumber-1] = eachMember.chitNumber;
    });
    console.log("chitNumTaken");
    chitNumTaken.forEach( (val,index) => console.log('['+index+']='+val));
    //console.log(chitNumTaken);
    
    for (let i=0; i<this.chitgroupData.chitduration; i++) {
      if (!chitNumTaken[i])
        chitNumEmpty.push(i+1);
    }
    console.log('chitNumEmpty');
    chitNumEmpty.forEach( (val,index) => console.log('['+index+']='+val));

    this.chitNumberOptions = chitNumEmpty;

    // Search for Image
    this.clientImage = '';
    this.clientsService.getClientProfileImage(this.clientChoice.value.id).subscribe(
      (base64Image: any) => {
        this.clientImage = this._sanitizer.bypassSecurityTrustResourceUrl(base64Image);
      }, (error: any) => {}
    );
  }
}
